import React, { useCallback, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './SIgnUp.module.css';
import logoImage from '/ScholarChain/frontend/src/components/Image/ScholarChain.png';
import btmImage from '/ScholarChain/frontend/src/components/Image/blackscholarchain.png';
import campusImage from '/ScholarChain/frontend/src/components/Image/campus.png';

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeRole, setActiveRole] = useState("University"); // Default to "University"

    const onRegisterButtonContainerClick = useCallback(() => {
        if (location.pathname === '/register') {
            alert("You're already here!!!");
        } else {
            navigate('/register');
        }
    }, [navigate, location]);

    const onHomeButtonContainerClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const onLoginButtonContainerClick = useCallback(() => {
        navigate('/login');
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
            <div className={styles.registerButton} onClick={onRegisterButtonContainerClick}>
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
                <div className={styles.secureAcademicTranscript}>"Secure Academic Transcript Validation with Blockchain"</div>
                <img className={styles.scholarchain2Icon} alt="" src={logoImage} />
            </div>

            
            
            <div className={styles.signUpDetail}>
                <div className={`${styles.blue} ${activeRole === "Student" ? styles.blueStudent : ""}`} />
                <div className={`${styles.white} ${activeRole === "Student" ? styles.whiteStudent : ""}`} />
                
                <div
                    className={`${styles.universityButton} ${
                        activeRole === "University" ? styles.activeButton : styles.inactiveButton
                    }`}
                    onClick={() => handleRoleSelection("University")}
                >
                    <div className={styles.universityButtonChild} />
                    <b className={styles.university}>University</b>
                </div>
                <div
                    className={`${styles.employerButton} ${
                        activeRole === "Employer" ? styles.activeButton : styles.inactiveButton
                    }`}
                    onClick={() => handleRoleSelection("Employer")}
                >
                    <div className={styles.employerButtonChild} />
                    <b className={styles.university}>Employer</b>
                </div>
                <div
                    className={`${styles.studentButton} ${
                        activeRole === "Student" ? styles.activeButton : styles.inactiveButton
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
                            <label className={styles.universitySsoId} htmlFor="issuerName">Issuer Name</label>
                            <input 
                                id="issuerName"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the Issuer Name"
                            />
                        </div>

                        <div className={styles.uniSso}>
                            <label className={styles.universitySsoId} htmlFor="uniSso">University SSO ID</label>
                            <input 
                                id="uniSso"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the University SSO ID"
                            />
                        </div>
                        <div className={styles.email}>
                            <label className={styles.universitySsoId} htmlFor="uniEmail">Email</label>
                            <input 
                                id="uniEmail"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the valid email"
                            />
                        </div>
                        <div className={styles.domain}>
                            <label className={styles.universitySsoId} htmlFor="uniDomain">Domain Name</label>
                            <input 
                                id="uniDomain"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the valid domain"
                            />
                        </div>
                        <div className={styles.password}>
                        <label className={styles.universitySsoId} htmlFor="uniPassword">Set Password</label>
                            <input 
                                id="uniPassword"
                                type="text"
                                className={styles.textInput}
                                placeholder="Set password"
                            />
                        </div>
                        <div className={styles.confirmPass}>
                        <label className={styles.universitySsoId} htmlFor="uniConfirmPassword">Comfirm-Password</label>
                            <input 
                                id="uniConfirmPassword"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter again"
                            />
                        </div>
                    </>
                )}

                {activeRole === "Employer" && (
                    <>
                        <div className={styles.issuerName}>
                        <label className={styles.universitySsoId} htmlFor="enterpriseName">Enterprise Name</label>
                            <input 
                                id="enterpriseName"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the Enterprise Name"
                            />
                        </div>
                        <div className={styles.uniSso}>
                        <label className={styles.universitySsoId} htmlFor="enterpriseSso">SSO ID</label>
                            <input 
                                id="enterpriseSso"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the Enterprise SSO ID"
                            />
                        </div>
                        <div className={styles.email}>
                        <label className={styles.universitySsoId} htmlFor="enterpriseEmail">Admin Email</label>
                            <input 
                                id="enterpriseEmail"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the Admin Email"
                            />
                        </div>
                        <div className={styles.domain}>
                        <label className={styles.universitySsoId} htmlFor="enterpriseDomain">Domain Name</label>
                            <input 
                                id="enterpriseDomain"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter the Enterprise Domain"
                            />
                        </div>
                        <div className={styles.password}>
                        <label className={styles.universitySsoId} htmlFor="enterprisePassword">Set Password</label>
                            <input 
                                id="enterprisePassword"
                                type="text"
                                className={styles.textInput}
                                placeholder="Set Password"
                            />
                        </div>
                        <div className={styles.confirmPass}>
                        <label className={styles.universitySsoId} htmlFor="enterpriseConfirmPassword">Confirm-Password</label>
                            <input 
                                id="enterpriseConfirmPassword"
                                type="text"
                                className={styles.textInput}
                                placeholder="Enter again your Password"
                            />
                        </div>
                    </>
                )}

                {activeRole === "Student" && (
                    <div className={styles.studentAccess}>
                        <img className={styles.campus1Icon} alt="" src={campusImage} />);
                        <button className={styles.accessButton}>
                            <div className={styles.accessChild} />  
                                <div className={styles.accessThroughYour}>
                                Access Through Your Institution
                            </div>
                        </button>
                    </div>
                )}

                


                <div className={styles.submitButton} onClick={onHomeButtonContainerClick}>
                    <div className={styles.submitButtonChild} />
                    <b className={styles.submit}>Submit</b>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
