const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role: { type: String, required: true }, // "University" or "Employer"
    universityName: { type: String }, // University Name
    universitySsoId: { type: String }, // For University
    issuerName: { type: String }, // For University
    email: { type: String, required: true, unique: true  }, // For University
    domain: { type: String }, // For University
    password: { type: String, required: true, unique: true  }, // For University
    enterpriseName: { type: String }, // For Employer
    enterpriseSsoId: { type: String }, // For Employer
    adminEmail: { type: String }, // For Employer
});

const User = mongoose.model("User", UserSchema);

module.exports = User;