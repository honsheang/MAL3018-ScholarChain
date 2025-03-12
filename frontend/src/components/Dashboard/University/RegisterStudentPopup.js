import React, { useState } from "react";
import styles from "./RegisterStudentPopup.module.css";

const RegisterStudentPopup = ({ onClose, onRegister }) => {
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [domain, setDomain] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate fields
        if (!studentId || !email || !password || !universityName || !domain) {
            alert("All fields are required.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/students/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: "Student",
                    studentId,
                    email,
                    password,
                    universityName,
                    domain,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Student registered successfully!");
                onClose(); // Close popup after successful registration
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("An error occurred during registration.");
        }
    };
    

    return (
        <div className={styles.registerStudentPopup}>
            <div className={styles.popupContent}>
                <h3>Register Student</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Student ID</label>
                        <input
                            type="text"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>University Name</label>
                        <input
                            type="text"
                            value={universityName}
                            onChange={(e) => setUniversityName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Domain</label>
                        <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit">Register</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterStudentPopup;