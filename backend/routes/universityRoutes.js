const express = require("express");
const uniAuthMiddleware = require("../middleware/uniAuthMiddleware"); // Ensure middleware is imported
const User = require("../models/User");

const router = express.Router();

console.log("✅ universityRoutes.js loaded");

router.get("/", uniAuthMiddleware, async (req, res) => {
    try {
        console.log("📩 Received request on /api/university"); // Debugging

        // Fetch university based on user ID
        const university = await User.findById(req.user.userId);

        if (!university || university.role !== "University") {
            return res.status(404).json({ message: "University not found." });
        }

        // Return university data including universitySsoId
        res.status(200).json({
            _id: university._id, // Include the university ID
            universitySsoId: university.universitySsoId, // Include the universitySsoId
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