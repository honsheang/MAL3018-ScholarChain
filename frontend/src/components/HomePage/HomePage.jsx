import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import scholarChainImage from './ScholarChain.png';
import blockChainImage from './blockchainnet.png';
import webImage from './web.png';
import btmImage from './blackscholarchain.png';

const HomePage = () => {
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
      navigate('/login'); // Redirects to Login.jsx
  }, [navigate]);



  return (
    <div className={styles.homePage}>

      {/* Login Buttons */}
      <div className={styles.buttonContainer}>
        <div className={styles.loginButton} onClick={onLoginClick}>
          <b className={styles.login}>Login</b>
        </div>
        <div className={styles.registerButton}>
          <b className={styles.register}>Register</b>
        </div>
      </div>



      {/* Navigation Bar */}
      <div className={styles.navigationBar}>
        <div className={styles.bar} />
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
        <div className={styles.homeButton}>
          <b className={styles.about}>Home</b>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className={styles.bottomNavigationBar}>
        <div className={styles.bottomNavigationBarChild} />
        <img className={styles.scholarchain1Icon} alt="" src={btmImage} />
      </div>

      {/* Section 3 */}
      <div className={styles.section3}>
        <div className={styles.blackBehind} />

        <div className={styles.three}>
          <div className={styles.circle3}>
            <div className={styles.circle3Child} />
            <div className={styles.div}>3</div>
          </div>
          <div className={styles.receiveHoldAnd}>Receive, hold, and share your credentials any time.</div>
        </div>

        <div className={styles.two}>
          <div className={styles.circle3}>
            <div className={styles.circle3Child} />
            <div className={styles.div}>2</div>
          </div>
          <div className={styles.receiveHoldAnd}>Add different issuers to your app to receive credentials.</div>
        </div>

        <div className={styles.one}>
          <div className={styles.circle3}>
            <div className={styles.circle3Child} />
            <div className={styles.div}>1</div>
          </div>
          <div className={styles.receiveHoldAnd}>Your private passphrase ensures ownership and aids recovery.</div>
        </div>
      </div>

      {/* Section 2 */}
      <div className={styles.section2}>
        <img className={styles.scholarchain61} alt="" src={blockChainImage} />

        <div className={styles.blue}>
          <div className={styles.blueChild} />
          <b className={styles.useTheScholarchain}>
            Use the ScholarChain Universal Verifier to independently verify records. This service can also be built into existing software systems for greater convenience.
          </b>
        </div>

        <div className={styles.grey}>
          <div className={styles.greyChild} />
          <i className={styles.verifyAnyonesAchievements}>Verify Anyone’s Achievements</i>
        </div>

        <div className={styles.black}>
          <div className={styles.blackChild} />
          <b className={styles.credentialIssuers}>Credential Issuers</b>
        </div>
      </div>

      {/* Section 1 */}
      <div className={styles.section1}>
        <div className={styles.blue1} />
        <div className={styles.white} />
        <b className={styles.ownAndShare}>Own and Share your Achievement</b>
        <div className={styles.withTheBlockchainContainer}>
          <span className={styles.withTheBlockchainContainer1}>
            <p className={styles.withTheBlockchain}>With the blockchain, your official records are now yours forever.</p>
            <p className={styles.withTheBlockchain}>Receive them once, share and verify them for a lifetime.</p>
          </span>
        </div>
        <img className={styles.webIcon} alt="" src={webImage} />
      </div>

      {/* Logo Section */}
      <div className={styles.logo}>
        <div className={styles.secureAcademicTranscript}>
          "Secure Academic Transcript Validation with Blockchain"
        </div>
        <img className={styles.scholarchainIcon} alt="ScholarChain Logo" src={scholarChainImage} />
      </div>
    </div>
  );
};

export default HomePage;
