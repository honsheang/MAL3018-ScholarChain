import { useState, useCallback, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "./DashboardStudent.module.css";
import logoImage from "/ScholarChain/frontend/src/components/Image/ScholarChain.png";
import btmImage from "/ScholarChain/frontend/src/components/Image/blackscholarchain.png";
import academicBadge from "/ScholarChain/frontend/src/components/Image/academic badge.png";
import sportBadge from "/ScholarChain/frontend/src/components/Image/sport.png";

const DashboardStudent = () => {
  const [selectedFeature, setSelectedFeature] = useState("Transcript-Viewer");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Click here");
  const dropdownRef = useRef(null);

  const options = ["Transcript 1", "Transcript 2", "Transcript 3"];

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const handleFeatureClick = useCallback((feature) => {
    setSelectedFeature(feature);
  }, []);

  const onHomeButtonContainerClick = useCallback(() => {
    // Add your code here
  }, []);

// Navigation Component
const Navigation = ({ onHomeClick }) => (
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
    <div className={styles.homeButton} onClick={onHomeClick}>
      <b className={styles.about}>Home</b>
    </div>
  </div>
);

// Logo Component
const Logo = () => (
  <div className={styles.logo}>
    <div className={styles.secureAcademicTranscript}>
      "Secure Academic Transcript Validation with Blockchain"
    </div>
    <img className={styles.scholarchain2Icon} alt="" src={logoImage} />
  </div>
);

// Bottom Image Component
const BottomImage = () => (
  <div className={styles.btm}>
    <div className={styles.btmChild} />
    <img className={styles.scholarchain1Icon} alt="" src={btmImage} />
  </div>
);

// Dynamic Content Component
const DynamicContent = ({ selectedFeature }) => {
  switch (selectedFeature) {
    case "Transcript-Viewer":
  return (
    <div className={styles.display}>
      <div className={styles.selecttranscript}>
        <b className={styles.selectYourTranscript}>Select your Transcript</b>

        <div className={styles.dropdown} ref={dropdownRef}>
          <div
            className={styles.dropdownChild}
            onClick={handleToggleDropdown}
          />
          <div className={styles.clickHere} onClick={handleToggleDropdown}>
            {selectedOption}
            <span className={styles.arrow}>
              {isDropdownOpen ? "▲" : "▼"}
            </span>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
  );


      case "Share Options":
        const shareURL = "https://www.figma.com/design/XTgxRfJDwNDnPrLjmoBgjN/ScholarChain?node-id=1-680&t=OSnv7oa7ime39YMY-0";
      
        return (
          <div className={styles.shareDisplay}>
            <div className={styles.shareGrey} />
            <div className={styles.shareDisplayChild} />
            <div className={styles.qrcode}>
              <b className={styles.qrCode}>QR Code</b>
              <div className={styles.squareBackground}>
                <QRCodeCanvas value={shareURL} size={300} level="H" />
              </div>
              <div className={styles.pleaseDoNot}>
                *please do not share to anonymous person
              </div>
            </div>
            <div className={styles.url}>
              <b className={styles.qrCode}>URL</b>
              <div className={styles.whiteBack} />
              <div className={styles.copyButton}>
                <div className={styles.copyButtonChild} />
                <div className={styles.copy}>Copy</div>
              </div>
              <div className={styles.link}>{shareURL}</div>
            </div>
          </div>
        );
      
    case "Achievement Badges":
      return (
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
                src={sportBadge}
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
              <img className={styles.badgeimgIcon} alt="" src={academicBadge} />
              <b className={styles.top}>Top GPA</b>
              <b className={styles.course1}>Network Security</b>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  };
};

// Main Dashboard Component


  return (
    <div className={styles.dashboardStudent}>
      <Navigation onHomeClick={onHomeButtonContainerClick} />
      <Logo />
      <BottomImage />

      {/* Features Selection */}
      <div className={styles.functions}>
      <div className={styles.functionsChild} />
        <div
          className={`${styles.transcript} ${
            selectedFeature === "Transcript-Viewer" ? styles.blue : styles.grey
          }`}
        />
        <div
          className={styles.transcriptviewer}
          onClick={() => handleFeatureClick("Transcript-Viewer")}
        >
          <div
            className={`${styles.transcriptviewerChild} ${
              selectedFeature === "Transcript-Viewer"
                ? styles.blue
                : styles.grey
            }`}
          />
          <div className={styles.transcriptViewer}>Transcript- Viewer</div>
        </div>
        <div
          className={styles.shareoptions}
          onClick={() => handleFeatureClick("Share Options")}
        >
          <div
            className={`${styles.shareoptionsChild} ${
              selectedFeature === "Share Options" ? styles.blue : styles.grey
            }`}
          />
          <div className={styles.shareOptions}>Share Options</div>
        </div>
        <div
          className={styles.achievementbadges}
          onClick={() => handleFeatureClick("Achievement Badges")}
        >
          <div
            className={`${styles.achievementbadgesChild} ${
              selectedFeature === "Achievement Badges"
                ? styles.blue
                : styles.grey
            }`}
          />
          <div className={styles.shareOptions}>Achievement Badges</div>
        </div>
      </div>

      {/* Dynamic Content */}
      <DynamicContent selectedFeature={selectedFeature} />
    </div>
  );
};

export default DashboardStudent;
