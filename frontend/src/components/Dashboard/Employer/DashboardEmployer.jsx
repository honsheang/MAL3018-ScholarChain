import { useState, useCallback } from 'react';
import Verify from "../components/Verify";
import { useNavigate } from 'react-router-dom';
import PortalPopup from "../components/PortalPopup";
import styles from './DashboardEmployer.module.css';
import logoImage from '/ScholarChain/frontend/src/components/Image/ScholarChain.png';
import btmImage from '/ScholarChain/frontend/src/components/Image/blackscholarchain.png';


const DashboardEmployer = () => {
  	const [isVerifyOpen, setVerifyOpen] = useState(false);
  	
  	const openVerify = useCallback(() => {
    		setVerifyOpen(true);
  	}, []);
  	
  	const closeVerify = useCallback(() => {
    		setVerifyOpen(false);
  	}, []);
  	
  	
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
  	
  	return (<>
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
      			<div className={styles.btm}>
        				<div className={styles.btmChild} />
        				<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
      			</div>
      			<div className={styles.logo}>
        				<div className={styles.secureAcademicTranscript}>"Secure Academic Transcript Validation with Blockchain"</div>
        				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
      			</div>
      			<div className={styles.welcome}>
        				<b className={styles.welcome1}>Welcome</b>
        				<b className={styles.pktLogisticsGroup}>PKT Logistics Group Sdn Bhd</b>
      			</div>
      			<div className={styles.verifier}>
        				<b className={styles.scholarchainTranscriptVerifi}>ScholarChain Transcript Verifier</b>
        				<div className={styles.grey} />
        				<div className={styles.input}>
          					<div className={styles.certificationurl}>
            						<div className={styles.certificationurlChild} />
            						<div className={styles.certificationUrl}>Certification URL</div>
          					</div>
          					<div className={styles.verifyButton} onClick={openVerify}>
            						<div className={styles.verifyButtonChild} />
            						<b className={styles.verify}>Verify</b>
          					</div>
        				</div>
      			</div>
      			<div className={styles.registerButton} onClick={onregisterContainerClick}>
        				<b className={styles.register}>Register</b>
      			</div>
      			<div className={styles.loginButton} onClick={onloginContainerClick}>
        				<b className={styles.login}>Login</b>
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
    		)}</>);
};

export default DashboardEmployer;
