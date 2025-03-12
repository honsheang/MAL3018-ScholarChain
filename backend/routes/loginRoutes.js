const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("✅ loginRoutes.js loaded");

// POST /api/login
router.post("/login", async (req, res) => {
  const { role, email, password, studentId } = req.body; // Add studentId to the request body
  console.log("Login request received:", { role, email, studentId });

  try {
    // Validate required fields
    if (!role || !email || !password) {
      return res.status(400).json({ message: "Role, email, and password are required." });
    }

    // For Students: Use the Student model
    if (role === "Student") {
      // Additional validation for students: studentId is required
      if (!studentId) {
        return res.status(400).json({ message: "Student ID is required for student login." });
      }

      // Find the student by email
      const student = await Student.findOne({ email });
      console.log("Student found:", student); // Debugging log

      if (!student) {
        console.log("❌ Student not found");
        return res.status(404).json({ message: "Student not found." });
      }

      // Validate studentId
      if (student.studentId !== studentId) {
        console.log("❌ Invalid student ID");
        return res.status(401).json({ message: "Invalid student ID." });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (!isPasswordValid) {
        console.log("🔑 Invalid password");
        return res.status(401).json({ message: "Invalid password." });
      }

      // ✅ Generate JWT Token
      const token = jwt.sign(
        { id: student._id, role: student.role },
        process.env.JWT_SECRET, // Ensure this is set in your .env file
        { expiresIn: "1h" }
      );

      console.log("✅ Student login successful! Token generated:", token);

      // ✅ Send token in response
      return res.status(200).json({
        message: "Login successful!",
        token,  
        role: student.role,
        studentId: student.studentId,  // ✅ Add this line
      });
      
    }

    // For Other Roles (University, Employer): Use the User model
    else {
      // Find the user by role and email
      const user = await User.findOne({ role, email });
      console.log("User found:", user); // Debugging log

      if (!user) {
        console.log("❌ User not found");
        return res.status(404).json({ message: "User not found." });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("🔑 Invalid password");
        return res.status(401).json({ message: "Invalid password." });
      }

      // ✅ Generate JWT Token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET, // Ensure this is set in your .env file
        { expiresIn: "1h" }
      );

      console.log("✅ User login successful! Token generated:", token);

      // ✅ Send token in response
      return res.status(200).json({
        message: "Login successful!",
        token, // Include token in the response
        role: user.role,
      });
    }
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

module.exports = router;