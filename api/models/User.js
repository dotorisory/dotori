const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, default: '' },
});

const userSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  firstName:    { type: String, required: true, trim: true },
  lastName:     { type: String, required: true, trim: true },
  phone:        { type: String, default: '' },
  role:         { type: String, enum: ['family', 'admin'], default: 'family' },
  students:     [studentSchema],
  createdAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
