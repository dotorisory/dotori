const express = require('express');
const { requireAuth } = require('./middleware/auth');
const Class = require('./models/Class');
const Enrollment = require('./models/Enrollment');

const router = express.Router();

// GET /api/classes — list active classes, optionally filter by quarter
router.get('/', async (req, res) => {
  try {
    const filter = { active: true };
    if (req.query.quarter) filter.quarter = req.query.quarter;
    if (req.query.category) filter.category = req.query.category;
    const classes = await Class.find(filter).sort({ createdAt: 1 });
    // Attach enrollment count to each class
    const withCounts = await Promise.all(classes.map(async (c) => {
      const count = await Enrollment.countDocuments({ classId: c._id, paymentStatus: { $ne: 'refunded' } });
      return { ...c.toObject(), enrolledCount: count };
    }));
    // Group by category order: reading → writing → korean → summer → 1on1
    const catOrder = { reading: 0, writing: 1, korean: 2, summer: 3, '1on1': 4 };
    withCounts.sort((a, b) => (catOrder[a.category] ?? 9) - (catOrder[b.category] ?? 9));
    res.json({ classes: withCounts });
  } catch (err) {
    console.error('Classes fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch classes.' });
  }
});

// POST /api/classes/:id/enroll — initiate enrollment (creates pending enrollment + Stripe PaymentIntent)
router.post('/:id/enroll', requireAuth, async (req, res) => {
  try {
    const { studentName, dayChoice } = req.body;
    if (!studentName || !studentName.trim()) {
      return res.status(400).json({ error: 'Student name is required.' });
    }
    const cls = await Class.findById(req.params.id);
    if (!cls || !cls.active) return res.status(404).json({ error: 'Class not found.' });

    // Require dayChoice for multi-day classes
    const isMultiDay = cls.schedule && cls.schedule.includes(' or ');
    if (isMultiDay && !dayChoice) {
      return res.status(400).json({ error: 'Please select a day for this class.' });
    }

    // Check capacity
    const enrolledCount = await Enrollment.countDocuments({ classId: cls._id, paymentStatus: { $ne: 'refunded' } });
    if (enrolledCount >= cls.capacity) {
      return res.status(400).json({ error: 'This class is full.' });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({ userId: req.user._id, classId: cls._id, studentName: studentName.trim(), paymentStatus: { $ne: 'refunded' } });
    if (existing) {
      return res.status(400).json({ error: 'This student is already enrolled in this class.' });
    }

    // Create Stripe PaymentIntent
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(cls.price * 100), // cents
      currency: 'usd',
      metadata: {
        userId: req.user._id.toString(),
        classId: cls._id.toString(),
        studentName: studentName.trim(),
        quarter: cls.quarter,
      },
    });

    // Create pending enrollment
    const enrollment = new Enrollment({
      userId: req.user._id,
      studentName: studentName.trim(),
      classId: cls._id,
      quarter: cls.quarter,
      paymentStatus: 'pending',
      stripePaymentIntentId: paymentIntent.id,
      amountPaid: cls.price,
      dayChoice: dayChoice ? dayChoice.trim() : '',
    });
    await enrollment.save();

    res.json({ clientSecret: paymentIntent.client_secret, enrollmentId: enrollment._id });
  } catch (err) {
    console.error('Enroll error:', err);
    res.status(500).json({ error: 'Failed to initiate enrollment.' });
  }
});

module.exports = router;
