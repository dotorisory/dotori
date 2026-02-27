const express = require('express');
const crypto = require('crypto');
const Order = require('./models/Order');

const router = express.Router();

// POST /api/shop/printful-webhook  (registered with express.raw before express.json)
router.post('/printful-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-printful-signature'];
    const secret    = process.env.PRINTFUL_WEBHOOK_SECRET;

    if (secret) {
      const expected = crypto
        .createHmac('sha256', secret)
        .update(req.body)
        .digest('hex');
      if (signature !== expected) {
        return res.status(401).send('Invalid signature');
      }
    }

    const event = JSON.parse(req.body.toString());

    if (event.type === 'package_shipped') {
      const printfulOrderId = event.data?.order?.id;
      const shipment        = event.data?.shipment || {};

      if (!printfulOrderId) return res.json({ ok: true });

      const order = await Order.findOneAndUpdate(
        { printfulOrderId },
        {
          trackingNumber:    shipment.tracking_number || '',
          trackingUrl:       shipment.tracking_url    || '',
          carrier:           shipment.carrier         || '',
          shippedAt:         new Date(),
          printfulStatus:    'fulfilled',
          fulfillmentStatus: 'fulfilled',
        },
        { new: true }
      );

      if (order && !order.shippingEmailSent) {
        try {
          const { sendShippingNotification } = require('./mailer');
          const siteUrl = process.env.SITE_URL || 'http://localhost:3003';
          await sendShippingNotification({
            to:        order.email,
            firstName: order.firstName,
            order,
            siteUrl,
          });
          await Order.findByIdAndUpdate(order._id, { shippingEmailSent: true });
        } catch (mailErr) {
          console.error('Shipping notification email failed:', mailErr.message);
        }
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Printful webhook error:', err);
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
});

module.exports = router;
