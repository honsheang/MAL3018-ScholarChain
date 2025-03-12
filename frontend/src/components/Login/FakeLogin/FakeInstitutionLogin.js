import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FakeInstitutionLogin.module.css";

const FakeInstitution = () => {
  const navigate = useNavigate();
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");

  // List of institutions and their domains
  const institutions = [
    { name: "University of Plymouth", domain: "plymouth.ac.uk" },
    { name: "Peninsula College Northern", domain: "peninsulamalaysia.edu.my" },
  ];

  // Handle institution selection
  const handleInstitutionSelect = (e) => {
    const selected = e.target.value;
    setSelectedInstitution(selected);
    setDomain(institutions.find((inst) => inst.name === selected)?.domain || "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate domain
    const selectedDomain = institutions.find((inst) => inst.name === selectedInstitution)?.domain;
    if (domain !== selectedDomain) {
      alert("Invalid domain for the selected institution.");
      return;
    }

    // Prepare the data to be sent to the backend
    const formData = {
      role: "Student", // Hardcoded role for student login
      studentId,
      email,
      domain,
      password,
    };

    try {
      // Send the data to the backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.token); // Store the token in localStorage
        navigate("/stuDashboard"); // Redirect to student dashboard
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.fakeInstitutionContainer}>
      <div className={styles.fakeInstitution}>
        <h1>Access Through Your Institution</h1>

        {/* Institution Selection Dropdown */}
        <div className={styles.institutionSelect}>
          <label htmlFor="institution">Select Your Institution:</label>
          <select
            id="institution"
            value={selectedInstitution}
            onChange={handleInstitutionSelect}
          >
            <option value="">-- Select --</option>
            {institutions.map((inst) => (
              <option key={inst.name} value={inst.name}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input Fields (Visible only if an institution is selected) */}
        {selectedInstitution && (
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.studentId}>
              <label htmlFor="studentId">Student ID:</label>
              <input
                id="studentId"
                type="text"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())} // Convert to uppercase
                required
              />
            </div>

            <div className={styles.email}>
              <label htmlFor="email">Student Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.domain}>
              <label htmlFor="domain">Domain:</label>
              <input
                id="domain"
                type="text"
                placeholder="Enter the domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
                disabled // Domain is auto-filled based on the selected institution
              />
            </div>

            <div className={styles.password}>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FakeInstitution;