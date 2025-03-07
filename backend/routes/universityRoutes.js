const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure middleware is imported
const User = require("../models/User");

const router = express.Router();

console.log("✅ universityRoutes.js loaded");

router.get("/", authMiddleware, async (req, res) => {
    try {
        console.log("📩 Received request on /api/university"); // Debugging

        // Fetch university based on user ID
        const university = await User.findById(req.user.userId);

        if (!university || university.role !== "University") {
            return res.status(404).json({ message: "University not found." });
        }

        res.status(200).json({
            universityName: university.universityName,
            issuerName: university.issuerName,
            email: university.email,
            domain: university.domain,
        });
    } catch (error) {
        console.error("❌ Error fetching university data:", error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
