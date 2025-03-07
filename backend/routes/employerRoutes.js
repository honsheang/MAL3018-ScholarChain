const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User"); // Import User model


console.log("✅ employerRoutes.js loaded");

router.get("/employer", authMiddleware, async (req, res) => {
    try {
        // Find the employer in the users collection
        const employer = await User.findById(req.user.userId).select("enterpriseName role");

        if (!employer) {
            return res.status(404).json({ message: "Employer not found." });
        }

        const employerData = {
            id: employer._id,
            role: employer.role,
            enterpriseName: employer.enterpriseName || "Unknown Enterprise", // Handle missing names
        };

        console.log("✅ Sending Employer Data:", employerData); // Debugging

        res.status(200).json(employerData);
    } catch (error) {
        console.error("❌ Error fetching employer data:", error);
        res.status(500).json({ message: "Failed to retrieve employer data." });
    }
});



module.exports = router;