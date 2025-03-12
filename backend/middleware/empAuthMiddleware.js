const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure you import the User model

module.exports = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
    console.log("🔹 Raw Token from Header:", token);
    
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Remove "Bearer " prefix before verification
        const pureToken = token.replace("Bearer ", "");
        console.log("🔹 Token after removing Bearer:", pureToken);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
        console.log("🔹 Decoded Token:", decoded); // Debugging

        // Fetch user from DB to get full details
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = {
            userId: user._id,
            role: user.role,
            enterpriseName: user.enterpriseName, // Ensure field exists in DB
        };

        console.log("🔹 Authenticated User:", req.user);
        next();
    } catch (error) {
        console.error("❌ Invalid Token:", error);
        res.status(401).json({ message: "Invalid token." });
    }
};