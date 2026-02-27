const express = require('express');
const crypto = require('crypto');
const Product = require('./models/Product');
const Order = require('./models/Order');

const router = express.Router();

const FLAT_SHIPPING = parseFloat(process.env.SHOP_FLAT_SHIPPING || '5.99');
const FREE_THRESHOLD = parseFloat(process.env.SHOP_FREE_SHIPPING_THRESHOLD || '50');

function calcShipping(subtotal) {
  return subtotal >= FREE_THRESHOLD ? 0 : FLAT_SHIPPING;
}

// GET /api/shop/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort({ createdAt: 1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// GET /api/shop/products/:slug
router.get('/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, active: true });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

// POST /api/shop/tax-estimate
router.post('/tax-estimate', async (req, res) => {
  try {
    const { items, address, shippingCost } = req.body;
    if (!address || !address.zip || !address.state) {
      return res.json({ taxAmount: 0, calculationId: null });
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const lineItems = (items || []).map(item => ({
      amount: Math.round((item.price || 0) * (item.qty || 1) * 100),
      reference: item.productId || 'item',
      tax_behavior: 'exclusive',
      tax_code: item.fulfiller === 'lulu' ? 'txcd_35010000' : 'txcd_99999999',
    }));

    if (shippingCost > 0) {
      lineItems.push({
        amount: Math.round(shippingCost * 100),
        reference: 'shipping',
        tax_behavior: 'exclusive',
        tax_code: 'txcd_92010001',
      });
    }

    if (lineItems.length === 0 || lineItems.every(l => l.amount === 0)) {
      return res.json({ taxAmount: 0, calculationId: null });
    }

    const calculation = await stripe.tax.calculations.create({
      currency: 'usd',
      customer_details: {
        address: {
          line1:       address.line1 || '',
          city:        address.city  || '',
          state:       address.state,
          postal_code: address.zip,
          country:     address.country || 'US',
        },
        address_source: 'shipping',
      },
      line_items: lineItems,
    });

    res.json({
      taxAmount:     calculation.tax_amount_exclusive / 100,
      calculationId: calculation.id,
    });
  } catch (err) {
    console.error('Tax estimate error:', err.message);
    res.json({ taxAmount: 0, calculationId: null }); // degrade gracefully
  }
});

// POST /api/shop/create-payment-intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { items, guest, calculationId, taxAmount } = req.body;
    const { email, firstName, lastName, phone, address } = guest || {};

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    if (!address || !address.line1 || !address.city || !address.state || !address.zip) {
      return res.status(400).json({ error: 'Complete shipping address is required.' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    // Validate items against DB and build snapshot
    const orderItems = [];
    let subtotal = 0;
    for (const cartItem of items) {
      const product = await Product.findById(cartItem.productId);
      if (!product || !product.active) {
        return res.status(400).json({ error: `Product not found: ${cartItem.productName || cartItem.productId}` });
      }
      const variant = product.variants[cartItem.variantIndex];
      if (!variant) {
        return res.status(400).json({ error: `Variant not found for ${product.name}` });
      }
      const qty = Math.max(1, Math.min(10, parseInt(cartItem.qty) || 1));
      orderItems.push({
        productId:         product._id,
        productName:       product.name,
        variantLabel:      variant.label,
        quantity:          qty,
        unitPrice:         variant.price,
        fulfiller:         product.fulfiller,
        printfulVariantId: variant.printfulVariantId || null,
        luluProductId:     variant.luluProductId || '',
      });
      subtotal += variant.price * qty;
    }

    const shippingCost = calcShipping(subtotal);
    const tax = parseFloat(taxAmount) || 0;
    const total = subtotal + shippingCost + tax;

    const lookupToken = crypto.randomBytes(20).toString('hex');

    const order = new Order({
      email: email.trim().toLowerCase(),
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      phone:     (phone || '').trim(),
      address: {
        line1:   address.line1.trim(),
        line2:   (address.line2 || '').trim(),
        city:    address.city.trim(),
        state:   address.state.trim().toUpperCase(),
        zip:     address.zip.trim(),
        country: (address.country || 'US').trim(),
      },
      items: orderItems,
      subtotal,
      shippingCost,
      taxAmount: tax,
      total,
      stripeTaxCalculationId: calculationId || '',
      lookupToken,
    });
    await order.save();

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const pi = await stripe.paymentIntents.create({
      amount:   Math.round(total * 100),
      currency: 'usd',
      metadata: {
        orderId:     order._id.toString(),
        source:      'shop',
        lookupToken,
      },
      automatic_payment_methods: { enabled: true },
    });

    order.stripePaymentIntentId = pi.id;
    await order.save();

    res.json({ clientSecret: pi.client_secret, lookupToken, orderId: order._id });
  } catch (err) {
    console.error('Create payment intent error:', err);
    res.status(500).json({ error: 'Failed to create order.' });
  }
});

// GET /api/shop/order-status/:token  — also supports ?pi=<paymentIntentId> for confirmation page
router.get('/order-status/:token', async (req, res) => {
  try {
    const order = await Order.findOne({ lookupToken: req.params.token });
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json({ order: publicOrderView(order) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

// GET /api/shop/order-by-pi/:piId  — for order-confirmation page redirect
router.get('/order-by-pi/:piId', async (req, res) => {
  try {
    const order = await Order.findOne({ stripePaymentIntentId: req.params.piId });
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json({ order: publicOrderView(order) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

function publicOrderView(order) {
  return {
    lookupToken:       order.lookupToken,
    email:             order.email,
    firstName:         order.firstName,
    lastName:          order.lastName,
    address:           order.address,
    items:             order.items,
    subtotal:          order.subtotal,
    shippingCost:      order.shippingCost,
    taxAmount:         order.taxAmount,
    total:             order.total,
    paymentStatus:     order.paymentStatus,
    fulfillmentStatus: order.fulfillmentStatus,
    trackingNumber:    order.trackingNumber,
    trackingUrl:       order.trackingUrl,
    carrier:           order.carrier,
    shippedAt:         order.shippedAt,
    createdAt:         order.createdAt,
  };
}

module.exports = router;
