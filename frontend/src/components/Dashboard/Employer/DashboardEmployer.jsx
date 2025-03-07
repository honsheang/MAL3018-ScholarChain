import { useState, useEffect, useCallback } from "react";
import Verify from "../Employer/Verify";
import { useNavigate } from "react-router-dom";
import PortalPopup from "../Employer/PortalPopup";
import styles from "./DashboardEmployer.module.css";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";

const DashboardEmployer = () => {
	const [isVerifyOpen, setVerifyOpen] = useState(false);
	const [enterpriseName, setEnterpriseName] = useState("Loading...");

	const navigate = useNavigate();
	
	useEffect(() => {
		console.log("🚀 UI Updated! Enterprise Name:", enterpriseName);
	}, [enterpriseName]);

	// Fetch employer data
	useEffect(() => {
		const fetchEmployer = async () => {
			const token = localStorage.getItem("token"); 
			console.log("🔹 Retrieved Token:", token);
	
			if (!token) {
				console.error("❌ No token found. Redirecting to login...");
				navigate("/login");
				return;
			}
	
			try {
				const response = await fetch("http://localhost:5000/api/employer", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`,
					},
				});
	
				console.log("🔹 Response Status:", response.status);
				const data = await response.json();
				console.log("🔹 API Response Data:", data); // Debugging
	
				if (!response.ok) {
					throw new Error("Failed to fetch employer data");
				}
	
				if (data.enterpriseName) {
					console.log("✅ Enterprise Name Found:", data.enterpriseName);
					setEnterpriseName(data.enterpriseName);
				} else {
					console.warn("⚠️ Enterprise Name Not Found in Response:", data);
					setEnterpriseName("Unknown Enterprise");
				}
			} catch (error) {
				console.error("❌ Error fetching employer data:", error);
				setEnterpriseName("Unknown Enterprise");
			}
		};
	
		fetchEmployer();
	}, [navigate]);
	
	const onLogoutContainerClick = useCallback(() => {
		navigate("/");
	  }, [navigate]);
	

	const openVerify = useCallback(() => {
		setVerifyOpen(true);
	}, []);

	const closeVerify = useCallback(() => {
		setVerifyOpen(false);
	}, []);

	const onhomeContainerClick = useCallback(() => {
		navigate("/");
	}, [navigate]);

	

	return (
		<>
			<div className={styles.dashboardEmployer}>
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

				<div className={styles.logoutButton} onClick={onLogoutContainerClick}>
									<b className={styles.logout}>Log Out</b>
								</div>

				<div className={styles.btm}>
					<div className={styles.btmChild} />
					<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
				</div>
				<div className={styles.logo}>
					<div className={styles.secureAcademicTranscript}>
						"Secure Academic Transcript Validation with Blockchain"
					</div>
					<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
				</div>
				<div className={styles.welcome}>
					<b className={styles.welcome1}>Welcome</b>
					<b className={styles.pktLogisticsGroup}>{enterpriseName}</b>
				</div>
				<div className={styles.verifier}>
					<b className={styles.scholarchainTranscriptVerifi}>
						ScholarChain Transcript Verifier
					</b>
					<div className={styles.grey} />
					<div className={styles.input}>
						<div className={styles.certificationurl}>
							<div className={styles.certificationurlChild} />
							<input
								type="text"
								className={styles.certificationUrlInput}
								placeholder="Enter Certification URL"
							/>
						</div>

						<div className={styles.verifyButton} onClick={openVerify}>
							<div className={styles.verifyButtonChild} />
							<b className={styles.verify}>Verify</b>
						</div>
					</div>
				</div>
				
			</div>
			{isVerifyOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={closeVerify}
				>
					<Verify onClose={closeVerify} />
				</PortalPopup>
			)}
		</>
	);
};

export default DashboardEmployer;
