const express = require('express');
const multer = require('multer');
const path = require('path');
const { requireAdmin } = require('./middleware/auth');
const User = require('./models/User');
const Class = require('./models/Class');
const Enrollment = require('./models/Enrollment');
const Report = require('./models/Report');
const Product = require('./models/Product');
const Order = require('./models/Order');
const { sendReportNotification } = require('./mailer');

const router = express.Router();

// Multer setup for PDF report uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/reports')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed.'));
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// All admin routes require admin role
router.use(requireAdmin);

// GET /api/admin/families
router.get('/families', async (req, res) => {
  try {
    const users = await User.find({ role: 'family' }).select('-passwordHash').sort({ createdAt: -1 });
    const withCounts = await Promise.all(users.map(async (u) => {
      const enrollmentCount = await Enrollment.countDocuments({ userId: u._id });
      return { ...u.toObject(), enrollmentCount };
    }));
    res.json({ families: withCounts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch families.' });
  }
});

// GET /api/admin/enrollments
router.get('/enrollments', async (req, res) => {
  try {
    const filter = {};
    if (req.query.quarter) filter.quarter = req.query.quarter;
    if (req.query.status) filter.paymentStatus = req.query.status;
    const enrollments = await Enrollment.find(filter)
      .populate('userId', 'firstName lastName email phone')
      .populate('classId', 'name schedule price')
      .sort({ enrolledAt: -1 });
    res.json({ enrollments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enrollments.' });
  }
});

// PUT /api/admin/enrollments/:id — update payment status, price, or notes
router.put('/enrollments/:id', async (req, res) => {
  try {
    const { paymentStatus, notes, amountPaid } = req.body;
    const update = {};
    if (paymentStatus) {
      update.paymentStatus = paymentStatus;
      if (paymentStatus === 'paid') update.paidAt = new Date();
    }
    if (amountPaid !== undefined && amountPaid !== '') update.amountPaid = Number(amountPaid);
    if (notes !== undefined) update.notes = notes;
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate('userId', 'firstName lastName email')
      .populate('classId', 'name');
    res.json({ ok: true, enrollment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update enrollment.' });
  }
});

// DELETE /api/admin/enrollments/:id
router.delete('/enrollments/:id', async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enrollment.' });
  }
});

// GET /api/admin/classes
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().sort({ quarter: 1, name: 1 });
    const withCounts = await Promise.all(classes.map(async (c) => {
      const count = await Enrollment.countDocuments({ classId: c._id, paymentStatus: { $ne: 'refunded' } });
      return { ...c.toObject(), enrolledCount: count };
    }));
    res.json({ classes: withCounts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes.' });
  }
});

// POST /api/admin/classes
router.post('/classes', async (req, res) => {
  try {
    const { name, category, quarter, schedule, description, price, capacity } = req.body;
    if (!name || !category || !quarter || price === undefined) {
      return res.status(400).json({ error: 'Name, category, quarter, and price are required.' });
    }
    const cls = new Class({ name, category, quarter, schedule, description, price: Number(price), capacity: capacity || 20 });
    await cls.save();
    res.json({ ok: true, class: cls });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create class.' });
  }
});

// PUT /api/admin/classes/:id
router.put('/classes/:id', async (req, res) => {
  try {
    const { name, category, quarter, schedule, description, price, capacity, active } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (category !== undefined) update.category = category;
    if (quarter !== undefined) update.quarter = quarter;
    if (schedule !== undefined) update.schedule = schedule;
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = Number(price);
    if (capacity !== undefined) update.capacity = Number(capacity);
    if (active !== undefined) update.active = active;
    const cls = await Class.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ ok: true, class: cls });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update class.' });
  }
});

// DELETE /api/admin/classes/:id
router.delete('/classes/:id', async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete class.' });
  }
});

// GET /api/admin/reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('userId', 'firstName lastName email')
      .populate('classId', 'name')
      .sort({ uploadedAt: -1 });
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports.' });
  }
});

// POST /api/admin/reports/upload
router.post('/reports/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'PDF file is required.' });
    const { userId, studentName, classId, quarter, title } = req.body;
    if (!userId || !studentName || !quarter || !title) {
      return res.status(400).json({ error: 'userId, studentName, quarter, and title are required.' });
    }
    const pdfPath = 'uploads/reports/' + req.file.filename;
    const report = new Report({
      userId,
      studentName,
      classId: classId || undefined,
      quarter,
      title,
      pdfPath,
    });
    await report.save();

    // Send email notification to parent
    try {
      const parent = await User.findById(userId).select('email firstName');
      if (parent && parent.email) {
        const siteUrl = process.env.SITE_URL || `http://localhost:${process.env.PORT || 3003}`;
        await sendReportNotification({
          to: parent.email,
          parentName: parent.firstName,
          studentName,
          title,
          quarter,
          siteUrl,
        });
      }
    } catch (mailErr) {
      console.error('Report email notification failed:', mailErr.message);
      // Don't fail the upload if email fails
    }

    res.json({ ok: true, report });
  } catch (err) {
    console.error('Report upload error:', err);
    res.status(500).json({ error: 'Failed to upload report.' });
  }
});

// DELETE /api/admin/reports/:id
router.delete('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (report) {
      const fs = require('fs');
      const fullPath = path.join(__dirname, '..', report.pdfPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete report.' });
  }
});

// ── Shop Products ───────────────────────────────────────────

// GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// POST /api/admin/products
router.post('/products', async (req, res) => {
  try {
    const { name, slug, description, imageUrl, fulfiller, variants, active } = req.body;
    if (!name || !fulfiller) return res.status(400).json({ error: 'Name and fulfiller are required.' });
    const autoSlug = (slug || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const product = new Product({ name, slug: autoSlug, description, imageUrl, fulfiller, variants: variants || [], active: active !== false });
    await product.save();
    res.json({ ok: true, product });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'A product with that slug already exists.' });
    res.status(500).json({ error: 'Failed to create product.' });
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', async (req, res) => {
  try {
    const { name, slug, description, imageUrl, fulfiller, variants, active } = req.body;
    const update = {};
    if (name !== undefined)        update.name = name;
    if (slug !== undefined)        update.slug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (description !== undefined) update.description = description;
    if (imageUrl !== undefined)    update.imageUrl = imageUrl;
    if (fulfiller !== undefined)   update.fulfiller = fulfiller;
    if (variants !== undefined)    update.variants = variants;
    if (active !== undefined)      update.active = active;
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ ok: true, product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// ── Shop Orders ─────────────────────────────────────────────

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status)      filter.paymentStatus = req.query.status;
    if (req.query.fulfillment) filter.fulfillmentStatus = req.query.fulfillment;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// GET /api/admin/orders/:id
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

// PUT /api/admin/orders/:id — update tracking, notes, fulfillment status
router.put('/orders/:id', async (req, res) => {
  try {
    const { trackingNumber, trackingUrl, carrier, fulfillmentStatus, notes } = req.body;
    const update = {};
    if (trackingNumber !== undefined)    update.trackingNumber = trackingNumber;
    if (trackingUrl !== undefined)       update.trackingUrl = trackingUrl;
    if (carrier !== undefined)           update.carrier = carrier;
    if (fulfillmentStatus !== undefined) update.fulfillmentStatus = fulfillmentStatus;
    if (notes !== undefined)             update.notes = notes;
    if (trackingNumber && !req.body.shippedAt) update.shippedAt = new Date();
    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ ok: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order.' });
  }
});

// POST /api/admin/orders/:id/refund
router.post('/orders/:id/refund', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    if (!order.stripePaymentIntentId) return res.status(400).json({ error: 'No payment intent on this order.' });

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const pi = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId);
    const chargeId = pi.latest_charge;
    await stripe.refunds.create({ charge: chargeId });

    await Order.findByIdAndUpdate(order._id, { paymentStatus: 'refunded' });
    res.json({ ok: true });
  } catch (err) {
    console.error('Refund error:', err);
    res.status(500).json({ error: err.message || 'Failed to process refund.' });
  }
});

// POST /api/admin/orders/:id/reship — re-trigger Printful or Lulu fulfillment
router.post('/orders/:id/reship', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });

    const hasPrintful = order.items.some(i => i.fulfiller === 'printful');
    const hasLulu     = order.items.some(i => i.fulfiller === 'lulu');

    // Reset IDs so createPrintfulOrder / createLuluJob will re-trigger
    await Order.findByIdAndUpdate(order._id, { printfulOrderId: null, luluJobId: '', fulfillmentStatus: 'unfulfilled' });
    const freshOrder = await Order.findById(order._id);

    if (hasLulu) {
      const { createLuluJob } = require('./luluClient');
      await createLuluJob(freshOrder);
    }
    // Note: Printful re-ship must be done manually in Printful dashboard for now

    res.json({ ok: true, message: 'Re-ship triggered.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to trigger re-ship.' });
  }
});

module.exports = router;
