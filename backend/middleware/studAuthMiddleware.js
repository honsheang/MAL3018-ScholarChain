const jwt = require("jsonwebtoken");
const Student = require("../models/Student"); // Import the Student model

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

    // Verify the token using the pureToken
    const decoded = jwt.verify(pureToken, process.env.JWT_SECRET); // Verify JWT
    console.log("🔹 Decoded Token:", decoded); // Debugging

    // Fetch student from DB to get full details
    const student = await Student.findById(decoded.id); // Use the Student model
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Attach student details to the request object
    req.user = {
      userId: student._id,
      role: student.role,
      studentID: student.studentID, // Add studentID for reference
    };

    console.log("🔹 Authenticated Student:", req.user);
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error);
    res.status(401).json({ message: "Invalid token." });
  }
};