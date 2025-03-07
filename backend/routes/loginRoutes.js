const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import JWT

const SECRET_KEY = "123456"; // Use an environment variable in production

console.log("✅ loginRoutes.js loaded");

// POST /api/login
router.post("/login", async (req, res) => {
    const { role, email, password } = req.body;
    console.log("Login request received:", { role, email });

    try {
        // Validate required fields
        if (!role || !email || !password) {
            return res.status(400).json({ message: "Role, email, and password are required." });
        }

        // Find the user by role and email
        const user = await User.findOne({ role, email });

        // Check if user exists
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
            process.env.JWT_SECRET,  // ✅ Ensure this is used
            { expiresIn: "1h" }
        );

        console.log("✅ Login successful! Token generated:", token);

        // ✅ Send token in response
        res.status(200).json({ 
            message: "Login successful!", 
            token,  // Include token in the response
            role: user.role
        });
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
});

module.exports = router;
