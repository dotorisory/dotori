const express = require('express');
const Enrollment = require('./models/Enrollment');
const Order = require('./models/Order');

const router = express.Router();

// POST /api/payments/webhook — Stripe webhook
// Must use raw body (express.raw), registered in index.js before express.json()
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    try {
      if (pi.metadata && pi.metadata.source === 'shop') {
        await handleShopPayment(pi, stripe);
      } else {
        // Existing enrollment flow
        await Enrollment.findOneAndUpdate(
          { stripePaymentIntentId: pi.id },
          { paymentStatus: 'paid', paidAt: new Date() }
        );
        console.log(`Enrollment payment confirmed for intent ${pi.id}`);
      }
    } catch (err) {
      console.error('Payment processing error:', err);
    }
  }

  res.json({ received: true });
});

async function handleShopPayment(pi, stripe) {
  const order = await Order.findOneAndUpdate(
    { stripePaymentIntentId: pi.id },
    { paymentStatus: 'paid', paidAt: new Date() },
    { new: true }
  );
  if (!order) {
    console.error('Shop order not found for intent:', pi.id);
    return;
  }
  console.log(`Shop order ${order._id} payment confirmed.`);

  // Send order confirmation email
  try {
    const { sendOrderConfirmation } = require('./mailer');
    const siteUrl = process.env.SITE_URL || 'http://localhost:3003';
    await sendOrderConfirmation({
      to:        order.email,
      firstName: order.firstName,
      order,
      siteUrl,
    });
  } catch (mailErr) {
    console.error('Order confirmation email failed:', mailErr.message);
  }

  // Record Stripe Tax transaction for audit trail
  if (order.stripeTaxCalculationId) {
    try {
      await stripe.tax.transactions.createFromCalculation({
        calculation: order.stripeTaxCalculationId,
        reference:   order._id.toString(),
      });
    } catch (taxErr) {
      console.error('Stripe Tax transaction creation failed:', taxErr.message);
    }
  }

  // Fulfill Printful items (idempotent: skip if already fulfilled)
  const hasPrintful = order.items.some(i => i.fulfiller === 'printful');
  if (hasPrintful && !order.printfulOrderId) {
    await createPrintfulOrder(order);
  }

  // Fulfill Lulu items
  const hasLulu = order.items.some(i => i.fulfiller === 'lulu');
  if (hasLulu && !order.luluJobId) {
    try {
      const { createLuluJob } = require('./luluClient');
      await createLuluJob(order);
    } catch (luluErr) {
      console.error('Lulu job creation error:', luluErr.message);
      await Order.findByIdAndUpdate(order._id, { fulfillmentStatus: 'error' });
    }
  }

  // Update fulfillment status
  const hasFulfilled = hasPrintful || hasLulu;
  if (hasFulfilled) {
    const updated = await Order.findById(order._id);
    if (updated && updated.fulfillmentStatus === 'unfulfilled') {
      await Order.findByIdAndUpdate(order._id, { fulfillmentStatus: 'partial' });
    }
  }
}

async function createPrintfulOrder(order) {
  const printfulItems = order.items
    .filter(i => i.fulfiller === 'printful' && i.printfulVariantId)
    .map(i => ({ sync_variant_id: i.printfulVariantId, quantity: i.quantity }));

  if (printfulItems.length === 0) return;

  const body = {
    recipient: {
      name:         `${order.firstName} ${order.lastName}`,
      address1:     order.address.line1,
      address2:     order.address.line2 || '',
      city:         order.address.city,
      state_code:   order.address.state,
      zip:          order.address.zip,
      country_code: order.address.country || 'US',
      email:        order.email,
      phone:        order.phone || '',
    },
    items: printfulItems,
    retail_costs: {
      shipping: order.shippingCost.toFixed(2),
    },
  };

  try {
    const res = await fetch('https://api.printful.com/orders', {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.code === 200) {
      await Order.findByIdAndUpdate(order._id, {
        printfulOrderId: data.result.id,
        printfulStatus:  data.result.status,
      });
      console.log(`Printful order created for order ${order._id}: ${data.result.id}`);
    } else {
      console.error('Printful order creation failed:', JSON.stringify(data));
      await Order.findByIdAndUpdate(order._id, { fulfillmentStatus: 'error' });
    }
  } catch (err) {
    console.error('Printful API error:', err.message);
    await Order.findByIdAndUpdate(order._id, { fulfillmentStatus: 'error' });
  }
}

module.exports = router;
