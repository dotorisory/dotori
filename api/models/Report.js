const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  classId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  quarter:     { type: String, required: true },
  title:       { type: String, required: true },
  pdfPath:     { type: String, required: true }, // relative path, e.g. 'uploads/reports/filename.pdf'
  uploadedAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);
