const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  availability: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);