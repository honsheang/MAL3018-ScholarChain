import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortalPopup from "./PortalPopup";
import AddSemester from "./AddSemester";
import AddBadgePopup from "./AddBadgePopup"; // Import the new component
import styles from "./DashboardUniversity.module.css";
import RegisterStudentPopup from "./RegisterStudentPopup";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import for autoTable

import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const DashboardUniversity = () => {
	const [badges, setBadges] = useState([]); // Store all badges

	const [issuedBadges, setIssuedBadges] = useState([]); // Store issued badges
	const [isAddBadgeOpen, setIsAddBadgeOpen] = useState(false); // Control the popup
	const [isAddSemesterOpen, setAddSemesterOpen] = useState(false);
	const [isReceiptOpen, setReceiptOpen] = useState(false);
	const navigate = useNavigate();
	const [semesterCGPAs, setSemesterCGPAs] = useState({}); // Track CGPA for each semester
	const [isRegisterStudentOpen, setIsRegisterStudentOpen] = useState(false);
	const [logoPreview, setLogoPreview] = useState(null);
	const [fileName, setFileName] = useState("No file selected");
	const [isEditing, setIsEditing] = useState(false);

	const [universityName, setUniversityName] = useState("Loading...");

	const [universityId, setUniversityId] = useState(null);

	useEffect(() => {
		const fetchUniversity = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("❌ No token found. Redirecting to login...");
				navigate("/login");
				return;
			}

			try {
				const response = await fetch("http://localhost:5000/api/university", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Attach the token for authentication
					},
				});

				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message || "Failed to fetch university data");
				}

				// Set university details
				setUniversityId(data.universitySsoId);
				setUniversityName(data.universityName || "Unknown University");
				setSignatoryName(data.issuerName || "Unknown Signatory");
				setEmail(data.email || "Unknown Email");
			} catch (error) {
				console.error("❌ Error fetching university data:", error);
				setUniversityName("Unknown University");
				setSignatoryName("Unknown Signatory");
				setEmail("Unknown Email");
			}
		};

		fetchUniversity();
	}, [navigate]);

	useEffect(() => {
		if (!universityId) return; // Skip if universityId is not set

		const fetchTranscripts = async () => {
			try {
				const token = localStorage.getItem("token");
				console.log("🔑 Token:", token); // Log the token

				const response = await fetch("http://localhost:5000/api/transcripts", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json(); // Log the error response
					console.error("Error response:", errorData);
					throw new Error("Failed to fetch transcripts");
				}

				const data = await response.json();
				console.log("📜 Transcripts fetched:", data); // Log the fetched data
				setReportLog(data); // Update reportLog with fetched transcripts
			} catch (error) {
				console.error("Error fetching transcripts:", error);
				alert("Failed to fetch transcripts. Please try again.");
			}
		};

		fetchTranscripts();
	}, [universityId]); // Run only when universityId changes

	const handleRegisterStudent = async (studentData) => {
		try {
			// Send the student data to the backend
			const response = await fetch(
				"http://localhost:5000/api/register/student",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(studentData),
				},
			);

			const data = await response.json();

			if (response.ok) {
				alert("Student registered successfully!");
				setIsRegisterStudentOpen(false); // Close the popup
			} else {
				alert(`Registration failed: ${data.message}`);
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred. Please try again.");
		}
	};

	const [universityAddress, setUniversityAddress] = useState(
		"No.1, Education Boulevard Batu Kawan Industrial Park, 14110 Batu Kawan, Pulau Pinang",
	);
	const [mobileNo, setMobileNo] = useState("04-587 0000");
	const [email, setEmail] = useState("Loading...");
	const [signatoryName, setSignatoryName] = useState("Loading...");
	const [signatoryDepartment, setSignatoryDepartment] =
		useState("Bursary Department");

	const [selectedProgramme, setSelectedProgramme] = useState("");

	const [activeButton, setActiveButton] = useState("Issue");
	const [semesters, setSemesters] = useState([]);
	const [activeSemesterIndex, setActiveSemesterIndex] = useState(0);
	const [addedSemesters, setAddedSemesters] = useState([]); // Track which semesters have been added

	const [reportLog, setReportLog] = useState([]); // Store transcript data
	const [studentName, setStudentName] = useState("");
	const [studentID, setStudentID] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const programmes = [
		"BA (HONS) ACCOUNTING & FINANCE (ACCOUNTING)",
		"BA (HONS) IN ACCOUNTING AND FINANCIAL MANAGEMENT STUDIES (UK)",
		"BA (HONS) IN BUSINESS AND MANAGEMENT STUDIES 3+0",
		"BA (HONS) IN LOGISTICS MANAGEMENT",
		"BSC (HONS) BUSINESS MANAGEMENT",
		"BSC (HONS) COMPUTER SCIENCE (CYBER SECURITY)",
		"BSC (HONS) COMPUTER SCIENCE (SOFTWARE ENGINEERING)",
		"BSC (HONS) MARITIME BUSINESS (LOGISTICS)",
		"DIPLOMA IN BUSINESS STUDIES",
		"DIPLOMA IN COMPUTER SCIENCE",
		"DIPLOMA IN E-BUSINESS TECHNOLOGY",
		"DIPLOMA IN HOTEL MANAGEMENT",
		"DIPLOMA IN LOGISTICS MANAGEMENT",
		"DIPLOMA IN TRAVEL & TOURISM MANAGEMENT",
		"DIPLOMA OF ACCOUNTANCY",
		"FOUNDATION IN ARTS",
	];

	const handleProgrammeChange = (e) => {
		setSelectedProgramme(e.target.value);
	};
	const handleViewTranscript = (transcriptFile) => {
		if (transcriptFile instanceof Blob) {
			// Create a Blob URL for the PDF
			const pdfBlobUrl = URL.createObjectURL(transcriptFile);

			// Open the Blob URL in a new tab
			window.open(pdfBlobUrl, "_blank");

			// Revoke the Blob URL after opening the PDF
			URL.revokeObjectURL(pdfBlobUrl);
		} else {
			// If the transcriptFile is already a URL, open it directly
			window.open(transcriptFile, "_blank");
		}
	};

	const generateTranscriptPDF = () => {
		const doc = new jsPDF();

		// Add university logo
		const addLogo = () => {
			if (logoPreview) {
				doc.addImage(
					logoPreview,
					"PNG",
					150,
					10,
					40,
					40,
					undefined,
					"FAST",
					50,
				); // 50% opacity
			}
		};

		addLogo();

		doc.setFontSize(16);
		doc.text("University Details", 10, 20);
		doc.setFontSize(12);
		doc.text(`University Name: ${universityName}`, 10, 30);
		doc.text(`Address: ${universityAddress}`, 10, 40);
		doc.text(`Contact: ${mobileNo}`, 10, 50);
		doc.text(`Email: ${email}`, 10, 60);
		doc.text(`Authorized Signatory: ${signatoryName}`, 10, 70);
		doc.text(`Department: ${signatoryDepartment}`, 10, 80);

		// Add student details
		doc.setFontSize(16);
		doc.text("Student Details", 10, 100);
		doc.setFontSize(12);
		doc.text(`Student Name: ${studentName}`, 10, 110);
		doc.text(`Student ID: ${studentID}`, 10, 120);
		doc.text(`Programme: ${selectedProgramme}`, 10, 130);

		// Add academic details (semesters and courses)
		doc.setFontSize(16);
		doc.text("Academic Details", 10, 150);
		semesters.forEach((semester, index) => {
			doc.setFontSize(14);
			doc.text(`Semester ${semester.semester}`, 10, 160 + index * 80);

			// Prepare table data
			const tableData = semester.courses.map((course) => [
				course.code,
				course.course,
				course.creditHours,
				course.grade,
				course.description,
			]);

			// Add table using jsPDF autoTable
			autoTable(doc, {
				startY: 170 + index * 80,
				head: [["Code", "Course", "Credit Hours", "Grade", "Description"]],
				body: tableData,
			});

			// Add GPA and CGPA for the semester
			doc.setFontSize(12);
			doc.text(`GPA: ${semester.gpa}`, 10, doc.lastAutoTable.finalY + 10);
			doc.text(
				`CGPA (Up to Semester ${semester.semester}): ${
					semesterCGPAs[semester.semester] || "0.00"
				}`,
				10,
				doc.lastAutoTable.finalY + 20,
			);

			// Add a new page if necessary
			if (doc.lastAutoTable.finalY > 250) {
				doc.addPage();
				addLogo(); // Add logo to the new page
			}
		});

		// Add gamification badges
		doc.setFontSize(16);
		doc.text("Gamification Badges", 10, doc.lastAutoTable.finalY + 40);
		issuedBadges.forEach((badge, index) => {
			doc.setFontSize(12);
			doc.text(
				`${badge.title} - ${badge.description}`,
				10,
				doc.lastAutoTable.finalY + 50 + index * 10,
			);

			// Add badge image
			if (badge.icon) {
				doc.addImage(
					badge.icon,
					"PNG",
					50,
					doc.lastAutoTable.finalY + 50 + index * 10,
					20,
					20,
				);
			}

			// Add a new page if necessary
			if (doc.lastAutoTable.finalY > 250) {
				doc.addPage();
				addLogo(); // Add logo to the new page
			}
		});

		// Save the PDF as a blob
		const pdfBlob = doc.output("blob"); // Use "blob" if supported

		console.log("Generated PDF Blob:", pdfBlob);
		return pdfBlob;
	};

	const handleEditSaveClick = () => {
		if (isEditing) {
			// Save logic (if needed)
			console.log("Saved:", {
				universityName,
				universityAddress,
				mobileNo,
				email,
				signatoryName,
				signatoryDepartment,
			});
		}
		setIsEditing(!isEditing); // Toggle edit mode
	};

	const handleUploadAndSubmit = async () => {
		if (!studentName) {
			alert("Please enter the student name.");
			return;
		}

		if (!universityId) {
			alert("University ID is missing. Please log in again.");
			return;
		}

		// Generate the PDF
		const pdfBlob = generateTranscriptPDF(); // Generate the PDF blob
		const transactionID = `TXN-${Date.now()}`; // Generate a unique transaction ID
		const issueDate = new Date().toLocaleDateString(); // Get the current date

		// Create a FormData object to upload the PDF file
		const formData = new FormData();
		formData.append("transcriptFile", pdfBlob, `${studentID}_transcript.pdf`);

		try {
			console.log("Step 1: Uploading PDF file...");
			const uploadResponse = await fetch("http://localhost:5000/api/upload", {
				method: "POST",
				body: formData, // No need to set Content-Type for FormData
			});

			if (!uploadResponse.ok) {
				const errorText = await uploadResponse.text();
				console.error("Upload Error:", errorText);
				throw new Error("Failed to upload transcript file");
			}

			const uploadData = await uploadResponse.json();
			console.log("PDF uploaded successfully:", uploadData);

			const transcriptFileUrl = uploadData.fileUrl; // URL of the uploaded PDF file

			// Step 2: Save the transcript metadata to the database
			console.log("Step 2: Saving transcript metadata...");
			const transcriptData = {
				universityId, // Use the universitySsoId directly as universityId
				studentID: studentID || "UNKNOWN",
				studentName,
				transcriptFile: transcriptFileUrl, // URL of the uploaded PDF
				transactionID,
			};

			const saveResponse = await fetch("http://localhost:5000/api/transcripts/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(transcriptData),
			});

			console.log("📢 Sending request to:", "http://localhost:5000/api/transcripts/save");
console.log("📦 Request body:", transcriptData);

			

			if (!saveResponse.ok) {
				const saveData = await saveResponse.json();
				throw new Error(
					saveData.message || "Failed to save transcript metadata",
				);
			}

			const saveData = await saveResponse.json();
			console.log("Transcript metadata saved successfully:", saveData);

			// Step 3: Update the report log (optional, for frontend display)
			console.log("Step 3: Updating report log...");
			setReportLog((prev) => [
				...prev,
				{
					studentName,
					studentID,
					transcriptFile: transcriptFileUrl,
					transactionID,
					issueDate,
				},
			]);

			// Step 4: Open the receipt popup
			console.log("Step 4: Opening receipt popup...");
			setReceiptOpen(true);
		} catch (error) {
			console.error("Error occurred:", error);
			alert(`An error occurred: ${error.message}`);
		}
	};

	const handleAddBadge = (newBadge) => {
		setBadges((prev) => [...prev, newBadge]);
	};

	const handleAddSemester = () => {
		if (activeSemesterIndex === null) {
			alert("Please select a semester first.");
			return;
		}

		// Check if the semester has already been added
		if (addedSemesters.includes(activeSemesterIndex + 1)) {
			alert("This semester has already been added.");
			return;
		}

		// Add the semester to the list of added semesters
		setAddedSemesters((prev) => [...prev, activeSemesterIndex + 1]);

		// Initialize the semester data if it doesn't exist
		if (!semesters.some((sem) => sem.semester === activeSemesterIndex + 1)) {
			setSemesters((prev) => [
				...prev,
				{
					semester: activeSemesterIndex + 1,
					courses: [],
					gpa: "0.00",
					remark: "",
				},
			]);
		}
	};

	// Function to calculate GPA (Simple avg of grades, replace with actual logic)
	const calculateGPA = (courses) => {
		let totalPoints = 0;
		let totalCredits = 0;

		const gradePoints = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };

		courses.forEach((course) => {
			const grade = gradePoints[course.grade.toUpperCase()] || 0;
			const credit = parseFloat(course.creditHours);
			totalPoints += grade * credit;
			totalCredits += credit;
		});

		return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
	};

	// Function to determine Remarks
	const getRemarks = (gpa) => {
		if (gpa >= 3.7) return "Dean's List";
		if (gpa >= 3.0) return "Good";
		if (gpa >= 2.0) return "Satisfactory";
		return "Needs Improvement";
	};

	const addCourse = () => {
		if (semesters.length === 0) {
			alert("Please add a semester first.");
			return;
		}

		const newSemesters = [...semesters];
		newSemesters[activeSemesterIndex].courses.push({
			code: "",
			course: "",
			creditHours: "",
			grade: "",
			description: "",
		});
		setSemesters(newSemesters);
	};

	const handleSave = (semesterIndex) => {
		const semester = semesters[semesterIndex];
		if (semester.courses.length === 0) {
			alert("Please add at least one course before saving.");
			return;
		}

		const gpa = calculateGPA(semester.courses);
		const remark = getRemarks(gpa);

		// Update the semester with the calculated GPA and remark
		const newSemesters = [...semesters];
		newSemesters[semesterIndex] = {
			...semester,
			gpa,
			remark,
		};
		setSemesters(newSemesters);

		// Calculate CGPA for the current semester
		const cgpa = calculateCGPAUpTo(semesterIndex);

		// Update the semesterCGPAs state
		setSemesterCGPAs((prev) => ({
			...prev,
			[semester.semester]: cgpa,
		}));

		alert(`Semester ${semester.semester} data saved!\nCGPA: ${cgpa}`);
	};

	const calculateCGPAUpTo = (semesterIndex) => {
		const semestersUpTo = semesters.slice(0, semesterIndex + 1); // Get semesters up to the specified index
		if (semestersUpTo.length === 0) return "0.00"; // No semesters added

		const totalGPA = semestersUpTo.reduce((sum, semester) => {
			return sum + parseFloat(semester.gpa);
		}, 0);

		return (totalGPA / semestersUpTo.length).toFixed(2); // Average GPA up to the specified semester
	};

	const updateCourse = (semesterIndex, courseIndex, field, value) => {
		const newSemesters = [...semesters];
		newSemesters[semesterIndex].courses[courseIndex][field] = value;
		setSemesters(newSemesters);
	};

	const calculateCGPA = () => {
		if (semesters.length === 0) return "0.00"; // No semesters added

		const totalGPA = semesters.reduce((sum, semester) => {
			return sum + parseFloat(semester.gpa);
		}, 0);

		return (totalGPA / semesters.length).toFixed(2); // Average GPA
	};

	const handleButtonClick = (button) => {
		setActiveButton(button);
	};

	const closeAddSemester = () => {
		setAddSemesterOpen(false);
	};

	const onLogoutContainerClick = useCallback(() => {
		navigate("/");
	}, [navigate]);

	const onhomeContainerClick = useCallback(() => {
		navigate("/");
	}, [navigate]);

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFileName(file.name); // Dynamically set the uploaded file name
			const reader = new FileReader();
			reader.onload = (e) => setLogoPreview(e.target.result);
			reader.readAsDataURL(file);
		}
	};

	const handleCancelUpload = () => {
		setLogoPreview(null);
		setFileName("No file selected");
	};

	return (
		<>
			<div className={styles.dashboardUniversity}>
				<div className={styles.dashboardUniversityChild} />
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
				<div className={styles.secureAcademicTranscript}>
					"Secure Academic Transcript Validation with Blockchain"
				</div>
				<div className={styles.bottom}>
					<div className={styles.bottomChild} />
					<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
				</div>
				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />

				<div className={styles.feature}>
					<div className={styles.featureChild} />
					<div
						className={`${styles.featureItem} ${
							activeButton === "Issue" ? styles.blue : styles.grey
						}`}
						onClick={() => handleButtonClick("Issue")}
					>
						<div className={styles.issue}>Issue</div>
					</div>
					<div
						className={`${styles.featureInner} ${
							activeButton === "Report" ? styles.blue : styles.grey
						}`}
						onClick={() => handleButtonClick("Report")}
					>
						<div className={styles.report}>Report</div>
					</div>
				</div>

				<div
					className={styles.registerStudentButton}
					onClick={() => setIsRegisterStudentOpen(true)}
				>
					<b className={styles.registerStudentText}>Register Student</b>
				</div>

				{/* Content */}
				<div className={styles.content}>
					{activeButton === "Issue" && (
						<div className={styles.universityDetails}>
							<div className={styles.uniGrey} />
							<div className={styles.uniBlack} />
							<b className={styles.universityDetails1}>University Details</b>
							<div className={styles.universityName}>
								<div className={styles.address}>University Name</div>
								<input
									type="text"
									placeholder="Enter University Name"
									value={universityName}
									onChange={(e) => setUniversityName(e.target.value)}
									readOnly={!isEditing} // Read-only when not in edit mode
									className={styles.universityNameChild}
								/>
							</div>
							<div className={styles.universityAddress}>
								<div className={styles.address}>Address</div>
								<textarea
									placeholder="Enter University Address"
									value={universityAddress}
									onChange={(e) => setUniversityAddress(e.target.value)}
									readOnly={!isEditing} // Read-only when not in edit mode
									className={styles.universityAddressChild}
								/>
							</div>
							<div
								className={styles.submitButton}
								onClick={handleEditSaveClick}
							>
								<div className={styles.submitButtonChild} />
								<div className={styles.edit}>
									{isEditing ? "Save" : "Edit"}{" "}
									{/* Toggle between Edit and Save */}
								</div>
							</div>
							<div className={styles.universityLogo}>
								<div className={styles.address}>University Logo</div>
								<div className={styles.universityLogoChild}>
									{logoPreview && (
										<div className={styles.previewContainer}>
											<img
												src={logoPreview}
												alt="Logo Preview"
												className={styles.logoPreview}
											/>
											<button
												className={styles.cancelButton}
												onClick={handleCancelUpload}
											>
												✕
											</button>
										</div>
									)}
								</div>
								<div className={styles.uploadLabel}>
									<label className={styles.submitButton1}>
										<input
											type="file"
											accept="image/*"
											className={styles.fileInput}
											onChange={handleFileUpload}
										/>
										<div className={styles.upload}>Upload</div>
									</label>
								</div>
								<div className={styles.collegeLogo}>
									<div className={styles.collegeLogoChild}></div>
									<div className={styles.collegeLogopng}>{fileName}</div>
								</div>
							</div>
							<div className={styles.uniContact}>
								<div className={styles.contactInformation}>
									Contact Information
								</div>
								<input
									type="text"
									placeholder="Enter University Contact"
									value={mobileNo}
									onChange={(e) => setMobileNo(e.target.value)}
									readOnly={!isEditing} // Read-only when not in edit mode
									className={styles.uniContactChild}
								/>

								<input
									type="text"
									placeholder="Enter University Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									readOnly={!isEditing} // Read-only when not in edit mode
									className={styles.uniContactItem}
								/>

								<div className={styles.mobileLabel}>
									<div className={styles.mobileLabelChild} />
									<b className={styles.mobileNo}>Mobile No.</b>
								</div>
								<div className={styles.emailLabel}>
									<div className={styles.mobileLabelChild} />
									<b className={styles.email}>Email</b>
								</div>
							</div>
							<div className={styles.uniSign}>
								<div
									className={styles.authorizedSignatory}
								>{`Authorized Signatory `}</div>
								<input
									type="text"
									placeholder="Enter Signature"
									value={signatoryName}
									onChange={(e) => setSignatoryName(e.target.value)}
									readOnly={!isEditing} // Read-only when not in edit mode
									className={styles.uniSignChild}
								/>

								<input
									type="text"
									placeholder="Enter Signature Details"
									value={signatoryDepartment}
									onChange={(e) => setSignatoryDepartment(e.target.value)}
									readOnly={!isEditing} // Read-only when not in edit mode
									className={styles.uniSignItem}
								/>

								<div className={styles.nameLabel}>
									<div className={styles.mobileLabelChild} />
									<b className={styles.email}>Name</b>
								</div>
								<div className={styles.departmentLabel}>
									<div className={styles.mobileLabelChild} />
									<b className={styles.email}>Department</b>
								</div>
							</div>

							<div className={styles.gamification}>
								{/* Background elements */}
								<div className={styles.gamificationChild} />
								<div className={styles.gamificationItem} />

								{/* Gamification Badges Title */}
								<b className={styles.gamificationBadges}>Gamification Badges</b>

								{/* Add Badge Button */}
								<button
									onClick={() => setIsAddBadgeOpen(true)}
									className={styles.addBadgeButton}
								>
									+ Add Badge
								</button>

								{/* Badge Catalog */}
								<div className={styles.badgeCatalogContainer}>
									<h3>Badge Catalog</h3>
									<div className={styles.badgeCatalog}>
										{badges.map((badge, index) => (
											<div key={index} className={styles.badgeCard}>
												<img src={badge.icon} alt={badge.title} />
												<h4>{badge.title}</h4>
												<p>{badge.description}</p>
												<p>Category: {badge.category}</p>
												<button
													onClick={() =>
														setIssuedBadges((prev) => [...prev, badge])
													}
												>
													Issue Badge
												</button>
											</div>
										))}
									</div>
								</div>

								{/* Issued Badges */}
								<div className={styles.issuedBadgesContainer}>
									<h3>Issued Badges</h3>
									<div className={styles.issuedBadges}>
										{issuedBadges.map((badge, index) => (
											<div key={index} className={styles.badgeCard}>
												<img src={badge.icon} alt={badge.title} />
												<h4>{badge.title}</h4>
												<p>{badge.description}</p>
												<p>Category: {badge.category}</p>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Add Badge Popup */}
							{isAddBadgeOpen && (
								<PortalPopup
									overlayColor="rgba(113, 113, 113, 0.3)"
									placement="Centered"
									onOutsideClick={() => setIsAddBadgeOpen(false)}
								>
									<AddBadgePopup
										onClose={() => setIsAddBadgeOpen(false)}
										onAddBadge={handleAddBadge}
									/>
								</PortalPopup>
							)}

							<div className={styles.studentDetails}>
								<div className={styles.studentGrey} />
								<div className={styles.studentBlack} />
								<b className={styles.studentDetails1}>Student Details</b>

								<div className={styles.studentFullName}>
									<label className={styles.fullName} htmlFor="fullNameInput">
										Full Name
									</label>
									<input
										id="fullNameInput"
										type="text"
										className={styles.fullNameInput}
										placeholder="Enter full name"
										value={studentName}
										onChange={(e) => setStudentName(e.target.value)}
									/>
								</div>
								<div className={styles.studentId}>
									<div className={styles.fullName} htmlFor="studentIDInput">
										Student ID
									</div>
									<input
										id="studentIDInput"
										type="text"
										className={styles.fullNameInput}
										placeholder="Enter Student ID"
										value={studentID}
										onChange={(e) => setStudentID(e.target.value)}
									/>
								</div>
								<div className={styles.studentDob}>
									<label className={styles.dateOfBirth} htmlFor="dob">
										Date of Birth
									</label>
									<div className={styles.dropdownContainer}>
										<select id="dobYear" className={styles.dropdown}>
											<option value="">YYYY</option>
											{Array.from({ length: 100 }, (_, i) => {
												const year = new Date().getFullYear() - i;
												return (
													<option key={year} value={year}>
														{year}
													</option>
												);
											})}
										</select>
										<select id="dobMonth" className={styles.dropdown}>
											<option value="">MM</option>
											{Array.from({ length: 12 }, (_, i) => (
												<option key={i + 1} value={i + 1}>
													{String(i + 1).padStart(2, "0")}
												</option>
											))}
										</select>
										<select id="dobDay" className={styles.dropdown}>
											<option value="">DD</option>
											{Array.from({ length: 31 }, (_, i) => (
												<option key={i + 1} value={i + 1}>
													{String(i + 1).padStart(2, "0")}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className={styles.studentIntake}>
									<label className={styles.fullName} htmlFor="intake">
										Intake
									</label>
									<div className={styles.yearDropdown}>
										<select className={styles.dropdown}>
											<option value="">YYYY</option>
											{Array.from({ length: 100 }, (_, i) => {
												const year = new Date().getFullYear() - i;
												return (
													<option key={year} value={year}>
														{year}
													</option>
												);
											})}
										</select>
									</div>
									<div className={styles.monthDropdown}>
										<select className={styles.dropdown}>
											<option value="">Select the month</option>
											{[
												"January",
												"February",
												"March",
												"April",
												"May",
												"June",
												"July",
												"August",
												"September",
												"October",
												"November",
												"December",
											].map((month, index) => (
												<option key={index} value={month}>
													{month}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className={styles.programmeDropdown}>
									<label className={styles.fullName} htmlFor="programmeSelect">
										Programme
									</label>
									<select
										id="programmeSelect"
										value={selectedProgramme}
										onChange={handleProgrammeChange}
										className={styles.dropdownProgramme}
									>
										<option value="">Select the programme</option>
										{programmes.map((programme, index) => (
											<option key={index} value={programme}>
												{programme}
											</option>
										))}
									</select>
								</div>
							</div>

							<div className={styles.academicDetails}>
								<div className={styles.academicDetailsChild} />
								<div className={styles.academicDetailsItem}>
									<b className={styles.academicDetails1}>Academic Details</b>

									{/* Semester Selector */}
									<div className={styles.semesterSelector}>
										<label htmlFor="semesterSelect">Select Semester: </label>
										<select
											id="semesterSelect"
											value={
												activeSemesterIndex === null
													? ""
													: activeSemesterIndex + 1
											}
											onChange={(e) =>
												setActiveSemesterIndex(Number(e.target.value) - 1)
											}
										>
											<option value="">Select a semester</option>
											{Array.from({ length: 9 }, (_, i) => (
												<option key={i + 1} value={i + 1}>
													Semester {i + 1}
												</option>
											))}
										</select>
										<button onClick={handleAddSemester}>Add Semester</button>
									</div>

									{/* Render tables for added semesters */}
									{addedSemesters.map((semesterNumber) => {
										const semester = semesters.find(
											(sem) => sem.semester === semesterNumber,
										);
										return (
											<div
												key={semesterNumber}
												className={styles.semesterTableContainer}
											>
												<h3>Semester {semesterNumber}</h3>
												<table className={styles.semesterTable}>
													<thead>
														<tr>
															<th>Code</th>
															<th>Course</th>
															<th>Credit Hours</th>
															<th>Grade</th>
															<th>Description</th>
														</tr>
													</thead>
													<tbody>
														{semester.courses.map((course, courseIndex) => (
															<tr key={courseIndex}>
																<td>
																	<input
																		type="text"
																		value={course.code}
																		onChange={(e) =>
																			updateCourse(
																				semesterNumber - 1,
																				courseIndex,
																				"code",
																				e.target.value,
																			)
																		}
																	/>
																</td>
																<td>
																	<input
																		type="text"
																		value={course.course}
																		onChange={(e) =>
																			updateCourse(
																				semesterNumber - 1,
																				courseIndex,
																				"course",
																				e.target.value,
																			)
																		}
																	/>
																</td>
																<td>
																	<input
																		type="number"
																		value={course.creditHours}
																		onChange={(e) =>
																			updateCourse(
																				semesterNumber - 1,
																				courseIndex,
																				"creditHours",
																				e.target.value,
																			)
																		}
																	/>
																</td>
																<td>
																	<input
																		type="text"
																		value={course.grade}
																		onChange={(e) =>
																			updateCourse(
																				semesterNumber - 1,
																				courseIndex,
																				"grade",
																				e.target.value,
																			)
																		}
																	/>
																</td>
																<td>
																	<input
																		type="text"
																		value={course.description}
																		onChange={(e) =>
																			updateCourse(
																				semesterNumber - 1,
																				courseIndex,
																				"description",
																				e.target.value,
																			)
																		}
																	/>
																</td>
															</tr>
														))}
													</tbody>
												</table>
												<button onClick={() => addCourse(semesterNumber - 1)}>
													Add Course
												</button>
												<button onClick={() => handleSave(semesterNumber - 1)}>
													Save
												</button>
												{semester.gpa !== "0.00" && (
													<div className={styles.gpaRemarksContainer}>
														<div className={styles.gpaCgpa}>
															<p>GPA: {semester.gpa}</p>
															<p>
																CGPA (Up to Semester {semesterNumber}):{" "}
																{semesterCGPAs[semesterNumber] || "0.00"}
															</p>
														</div>
														<div className={styles.remarks}>
															<p>Remark: {semester.remark}</p>
														</div>
													</div>
												)}
											</div>
										);
									})}

									{/* Display Cumulative CGPA */}
									{semesters.length > 0 && (
										<div className={styles.cumulativeCgpaContainer}>
											<h3>Cumulative CGPA: {calculateCGPA()}</h3>
										</div>
									)}
								</div>
							</div>

							<div
								className={styles.submitButton2}
								onClick={handleUploadAndSubmit}
							>
								<div className={styles.submitButtonInner} />
								<b className={styles.uploadAndSubmit}>Upload and Submit</b>
							</div>
						</div>
					)}
					{activeButton === "Report" && (
						<div className={styles.reportLog}>
							{/* Search Bar */}
							<div className={styles.searchBar}>
								<input
									type="text"
									placeholder="Search by Student Name, ID, or Transaction ID"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className={styles.searchInput}
								/>
								<button className={styles.searchButton}>Search</button>
							</div>

							{/* Table for Report Log */}
							<table className={styles.reportTable}>
								<thead>
									<tr>
										<th>Student ID</th>
										<th>Name</th>
										<th>Transcript</th>
										<th>Transaction ID</th>
										<th>Issue Date</th>
									</tr>
								</thead>
								<tbody>
									{reportLog
										.filter(
											(log) =>
												log.studentName
													.toLowerCase()
													.includes(searchQuery.toLowerCase()) ||
												log.studentID
													.toLowerCase()
													.includes(searchQuery.toLowerCase()) ||
												log.transactionID
													.toLowerCase()
													.includes(searchQuery.toLowerCase()),
										)
										.map((log, index) => (
											<tr key={index}>
												<td>{log.studentID}</td>
												<td>{log.studentName}</td>
												<td>
													<button
														onClick={() =>
															handleViewTranscript(log.transcriptFile)
														}
													>
														View Transcript
													</button>
												</td>
												<td>{log.transactionID}</td>
												<td>{new Date(log.issueDate).toLocaleDateString()}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					)}
				</div>

				<div className={styles.welcome}>
					<b className={styles.welcome1}>Welcome,</b>
					<b className={styles.peninsulaCollegeGeorgetown}>{universityName}</b>
				</div>

				<div className={styles.logoutButton} onClick={onLogoutContainerClick}>
					<b className={styles.logout}>Log Out</b>
				</div>
			</div>

			{isAddSemesterOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={closeAddSemester}
				>
					<AddSemester onClose={closeAddSemester} />
				</PortalPopup>
			)}
			{isReceiptOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={() => setReceiptOpen(false)}
				>
					<div className={styles.receiptPopup}>
						<h3>Receipt</h3>
						<div className={styles.receiptDetails}>
							<p>
								<strong>Student Name:</strong>{" "}
								{reportLog[reportLog.length - 1]?.studentName}
							</p>
							<p>
								<strong>Student ID:</strong>{" "}
								{reportLog[reportLog.length - 1]?.studentID}
							</p>
							<p>
								<strong>Transcript ID:</strong>{" "}
								{reportLog[reportLog.length - 1]?.transactionID}
							</p>
							<p>
								<strong>Issue Date:</strong>{" "}
								{reportLog[reportLog.length - 1]?.issueDate}
							</p>
						</div>
						<button onClick={() => setReceiptOpen(false)}>Close</button>
					</div>
				</PortalPopup>
			)}

			{isRegisterStudentOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={() => setIsRegisterStudentOpen(false)}
				>
					<RegisterStudentPopup
						onClose={() => setIsRegisterStudentOpen(false)}
						onRegister={handleRegisterStudent}
					/>
				</PortalPopup>
			)}
		</>
	);
};

export default DashboardUniversity;
