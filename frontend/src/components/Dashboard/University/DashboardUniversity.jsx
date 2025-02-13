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
	const [selectedButton, setSelectedButton] = useState("Issue");

	const handleButtonClick = (button) => {
		setSelectedButton(button); // Set the selected button
	};

	const openAddBadges = useCallback(() => {
		setAddBadgesOpen(true);
	}, []);

	const closeAddBadges = useCallback(() => {
		setAddBadgesOpen(false);
	}, []);

	const openAddSemester = useCallback(() => {
		setAddSemesterOpen(true);
	}, []);

	const closeAddSemester = useCallback(() => {
		setAddSemesterOpen(false);
	}, []);

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
					<div className={styles.featureItem} />
					<div className={styles.featureInner} />
					{/* Issue Button */}
					<div
						className={`${styles.featureItem} ${
							selectedButton === "Issue" ? styles.blue : styles.grey
						}`}
						onClick={() => handleButtonClick("Issue")}
					>
						<div className={styles.issue}>Issue</div>
					</div>

					{/* Report Button */}
					<div
						className={`${styles.featureInner} ${
							selectedButton === "Report" ? styles.blue : styles.grey
						}`}
						onClick={() => handleButtonClick("Report")}
					>
						<div className={styles.report}>Report</div>
					</div>
				</div>

				{/* Content */}
				<div className={styles.content}>
					{selectedButton === "Issue" && (
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
								<div className={styles.universityLogoChild} />
								<div className={styles.uploadLabel}>
									<div className={styles.submitButton1}>
										<div className={styles.submitButtonItem} />
										<div className={styles.upload}>upload</div>
									</div>
								</div>
								<div className={styles.collegeLogo}>
									<div className={styles.collegeLogoChild} />
									<img
										className={styles.xButtonIcon}
										alt=""
										src="x button.png"
									/>
									<div className={styles.collegeLogopng}>college logo.png</div>
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
								<div className={styles.academicDetailsItem} />
								<b className={styles.academicDetails1}>Academic Details</b>
								<div className={styles.addSmester1} onClick={openAddSemester}>
									<div className={styles.addSmesterChild} />
									<div className={styles.addSmesterItem} />
									<div className={styles.addBadges}>+ Add Semester</div>
								</div>

								<div className={styles.semester1}>
									<div className={styles.semester1Child} />
									<div className={styles.semester1Item} />
									<div className={styles.semester1Inner} />
									<div className={styles.lineDiv} />
									<div className={styles.semester1Child1} />
									<div className={styles.semester1Child2} />
									<div className={styles.semester1Child3} />
									<div className={styles.semester1Child4} />
									<div className={styles.semester1Child5} />

									<div className={styles.label}>
										<div className={styles.code}>Code</div>
										<div className={styles.creditHours}>Credit Hours</div>
										<div className={styles.grade}>Grade</div>
										<div className={styles.description}>Description</div>
										<div className={styles.course}>Course</div>
									</div>
									<div className={styles.semester1Child6} />
									<div className={styles.semester1Child7} />
									<div className={styles.semester1Child8} />
									<div className={styles.semester1Child9} />
									<div className={styles.semester1Child10} />
									<b className={styles.semester11}>Semester 1</b>
								</div>
								<div className={styles.gpa}>
									<b className={styles.gpa1}>{`GPA: `}</b>
									<div className={styles.gpaChild} />
									<b className={styles.b1}></b>
								</div>
								<div className={styles.cgpa}>
									<b className={styles.cgpa1}>{`CGPA: `}</b>
									<div className={styles.cgpaChild} />
									<b className={styles.b2}></b>
								</div>
								<div className={styles.remark}>
									<b className={styles.remark1}>Remark:</b>
									<div className={styles.remarkChild} />
									<b className={styles.deansList}></b>
								</div>
							</div>
							<div className={styles.submitButton2} onClick={openReceipt}>
								<div className={styles.submitButtonInner} />
								<b className={styles.uploadAndSubmit}>Upload and Submit</b>
							</div>
						</div>
					)}
					{selectedButton === "Report" && (
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
