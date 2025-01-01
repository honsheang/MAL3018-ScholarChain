import PropTypes from "prop-types";
import styles from './Verify.module.css';


const Verify = ({ className="" }) => {
  	return (
    		<div className={[styles.verify, className].join(' ')}>
      			<div className={styles.verifyChild} />
      			<img className={styles.scholarchain3Icon} alt="" src="ScholarChain 3.png" />
      			<b className={styles.studentName}>LIM HON SHEANG</b>
      			<b className={styles.bscshonsComputerScience}>BSCs(Hons) Computer Science (Cyber Security)</b>
      			<div className={styles.verified}>
        				<div className={styles.verifiedChild} />
        				<b className={styles.verified1}>Verified</b>
      			</div>
      			<div className={styles.transcriptView}>
        				<div className={styles.transcriptViewChild} />
        				<b className={styles.transcript}>Transcript</b>
      			</div>
      			<div className={styles.recipient}>
        				<div className={styles.recipient1}>Recipient</div>
        				<div className={styles.limHonSheang}>Lim Hon Sheang</div>
      			</div>
      			<div className={styles.issueDate}>
        				<div className={styles.recipient1}>Issue Date</div>
        				<div className={styles.december172024}>December 17, 2024</div>
      			</div>
      			<div className={styles.issuer}>
        				<div className={styles.issuer1}>Issuer</div>
        				<div className={styles.peninsulaCollegeGeorgetown}>Peninsula College Georgetown</div>
      			</div>
      			<div className={styles.transaction}>
        				<div className={styles.transactionId}>Transaction ID</div>
        				<div className={styles.makjsfna68sfha7sv6ahev8a7sdhvb}>makjsfna68sfha7sv6ahev8a7sdhvbna87s6dhfba67sgd8f987ans9f7</div>
      			</div>
      			<img className={styles.comptiaIcon} alt="" src="comptia .png" />
    		</div>);
};

Verify.propTypes = {
  	className: PropTypes.string
};

export default Verify;
