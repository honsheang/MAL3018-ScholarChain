import React, { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./SIgnUp.module.css";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";
import campusImage from "/ScholarChain/frontend/src/components/Image/campus.png";

const SignUp = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [activeRole, setActiveRole] = useState("University");

	const [issuerName, setIssuerName] = useState("");
	const [universitySsoId, setUniversitySsoId] = useState("");
	const [email, setEmail] = useState("");

	const [domain, setDomain] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [enterpriseName, setEnterpriseName] = useState("");
	const [enterpriseSsoId, setEnterpriseSsoId] = useState("");
	const [adminEmail, setAdminEmail] = useState("");

	

	const onAccessContainerClick = useCallback(() => {
		alert("Redirecting to institutional access...");
		setLoading(true); // Show spinner
		setTimeout(() => {
			setLoading(false); // Hide spinner
			navigate("/stuDashboard"); // Navigate after delay
		}, 2000); // 2-second delay
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = {};

		// Collect form data based on the active role
		if (activeRole === "University") {
			formData = {
				role: activeRole,
				issuerName: document.getElementById("issuerName")?.value,
				universitySsoId: document.getElementById("uniSso")?.value,
				email: document.getElementById("uniEmail")?.value,
				domain: document.getElementById("uniDomain")?.value,
				password: document.getElementById("uniPassword")?.value,
				confirmPassword: document.getElementById("uniConfirmPassword")?.value,
			};
		} else if (activeRole === "Employer") {
			formData = {
				role: activeRole,
				enterpriseName: document.getElementById("enterpriseName")?.value,
				enterpriseSsoId: document.getElementById("enterpriseSso")?.value,
				adminEmail: document.getElementById("enterpriseEmail")?.value,
				domain: document.getElementById("enterpriseDomain")?.value,
				password: document.getElementById("enterprisePassword")?.value,
				confirmPassword: document.getElementById("enterpriseConfirmPassword")
					?.value,
			};
		}

		// Check if all fields are filled
		if (Object.values(formData).some((value) => !value)) {
			alert("Please fill in all fields before proceeding.");
			return;
		}

		// Check if password and confirm password match
		if (formData.password !== formData.confirmPassword) {
			alert("Password and Confirm Password do not match.");
			return;
		}

		// Remove confirmPassword from the data before sending to the backend
		delete formData.confirmPassword;

		try {
			const response = await fetch(
				"http://localhost:5000/api/signup/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				},
			);

			if (response.ok) {
				alert("Registration successful!");
				navigate("/pending");
			} else {
				alert("Registration failed. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred. Please try again.");
		}
	};

	const onRegisterButtonContainerClick = useCallback(() => {
		if (location.pathname === "/register") {
			alert("You're already here!!!");
		} else {
			navigate("/register");
		}
	}, [navigate, location]);

	const onHomeButtonContainerClick = useCallback(() => {
		navigate("/");
	}, [navigate]);

	const onLoginButtonContainerClick = useCallback(() => {
		navigate("/login");
	}, [navigate]);

	const handleRoleSelection = (role) => {
		setActiveRole(role); // Change active role
	};

	return (
		<div className={styles.signUp}>
			<div className={styles.btm}>
				<div className={styles.btmChild} />
				<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
			</div>
			<div
				className={styles.registerButton}
				onClick={onRegisterButtonContainerClick}
			>
				<b className={styles.register}>Register</b>
			</div>
			<div className={styles.loginButton} onClick={onLoginButtonContainerClick}>
				<b className={styles.login}>Login</b>
			</div>
			<div className={styles.navigationBar}>
				<div className={styles.navigationBarChild} />
				<div className={styles.featuresButton}>
					<b className={styles.features}>Features</b>
				</div>
				<div className={styles.guideButton}>
					<b className={styles.guide}>Guide</b>
				</div>
				<div className={styles.contactButton}>
					<b className={styles.guide}>Contact</b>
				</div>
				<div className={styles.aboutButton}>
					<b className={styles.about}>About</b>
				</div>
				<div className={styles.homeButton} onClick={onHomeButtonContainerClick}>
					<b className={styles.about}>Home</b>
				</div>
			</div>
			<div className={styles.logo}>
				<div className={styles.secureAcademicTranscript}>
					"Secure Academic Transcript Validation with Blockchain"
				</div>
				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
			</div>

			<div className={styles.signUpDetail}>
				<div
					className={`${styles.blue} ${activeRole === "Student" ? styles.blueStudent : ""}`}
				/>
				<div
					className={`${styles.white} ${activeRole === "Student" ? styles.whiteStudent : ""}`}
				/>

				<div
					className={`${styles.universityButton} ${
						activeRole === "University"
							? styles.activeButton
							: styles.inactiveButton
					}`}
					onClick={() => handleRoleSelection("University")}
				>
					<div className={styles.universityButtonChild} />
					<b className={styles.university}>University</b>
				</div>
				<div
					className={`${styles.employerButton} ${
						activeRole === "Employer"
							? styles.activeButton
							: styles.inactiveButton
					}`}
					onClick={() => handleRoleSelection("Employer")}
				>
					<div className={styles.employerButtonChild} />
					<b className={styles.university}>Employer</b>
				</div>
				<div
					className={`${styles.studentButton} ${
						activeRole === "Student"
							? styles.activeButton
							: styles.inactiveButton
					}`}
					onClick={() => handleRoleSelection("Student")}
				>
					<div className={styles.employerButtonChild} />
					<b className={styles.university}>Student</b>
				</div>

				{/* Dynamic Input Fields Based on Selected Role */}
				{activeRole === "University" && (
					<>
						<div className={styles.issuerName}>
							<label className={styles.universitySsoId} htmlFor="issuerName">
								Issuer Name
							</label>
							<input
								id="issuerName"
								type="text"
								className={styles.textInput}
								placeholder="Enter the Issuer Name"
								value={issuerName}
								onChange={(e) => setIssuerName(e.target.value)}
							/>
						</div>

						<div className={styles.uniSso}>
							<label className={styles.universitySsoId} htmlFor="uniSso">
								University SSO ID
							</label>
							<input
								id="uniSso"
								type="text"
								className={styles.textInput}
								placeholder="Enter the University SSO ID"
								value={universitySsoId}
								onChange={(e) => setUniversitySsoId(e.target.value)}
							/>
						</div>
						<div className={styles.email}>
							<label className={styles.universitySsoId} htmlFor="uniEmail">
								Email
							</label>
							<input
								id="uniEmail"
								type="text"
								className={styles.textInput}
								placeholder="Enter the valid email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className={styles.domain}>
							<label className={styles.universitySsoId} htmlFor="uniDomain">
								Domain Name
							</label>
							<input
								id="uniDomain"
								type="text"
								className={styles.textInput}
								placeholder="Enter the valid domain"
								value={domain}
								onChange={(e) => setDomain(e.target.value)}
							/>
						</div>
						<div className={styles.password}>
							<label className={styles.universitySsoId} htmlFor="uniPassword">
								Set Password
							</label>
							<input
								id="uniPassword"
								type="password"
								className={styles.textInput}
								placeholder="Set password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className={styles.confirmPass}>
							<label
								className={styles.universitySsoId}
								htmlFor="uniConfirmPassword"
							>
								Confirm Password
							</label>
							<input
								id="uniConfirmPassword"
								type="password"
								className={styles.textInput}
								placeholder="Enter again"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						<div
							className={styles.submitButton}
							onClick={handleSubmit} // Updated submit handler
						>
							<div className={styles.submitButtonChild} />
							<b className={styles.submit}>Submit</b>
						</div>
					</>
				)}

				{activeRole === "Employer" && (
					<>
						<div className={styles.issuerName}>
							<label
								className={styles.universitySsoId}
								htmlFor="enterpriseName"
							>
								Enterprise Name
							</label>
							<input
								id="enterpriseName"
								type="text"
								className={styles.textInput}
								placeholder="Enter the Enterprise Name"
								value={enterpriseName}
								onChange={(e) => setEnterpriseName(e.target.value)}
							/>
						</div>
						<div className={styles.uniSso}>
							<label className={styles.universitySsoId} htmlFor="enterpriseSso">
								SSO ID
							</label>
							<input
								id="enterpriseSso"
								type="text"
								className={styles.textInput}
								placeholder="Enter the Enterprise SSO ID"
								value={enterpriseSsoId}
								onChange={(e) => setEnterpriseSsoId(e.target.value)}
							/>
						</div>
						<div className={styles.email}>
							<label
								className={styles.universitySsoId}
								htmlFor="enterpriseEmail"
							>
								Admin Email
							</label>
							<input
								id="enterpriseEmail"
								type="text"
								className={styles.textInput}
								placeholder="Enter the Admin Email"
								value={adminEmail}
								onChange={(e) => setAdminEmail(e.target.value)}
							/>
						</div>
						<div className={styles.domain}>
							<label
								className={styles.universitySsoId}
								htmlFor="enterpriseDomain"
							>
								Domain Name
							</label>
							<input
								id="enterpriseDomain"
								type="text"
								className={styles.textInput}
								placeholder="Enter the Enterprise Domain"
								value={domain}
								onChange={(e) => setDomain(e.target.value)}
							/>
						</div>
						<div className={styles.password}>
							<label
								className={styles.universitySsoId}
								htmlFor="enterprisePassword"
							>
								Set Password
							</label>
							<input
								id="enterprisePassword"
								type="password"
								className={styles.textInput}
								placeholder="Set Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className={styles.confirmPass}>
							<label
								className={styles.universitySsoId}
								htmlFor="enterpriseConfirmPassword"
							>
								Confirm Password
							</label>
							<input
								id="enterpriseConfirmPassword"
								type="password"
								className={styles.textInput}
								placeholder="Enter again your Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>

						<div
							className={styles.submitButton}
							onClick={handleSubmit} // Updated submit handler
						>
							<div className={styles.submitButtonChild} />
							<b className={styles.submit}>Submit</b>
						</div>
					</>
				)}

				{activeRole === "Student" && (
					<div className={styles.studentAccess}>
						<img className={styles.campus1Icon} alt="" src={campusImage} />
						<div>
							{loading && (
								<div className={styles.loadingOverlay}>
									<div className={styles.spinner}></div> {/* Loading spinner */}
								</div>
							)}
							{!loading && (
								<button
									className={styles.accessButton}
									onClick={onAccessContainerClick}
								>
									<div className={styles.accessChild} />
									<div className={styles.accessThroughYour}>
										Access Through Your Institution
									</div>
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SignUp;
