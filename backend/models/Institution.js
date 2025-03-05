// models/Institution.js
const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ssoUrl: { type: String, required: true }, // URL for SSO login
});

const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = Institution;