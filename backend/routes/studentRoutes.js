const express = require("express");
const Student = require("../models/Student");
const bcrypt = require("bcrypt");

const router = express.Router();

console.log("✅ studentRoutes.js loaded");

// Register a new student
router.post("/register", async (req, res) => {
  try {
    const { studentId, email, password, universityName, domain } = req.body;

    // Validate required fields
    if (!studentId || !email || !password || !universityName || !domain) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const newStudent = new Student({
      studentId,
      email,
      password: hashedPassword,
      universityName,
      domain,
      role: "Student", // Set the role to "Student"
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error("❌ Error registering student:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;