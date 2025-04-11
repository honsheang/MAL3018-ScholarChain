import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeOption, setActiveOption] = useState(null);
	const [loading, setLoading] = useState(false);

	const onhomeContainerClick = useCallback(() => {
		navigate("/");
	}, [navigate]);

	const onloginContainerClick = useCallback(() => {
		if (location.pathname === "/login") {
			alert("You're already here!!!");
		} else {
			navigate("/login");
		}
	}, [navigate, location]);

	const onregisterContainerClick = useCallback(() => {
		navigate("/register");
	}, [navigate]);

	const handleSubmit = useCallback(async () => {
		const email = document.getElementById("emailInput")?.value.trim();
		const password = document.getElementById("passwordInput")?.value.trim();

		if (!email || !password) {
			alert("Please fill in both email and password.");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("http://localhost:5000/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ role: activeOption, email, password }),
			});

			const data = await response.json();
			console.log("Login Response Data:", data);

			if (response.ok && data.token) {
				localStorage.setItem("token", data.token); // ✅ Store token correctly
				console.log("✅ Token stored:", localStorage.getItem("token")); // Debugging

				alert("Login successful!");
				navigate(
					activeOption === "University" ? "/uniDashboard" : "/empDashboard",
				);
			} else {
				alert(`Login failed: ${data.message}`);
			}
		} catch (error) {
			console.error("❌ Error during login:", error);
			alert("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	}, [activeOption, navigate]);

	const onAccessContainerClick = useCallback(() => {
		alert("Redirecting to institutional access...");
		setLoading(true); // Show spinner
		setTimeout(() => {
			setLoading(false); // Hide spinner
			navigate("/fakeInstitutionLlogin"); // Navigate after delay
		}, 2000); // 2-second delay
	}, [navigate]);

	return (
		<div className={styles.login}>
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
				<div className={styles.homeButton} onClick={onhomeContainerClick}>
					<b className={styles.about}>Home</b>
				</div>
			</div>
			<div className={styles.btmLogo}>
				<div className={styles.btmLogoChild} />
				<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
			</div>
			<div className={styles.logo}>
				<div className={styles.secureAcademicTranscript}>
					"Secure Academic Transcript Validation with Blockchain"
				</div>
				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
			</div>
			<div className={styles.registerButton} onClick={onregisterContainerClick}>
				<b className={styles.register}>Register</b>
			</div>

			<div className={styles.loginLabel}>
				<div className={styles.loginLabelChild} />
				<b className={styles.login2}>Login</b>
			</div>
			<div
				className={styles.loginButton}
				onClick={onloginContainerClick}
				style={{ cursor: "pointer" }}
			>
				<b className={styles.login1}>Login</b>
			</div>
			<div className={styles.loginDetail}>
				<div className={styles.blue} />
				<div className={styles.white} />
				{activeOption === "Student" && (
					<div>
						{loading && (
							<div className={styles.loadingOverlay}>
								<div className={styles.spinner}></div>{" "}
								{/* Custom or CSS-based spinner */}
							</div>
						)}
						{!loading && (
							<div className={styles.access} onClick={onAccessContainerClick}>
								<div className={styles.accessChild} />
								<div className={styles.accessThroughYour}>
									Access Through Your Institution
								</div>
							</div>
						)}
					</div>
				)}
				{activeOption !== "Student" && (
					<div>
						<div className={styles.email}>
							<label className={styles.loginAs} htmlFor="emailInput">
								Email
							</label>
							<input
								id="emailInput"
								type="text"
								className={styles.textInput}
								placeholder="Enter your email"
							/>
						</div>
						<div className={styles.password}>
							<label className={styles.loginAs} htmlFor="passwordInput">
								Password
							</label>
							<input
								id="passwordInput"
								type="password"
								className={styles.textInput}
								placeholder="Enter your password"
							/>
						</div>
						<div className={styles.submitButton} onClick={handleSubmit}>
							<div className={styles.submitButtonChild} />
							<b className={styles.submit}>Submit</b>
						</div>
					</div>
				)}
				<div className={styles.loginOption}>
					<div className={styles.loginAs}>Login as</div>
					<div
						className={`${styles.studentOption} ${
							activeOption === "Student" ? styles.activeOption : ""
						}`}
						onClick={() => setActiveOption("Student")}
					>
						<div
							className={`${styles.studentOptionChild} ${
								activeOption === "Student" ? styles.activeChild : ""
							}`}
						/>
						<div
							className={`${styles.student} ${
								activeOption === "Student" ? styles.activeText : ""
							}`}
						>
							Student
						</div>
					</div>
					<div
						className={`${styles.universityOption} ${
							activeOption === "University" ? styles.activeOption : ""
						}`}
						onClick={() => setActiveOption("University")}
					>
						<div
							className={`${styles.studentOptionChild} ${
								activeOption === "University" ? styles.activeChild : ""
							}`}
						/>
						<div
							className={`${styles.student} ${
								activeOption === "University" ? styles.activeText : ""
							}`}
						>
							University
						</div>
					</div>
					<div
						className={`${styles.employerOption} ${
							activeOption === "Employer" ? styles.activeOption : ""
						}`}
						onClick={() => setActiveOption("Employer")}
					>
						<div
							className={`${styles.studentOptionChild} ${
								activeOption === "Employer" ? styles.activeChild : ""
							}`}
						/>
						<div
							className={`${styles.student} ${
								activeOption === "Employer" ? styles.activeText : ""
							}`}
						>
							Employer
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
