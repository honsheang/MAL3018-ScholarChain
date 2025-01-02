import { useState, useCallback } from 'react';
import styles from './DashboardStudent.module.css';
import logoImage from '/ScholarChain/frontend/src/components/Image/ScholarChain.png';
import btmImage from '/ScholarChain/frontend/src/components/Image/blackscholarchain.png';


const DashboardStudent = () => {
    const [selectedFeature, setSelectedFeature] = useState("Transcript-Viewer");

    const handleFeatureClick = useCallback((feature) => {
        setSelectedFeature(feature);
      }, []);
  	
  	const onHomeButtonContainerClick = useCallback(() => {
    		// Add your code here
  	}, []);
  	
  	return (
    		<div className={styles.dashboardStudent}>
      			<div className={styles.navigation}>
        				<div className={styles.navigationChild} />
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
      			<div className={styles.btm}>
        				<div className={styles.btmChild} />
        				<img className={styles.scholarchain1Icon} alt="" src={btmImage} />
      			</div>
      			<div className={styles.logo}>
        				<div className={styles.secureAcademicTranscript}>"Secure Academic Transcript Validation with Blockchain"</div>
        				<img className={styles.scholarchain2Icon} alt="" src={logoImage} />
      			</div>
      			<div className={styles.functions}>
        <div
          className={styles.transcriptviewer}
          onClick={() => handleFeatureClick("Transcript-Viewer")}
        >
          <div className={styles.transcriptviewerChild} />
          <div className={styles.transcriptViewer}>Transcript- Viewer</div>
        </div>
        <div
          className={styles.shareoptions}
          onClick={() => handleFeatureClick("Share Options")}
        >
          <div className={styles.shareoptionsChild} />
          <div className={styles.shareOptions}>Share Options</div>
        </div>
        <div
          className={styles.achievementbadges}
          onClick={() => handleFeatureClick("Achievement Badges")}
        >
          <div className={styles.achievementbadgesChild} />
          <div className={styles.shareOptions}>Achievement Badges</div>
        </div>
      </div>
      			<div className={styles.welcome}>
        				<b className={styles.welcome1}>Welcome,</b>
        				<b className={styles.lim}>Lim</b>
      			</div>
      			<div className={styles.selecttranscript}>
        				<b className={styles.selectYourTranscript}>Select your Transcript</b>
        				<div className={styles.dropdown}>
          					<div className={styles.dropdownChild} />
          					<div className={styles.clickHere}>Click here</div>
        				</div>
      			</div>
      			<div className={styles.registerButton} onClick={onHomeButtonContainerClick}>
        				<b className={styles.register}>Register</b>
      			</div>
      			<div className={styles.loginButton}>
        				<b className={styles.login}>Login</b>
      			</div>
      			{/* Dynamic Content */}
      <div className={styles.dynamicContent}>
        {selectedFeature === "Transcript-Viewer" && (
          <div className={styles.display}>
            <div className={styles.transcriptGrey} />
            <div className={styles.course}>
              <b className={styles.issueDate}>Course</b>
              <div className={styles.courseChild} />
              <div className={styles.sampleText}>sample text</div>
            </div>
            <div className={styles.grade}>
              <b className={styles.issueDate}>Grade</b>
              <div className={styles.courseChild} />
              <div className={styles.sampleText}>sample text</div>
            </div>
            <div className={styles.issuedate}>
              <b className={styles.issueDate}>Issue Date</b>
              <div className={styles.courseChild} />
              <div className={styles.sampleText}>sample text</div>
            </div>
            <div className={styles.file}>
              <div className={styles.fileChild} />
              <b className={styles.filenamepdf}>filename.pdf</b>
            </div>
          </div>
        )}

        {selectedFeature === "Share Options" && (
          <div className={styles.shareDisplay}>
            <div className={styles.shareGrey} />
            <div className={styles.shareDisplayChild} />
            <div className={styles.qrcode}>
              <b className={styles.qrCode}>QR Code</b>
              <div className={styles.squareBackground} />
              <div className={styles.pleaseDoNot}>
                *please do not share to anonymous person
              </div>
              <img className={styles.imageIcon} alt="" src="image.png" />
            </div>
            <div className={styles.url}>
              <b className={styles.qrCode}>URL</b>
              <div className={styles.whiteBack} />
              <div className={styles.copyButton}>
                <div className={styles.copyButtonChild} />
                <div className={styles.copy}>Copy</div>
              </div>
              <div className={styles.link}>
                https://www.figma.com/design/XTgxRfJDwNDnPrLjmoBgjN/ScholarChain?node-id=1-680&t=OSnv7oa7ime39YMY-0
              </div>
            </div>
          </div>
        )}

        {selectedFeature === "Achievement Badges" && (
          <div className={styles.achievementBadges}>
            <div className={styles.achievementGrey} />
            <div className={styles.sportBadge}>
              <div className={styles.sportDarkGrey} />
              <b className={styles.sportmanshipAchievementBadge}>
                Sportmanship Achievement Badges
              </b>
              <div className={styles.badge}>
                <div className={styles.badgeChild} />
                <div className={styles.badgeItem} />
                <img
                  className={styles.sportbadgeimgIcon}
                  alt=""
                  src="sportbadgeimg.png"
                />
                <b className={styles.gold}>GOLD</b>
                <b className={styles.title}>
                  <span className={styles.titleTxt}>
                    <p className={styles.pingPongCompetition}>
                      Ping Pong Competition 2023
                    </p>
                    <p className={styles.pingPongCompetition}>
                      (Men Single Category)
                    </p>
                  </span>
                </b>
              </div>
            </div>
            <div className={styles.academicBadge}>
              <div className={styles.sportDarkGrey} />
              <b className={styles.academicAchievementBadges}>
                Academic Achievement Badges
              </b>
              <div className={styles.badge1}>
                <div className={styles.badgeInner} />
                <div className={styles.rectangleDiv} />
                <img className={styles.badgeimgIcon} alt="" src="badgeImg.png" />
                <b className={styles.top}>Top GPA</b>
                <b className={styles.course1}>Network Security</b>
              </div>
              <div className={styles.addinBadges}>
                <div className={styles.badgeChild} />
                <div className={styles.badgeItem} />
                <b className={styles.gold}>Top GPA</b>
                <b className={styles.subject}>subject</b>
              </div>
              <div className={styles.addinBadges1}>
                <div className={styles.badgeChild} />
                <div className={styles.badgeItem} />
                <b className={styles.gold}>Top GPA</b>
                <b className={styles.subject}>subject</b>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
};

export default DashboardStudent;
