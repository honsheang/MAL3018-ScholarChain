import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import logoImage from '/ScholarChain/frontend/src/components/Image/ScholarChain.png';
import btmImage from '/ScholarChain/frontend/src/components/Image/blackscholarchain.png';

const Login = () => {
    const navigate = useNavigate();
	const location = useLocation();

    const onhomeContainerClick = useCallback(() => {
        navigate('/'); 
    }, [navigate]);

	const onloginContainerClick = useCallback(() => {
        if (location.pathname === '/login') {
            alert("You're already here!!!");
        } else {
            navigate('/login');
        }
    }, [navigate, location]);

	const onregisterContainerClick = useCallback(() => {
        navigate('/register'); 
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
        				<div className={styles.secureAcademicTranscript}>"Secure Academic Transcript Validation with Blockchain"</div>
        				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
      			</div>
      			<div className={styles.registerButton} onClick={onregisterContainerClick}>
        				<b className={styles.register}>Register</b>
      			</div>
      			<div className={styles.loginButton} onClick={onloginContainerClick} style={{ cursor: 'pointer' }}>
        				<b className={styles.login1}>Login</b>
      			</div>
      			<div className={styles.loginDetail}>
        				<div className={styles.blue} />
        				<div className={styles.submitButton} >
          					<div className={styles.submitButtonChild} />
          					<b className={styles.submit}>Submit</b>
        				</div>
        				<div className={styles.white} />
        				<div className={styles.loginLabel}>
          					<div className={styles.loginLabelChild} />
          					<b className={styles.login2}>Login</b>
        				</div>
						
        				<div className={styles.email}>
    						<label className={styles.loginAs} htmlFor="emailInput">Email</label>
    						<input
        						id="emailInput"
        						type="text"
        						className={styles.textInput}
        						placeholder="Enter your email"
    						/>
						</div>

        				<div className={styles.password}>
          					<label className={styles.loginAs} htmlFor= "passwordInput">Password</label>
          					<input 
							id="passwordInput"
							type="text"
							className={styles.textInput}
							placeholder="Enter your password" />
        				</div>


        				<div className={styles.loginOption}>
          					<div className={styles.loginAs}>Login as</div>
          					<div className={styles.studentOption}>
            						<div className={styles.studentOptionChild} />
            						<div className={styles.student}>Student</div>
          					</div>
          					<div className={styles.universityOption}>
            						<div className={styles.studentOptionChild} />
            						<div className={styles.student}>University</div>
          					</div>
          					<div className={styles.employerOption}>
            						<div className={styles.studentOptionChild} />
            						<div className={styles.student}>Employer</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Login;
