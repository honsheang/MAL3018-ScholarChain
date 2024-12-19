import { useCallback } from 'react';
import styles from './Login.module.css';


const Login = () => {
  	
  	const onHomeButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.login}>
      			<div className={styles.loginChild} />
      			<div className={styles.loginItem} />
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
      			<div className={styles.secureAcademicTranscript}>"Secure Academic Transcript Validation with Blockchain"</div>
      			<div className={styles.loginInner} />
      			<div className={styles.submitButton} onClick={onHomeButtonContainerClick}>
        				<div className={styles.submitButtonChild} />
        				<b className={styles.submit}>Submit</b>
      			</div>
      			<div className={styles.rectangleDiv} />
      			<img className={styles.scholarchain1Icon} alt="" src="ScholarChain 1.png" />
      			<img className={styles.scholarchain2Icon} alt="" src="ScholarChain 2.png" />
      			<div className={styles.loginChild1} />
      			<b className={styles.login1}>Login</b>
      			<div className={styles.loginAs}>Login as</div>
      			<div className={styles.email}>Email</div>
      			<div className={styles.password}>Password</div>
      			<div className={styles.loginChild2} />
      			<div className={styles.loginChild3} />
      			<div className={styles.loginregisterButton} onClick={onHomeButtonContainerClick}>
        				<b className={styles.register}>Register</b>
      			</div>
      			<div className={styles.loginregisterButton1}>
        				<b className={styles.login2}>Login</b>
      			</div>
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
    		</div>);
};

export default Login;
