const express = require('express');
const { requireAuth } = require('./middleware/auth');
const User = require('./models/User');
const Enrollment = require('./models/Enrollment');
const Report = require('./models/Report');

const router = express.Router();

// GET /api/family/profile
router.get('/profile', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/family/profile
router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { firstName, lastName, phone, students } = req.body;
    const update = {};
    if (firstName) update.firstName = firstName.trim();
    if (lastName) update.lastName = lastName.trim();
    if (phone !== undefined) update.phone = phone;
    if (Array.isArray(students)) {
      update.students = students.filter(s => s.name && s.name.trim());
    }
    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select('-passwordHash');
    res.json({ ok: true, user });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// GET /api/family/enrollments
router.get('/enrollments', requireAuth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id })
      .populate('classId')
      .sort({ enrolledAt: -1 });
    res.json({ enrollments });
  } catch (err) {
    console.error('Enrollments fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch enrollments.' });
  }
});

// GET /api/family/reports
router.get('/reports', requireAuth, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
      .populate('classId', 'name')
      .sort({ uploadedAt: -1 });
    res.json({ reports });
  } catch (err) {
    console.error('Reports fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch reports.' });
  }
});

module.exports = router;
