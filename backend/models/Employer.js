const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enterpriseName: { type: String, required: true },
    enterpriseSsoId: { type: String, required: true },
    adminEmail: { type: String, required: true }
}, { timestamps: true });

const Employer = mongoose.model("Employer", EmployerSchema);
module.exports = Employer;
