const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:3000", // ✅ Allow requests from your frontend only
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // ✅ Allow cookies and authentication headers
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // ✅ Apply CORS settings

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});
app.use(express.urlencoded({ extended: true })); // ✅ Enables URL-encoded form data



// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/scholarchain")
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

console.log("✅ Routes loaded");

app.use("/api/signup", signUpRoutes);
app.use("/api", loginRoutes);
app.use("/api", employerRoutes);
app.use("/api/university", universityRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

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



