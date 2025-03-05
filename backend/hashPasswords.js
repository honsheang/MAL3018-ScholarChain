const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/scholarchain";

// Connect to MongoDB
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        hashPasswords(); // Run the password hashing function
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });

async function hashPasswords() {
    try {
        const users = await User.find({});

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the plain text password
            user.password = hashedPassword; // Update the password field
            await user.save(); // Save the updated user document
            console.log(`Hashed password for user: ${user.email}`);
        }

        console.log("All passwords have been hashed.");
    } catch (err) {
        console.error("Error hashing passwords:", err);
    } finally {
        mongoose.connection.close(); // Close the MongoDB connection
    }
}