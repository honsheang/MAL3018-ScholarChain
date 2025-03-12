const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

console.log("✅ studentRoutes.js loaded");

// Register a new student
router.post("/register", async (req, res) => {
    try {
        const { studentId, email, password, universityName, domain } = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ error: "Student already exists!" });
        }

        // Create new student
        const newStudent = new Student({ studentId, email, password, universityName, domain });
        await newStudent.save();

        res.status(201).json({ message: "Student registered successfully!" });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
