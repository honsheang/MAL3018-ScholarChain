const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const StudentSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "Student",
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    universityName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    domain: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;