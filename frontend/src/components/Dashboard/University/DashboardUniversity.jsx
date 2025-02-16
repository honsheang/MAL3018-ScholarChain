import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AddBadges from "./AddBadges";
import PortalPopup from "./PortalPopup";
import AddSemester from "./AddSemester";
import Receipt from "./Receipt";
import styles from "./DashboardUniversity.module.css";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";

const DashboardUniversity = () => {
	const [isAddBadgesOpen, setAddBadgesOpen] = useState(false);
	const [isAddSemesterOpen, setAddSemesterOpen] = useState(false);
	const [isReceiptOpen, setReceiptOpen] = useState(false);
	const navigate = useNavigate();
	const [semesterCGPAs, setSemesterCGPAs] = useState({}); // Track CGPA for each semester

	const [logoPreview, setLogoPreview] = useState(null);
	const [fileName, setFileName] = useState("No file selected");
	const [activeButton, setActiveButton] = useState("Issue");
	const [semesters, setSemesters] = useState([]);
	const [activeSemesterIndex, setActiveSemesterIndex] = useState(0);
	const [addedSemesters, setAddedSemesters] = useState([]); // Track which semesters have been added

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

	// Function to add semester data
	const onAddSemester = (newSemester) => {
		console.log("Adding Semester:", newSemester); // Debugging
		const gpa = calculateGPA(newSemester.courses); // Calculate GPA when adding semester
		setSemesters((prevSemesters) => [
			...prevSemesters,
			{ ...newSemester, gpa, remark: getRemarks(gpa) },
		]);
		setAddSemesterOpen(false); // Close modal after adding
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

	const calGPA = (courses) => {
		if (courses.length === 0) return 0;
		const gradePoints = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };
		const totalPoints = courses.reduce(
			(sum, course) =>
				sum +
				(gradePoints[course.grade.toUpperCase()] || 0) *
					parseFloat(course.creditHours),
			0,
		);
		const totalCredits = courses.reduce(
			(sum, course) => sum + parseFloat(course.creditHours),
			0,
		);
		return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
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

	const openAddBadges = useCallback(() => {
		setAddBadgesOpen(true);
	}, []);

	const closeAddBadges = useCallback(() => {
		setAddBadgesOpen(false);
	}, []);

	const closeAddSemester = () => {
		setAddSemesterOpen(false);
	};

	const openReceipt = useCallback(() => {
		setReceiptOpen(true);
	}, []);

	const closeReceipt = useCallback(() => {
		setReceiptOpen(false);
	}, []);

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
									className={styles.universityNameChild}
								/>
							</div>
							<div className={styles.universityAddress}>
								<div className={styles.address}>Address</div>
								<textarea
									placeholder="Enter University Address"
									className={styles.universityAddressChild}
								/>
							</div>
							<div className={styles.submitButton}>
								<div className={styles.submitButtonChild} />
								<div className={styles.edit}>Edit</div>
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
									className={styles.uniContactChild}
								/>

								<input
									type="text"
									placeholder="Enter Contact Information"
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
									className={styles.uniSignChild}
								/>

								<input
									type="text"
									placeholder="Enter Signature Details"
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
								<div className={styles.gamificationChild} />
								<div className={styles.gamificationItem} />
								<b className={styles.gamificationBadges}>Gamification Badges</b>
								<div className={styles.addSmester} onClick={openAddBadges}>
									<div className={styles.addSmesterChild} />
									<div className={styles.addSmesterItem} />
									<div className={styles.addBadges}>+ Add Badges</div>
								</div>
							</div>

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
									/>
								</div>
								<div className={styles.studentId}>
									<div className={styles.fullName} htmlFor="studentIDInput">
										Student ID
									</div>
									<input
										id="fullNameInput"
										type="text"
										className={styles.fullNameInput}
										placeholder="Enter Student ID"
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
									<img
										className={styles.dropdownIcon1}
										alt=""
										src="dropdown.svg"
									/>
									<div className={styles.studentProgramme}>
										<div className={styles.fullName}>Programme</div>
										<div className={styles.studentFullNameChild} />
										<div className={styles.selectTheProgramme}>
											Select the programme
										</div>
									</div>
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

							<div className={styles.submitButton2} onClick={openReceipt}>
								<div className={styles.submitButtonInner} />
								<b className={styles.uploadAndSubmit}>Upload and Submit</b>
							</div>
						</div>
					)}
					{activeButton === "Report" && (
						<div className={styles.reportLog}>
							<div className={styles.reportLogChild} />
							<div className={styles.reportLogItem} />
							<div className={styles.reportLogInner} />
							<div className={styles.studentIdRep}>Student ID</div>
							<div className={styles.name}>Name</div>
							<div className={styles.transcript}>Transcript</div>
							<div className={styles.transactionId}>Transaction ID</div>
							<div className={styles.lineDivRep} />
							<div className={styles.reportLogChild1} />
							<div className={styles.reportLogChild2} />
							<div className={styles.reportLogChild3} />
							<div className={styles.limHonSheang}>Lim Hon Sheang</div>
							<div className={styles.dics21011144}>DICS21011144</div>
							<div className={styles.transcriptpdf}>transcript.pdf</div>
							<div className={styles.makjsfna68sfha7sv6ahev8a7sdhvb}>
								makjsfna68sfha7sv6ahev8a7sdhvbna87s6dhfba67sgd8f987ans9f7
							</div>
							<div className={styles.searchBar}>
								<div className={styles.background} />
								<div className={styles.inputField} />
								<div className={styles.searchButton}>
									<div className={styles.searchButtonChild} />
									<div className={styles.search}>Search</div>
								</div>
							</div>
							);
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

			{isAddBadgesOpen && (
				<PortalPopup
					overlayColor="rgba(113, 113, 113, 0.3)"
					placement="Centered"
					onOutsideClick={closeAddBadges}
				>
					<AddBadges onClose={closeAddBadges} />
				</PortalPopup>
			)}
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
					onOutsideClick={closeReceipt}
				>
					<Receipt onClose={closeReceipt} />
				</PortalPopup>
			)}
		</>
	);
};

export default DashboardUniversity;
