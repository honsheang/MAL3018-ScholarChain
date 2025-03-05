const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

console.log("✅ signUpRoutes.js loaded");

// Register Route
router.post("/register", async (req, res) => {
    console.log("📩 Received request on /api/signup/register");

    const {
        role,
        issuerName,
        universitySsoId,
        email,
        domain,
        password,
        enterpriseName,
        enterpriseSsoId,
        adminEmail,
    } = req.body;

    try {
        console.log("🔑 Hashing password...");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("🆕 Creating new user...");
        const newUser = new User({
            role,
            issuerName,
            universitySsoId,
            email,
            domain,
            password: hashedPassword,
            enterpriseName,
            enterpriseSsoId,
            adminEmail,
        });

        console.log("💾 Saving user to database...");
        await newUser.save();

        console.log("✅ Registration successful!");
        res.status(201).json({ message: "Registration successful!", user: newUser });
    } catch (error) {
        console.error("Registration Error:", error); // Log the exact error
        res.status(409).json({ message: "Registration failed. Please try again.", error });
    }
});

module.exports = router;
