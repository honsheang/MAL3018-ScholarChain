const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

console.log("✅ loginRoutes.js loaded");

// POST /api/login
router.post("/login", async (req, res) => {  
    const { role, email, password } = req.body;
    console.log("Login request received:", { role, email });

    try {
        const user = await User.findOne({ role, email });
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("🔑 Invalid password");
            return res.status(401).json({ message: "Invalid password." });
        }

        console.log("✅ Login successful!");
        res.status(200).json({ message: "Login successful!", user });
    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
});

module.exports = router;
