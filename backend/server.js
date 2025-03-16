const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from your frontend only
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Apply CORS settings

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Enables URL-encoded form data
app.use("/uploads", express.static("uploads"));



// Logging Middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Request Body:", req.body);
  }
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/scholarchain")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Routes
const signUpRoutes = require("./routes/signUpRoutes");
const loginRoutes = require("./routes/loginRoutes");
const employerRoutes = require("./routes/employerRoutes");
const universityRoutes = require("./routes/universityRoutes");
const studentRoutes = require("./routes/studentRoutes");
const transcriptRoutes = require("./routes/transcriptRoutes"); // Import transcript routes
const uploadRoutes = require("./routes/uploadRoutes"); // Import upload routes
const ocrRoutes = require('./routes/ocrRoutes');

app.use("/api/signup", signUpRoutes);
app.use("/api", loginRoutes);
app.use("/api", employerRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/transcripts", transcriptRoutes); 
app.use("/api/upload", uploadRoutes); 
app.use('/api/ocr', ocrRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Log Registered Routes
console.log("Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) { // If it's a route, print it
    const methods = Object.keys(middleware.route.methods)
      .map((method) => method.toUpperCase())
      .join(", ");
    console.log(`Registered Route -> ${methods} ${middleware.route.path}`);
  } else if (middleware.name === "router") { // If it's a router, iterate its stack
    middleware.handle.stack.forEach((route) => {
      if (route.route) {
        const methods = Object.keys(route.route.methods)
          .map((method) => method.toUpperCase())
          .join(", ");
        console.log(`Registered Route -> ${methods} ${route.route.path}`);
      }
    });
  }
});