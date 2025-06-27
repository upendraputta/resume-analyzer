const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  text: String,
  analysis: String,
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
