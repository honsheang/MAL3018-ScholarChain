import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pending.module.css';
import logoImage from '/ScholarChain/frontend/src/components/Image/ScholarChain.png';
import btmImage from '/ScholarChain/frontend/src/components/Image/blackscholarchain.png';
import pendingImage from '/ScholarChain/frontend/src/components/Image/pending.png';


const Pending = () => {
    const navigate = useNavigate();
	
  	
    const onhomeContainerClick = useCallback(() => {
        navigate('/'); 
    }, [navigate]);

    const onloginContainerClick = useCallback(() => {
        navigate('/login'); 
    }, [navigate]);

    const onregisterContainerClick = useCallback(() => {
        navigate('/register'); 
    }, [navigate]);

    

    
  	return (
    		<div className={styles.pending}>
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
      			<div className={styles.btm}>
        				<div className={styles.btmChild} />
        				<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
      			</div>
      			<div className={styles.logo}>
        				<div className={styles.secureAcademicTranscript}>"Secure Academic Transcript Validation with Blockchain"</div>
        				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
      			</div>
      			<div className={styles.registerButton} onClick={onregisterContainerClick}>
        				<b className={styles.register}>Register</b>
      			</div>
      			<div className={styles.loginButton} onClick={onloginContainerClick}>
        				<b className={styles.login}>Login</b>
      			</div>
      			<div className={styles.pendingDisplay}>
        				<div className={styles.white} />
        				<div className={styles.penidngApproval}>Pending approval by ScholarChain</div>
        				<div className={styles.checkEmail}>*please check your email for the verification</div>
        				<img className={styles.pendingLogoIcon} alt="" src={pendingImage} />
        				<div className={styles.backToHomeButton} onClick={onhomeContainerClick}>
          					<div className={styles.backToHomeButtonChild} />
          					<div className={styles.backToHome}>Back to Home page</div>
        				</div>
      			</div>
    		</div>);
};

export default Pending;
