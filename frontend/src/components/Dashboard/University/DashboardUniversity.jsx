import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PortalPopup from "./PortalPopup";
import AddSemester from "./AddSemester";
import AddBadgePopup from "./AddBadgePopup"; // Import the new component

import styles from "./DashboardUniversity.module.css";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";

const DashboardUniversity = () => {
	const [badges, setBadges] = useState([]); // Store all badges
	const [issuedBadges, setIssuedBadges] = useState([]); // Store issued badges
	const [isAddBadgeOpen, setIsAddBadgeOpen] = useState(false); // Control the popup
	const [isAddSemesterOpen, setAddSemesterOpen] = useState(false);
	const [isReceiptOpen, setReceiptOpen] = useState(false);
	const navigate = useNavigate();
	const [semesterCGPAs, setSemesterCGPAs] = useState({}); // Track CGPA for each semester

	const [logoPreview, setLogoPreview] = useState(null);
	const [fileName, setFileName] = useState("No file selected");
	const [isEditing, setIsEditing] = useState(false);
	const [universityName, setUniversityName] = useState(
		"Peninsula College Georgetown"
	  );
	  const [universityAddress, setUniversityAddress] = useState(
		"No.1, Education Boulevard Batu Kawan Industrial Park, 14110 Batu Kawan, Pulau Pinang"
	  );
	  const [mobileNo, setMobileNo] = useState("04-587 0000");
	  const [email, setEmail] = useState("theshipcampus@peninsulamalaysia.edu.my");
	  const [signatoryName, setSignatoryName] = useState("Nafisah Misriya");
	  const [signatoryDepartment, setSignatoryDepartment] = useState(
		"Bursary Department"
	  );
	
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

	const handleUploadAndSubmit = () => {
		if (!studentName || !studentID) {
			alert("Please enter the student name and student ID.");
			return;
		}

		const transcriptFile = "transcript.pdf"; // Replace with actual file upload logic
		const transactionID = `TXN-${Date.now()}`; // Generate a placeholder transcript ID
		const issueDate = new Date().toLocaleDateString(); // Get the current date

		// Save the transcript data to the report log
		setReportLog((prev) => [
			...prev,
			{
				studentName,
				studentID,
				transcriptFile,
				transactionID,
				issueDate,
			},
		]);

		// Open the receipt popup
		setReceiptOpen(true);
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
							<div className={styles.submitButton} onClick={handleEditSaveClick}>
        <div className={styles.submitButtonChild} />
        <div className={styles.edit}>
          {isEditing ? "Save" : "Edit"} {/* Toggle between Edit and Save */}
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
													<a
														href={log.transcriptFile}
														target="_blank"
														rel="noopener noreferrer"
													>
														View Transcript
													</a>
												</td>
												<td>{log.transactionID}</td>
												<td>{log.issueDate}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					)}
				</div>

				<div className={styles.welcome}>
					<b className={styles.welcome1}>Welcome,</b>
					<b className={styles.peninsulaCollegeGeorgetown}>
						Peninsula College Georgetown
					</b>
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
		</>
	);
};

export default DashboardUniversity;
