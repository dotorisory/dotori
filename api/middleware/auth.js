const User = require('../models/User');

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const user = await User.findById(req.session.userId).select('-passwordHash');
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

async function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const user = await User.findById(req.session.userId).select('-passwordHash');
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { requireAuth, requireAdmin };
