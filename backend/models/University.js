const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authorizedSignatory: {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
});

const University = mongoose.model('University', universitySchema);

module.exports = University;