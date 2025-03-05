import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FakeInstitutionLogin.module.css"; // Create a new CSS module for this component

const FakeInstitutionLogin = () => {
    const navigate = useNavigate();
    const [selectedInstitution, setSelectedInstitution] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const institutions = [
        { id: 1, name: "Demo University" },
        { id: 2, name: "Fake Tech Institute" },
        { id: 3, name: "Mock Global College" },
    ];

    const handleInstitutionSelect = (e) => {
        setSelectedInstitution(e.target.value);
    };

    const handleLogin = () => {
        if (selectedInstitution && username && password) {
            // Simulate a successful login
            alert(`Logged in as ${username} at ${selectedInstitution}`);
            navigate("/student-dashboard"); // Redirect to a fake student dashboard
        } else {
            alert("Please select an institution and enter your credentials.");
        }
    };

    return (
        <div className={styles.fakeInstitutionLogin}>
    <h1>Access Through Your Institution</h1>
    <div className={styles.institutionSelect}>
        <label htmlFor="institution">Select Your Institution:</label>
        <select
            id="institution"
            value={selectedInstitution}
            onChange={handleInstitutionSelect}
        >
            <option value="">-- Select --</option>
            {institutions.map((inst) => (
                <option key={inst.id} value={inst.name}>
                    {inst.name}
                </option>
            ))}
        </select>
    </div>
    <div className={styles.credentials}>
        <label htmlFor="username">Username:</label>
        <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
        />
        <label htmlFor="password">Password:</label>
        <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
        />
    </div>
    <button className={styles.loginButton} onClick={handleLogin}>
        Continue to Login
    </button>
</div>
    );
};

export default FakeInstitutionLogin;