const express = require("express");
const User = require("../models/User");
const Student = require("../models/Student"); // Import the Student model
const Employer = require("../models/Employer");
const bcrypt = require("bcryptjs");
const router = express.Router();

console.log("✅ signUpRoutes.js loaded");

// Register Route
router.post("/register", async (req, res) => {
    console.log("📩 Received request on /api/signup/register");
    console.log("📥 Incoming Request Body:", req.body);

    const {
        role,
        universityName,
        issuerName,
        universitySsoId,
        email,
        domain,
        password,
        enterpriseName,
        enterpriseSsoId,
        adminEmail,
        studentId, // Add studentId for student registration
    } = req.body;

    try {
        // Validate required fields based on role
        if (role === "University" && (!universityName || !email || !password)) {
            return res.status(400).json({ message: "University name, email, and password are required." });
        }
        if (role === "Employer" && (!enterpriseName || !adminEmail || !password)) {
            return res.status(400).json({ message: "Enterprise name, admin email, and password are required." });
        }
        if (role === "Student" && (!studentId || !universityName || !email || !domain || !password)) {
            return res.status(400).json({ message: "Student ID, university name, email, domain, and password are required." });
        }

        console.log("🔑 Hashing password...");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Handle Student Registration
        if (role === "Student") {
            console.log("🆕 Creating new student...");

            const studentData = {
                role,
                studentId,
                universityName,
                email,
                domain,
                password: hashedPassword,
            };

            const newStudent = new Student(studentData);

            console.log("💾 Saving student to database...");
            await newStudent.save();

            console.log("✅ Student registration successful!");
            return res.status(201).json({ message: "Student registration successful!", student: newStudent });
        }

        // Handle University and Employer Registration
        const userData = {
            role,
            password: hashedPassword,
        };

        if (role === "University") {
            userData.universityName = universityName;
            userData.issuerName = issuerName;
            userData.universitySsoId = universitySsoId;
            userData.email = email;
            userData.domain = domain;
        } else if (role === "Employer") {
            userData.enterpriseName = enterpriseName;
            userData.enterpriseSsoId = enterpriseSsoId;
            userData.email = adminEmail; // Map adminEmail to email
        }

        console.log("🆕 Creating new user...");
        const newUser = new User(userData);

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