import PropTypes from "prop-types";
import styles from './Verify.module.css';
import cloudlogo from '/ScholarChain/frontend/src/components/Image/cloud.png';
import comptia from '/ScholarChain/frontend/src/components/Image/comptia.png';


const Verify = ({ className="" }) => {
  	return (
    		<div className={[styles.verify, className].join(' ')}>
      			<div className={styles.verifyChild} />
      			<img className={styles.scholarchain3Icon} alt="" src={cloudlogo} />
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
    <input
        type="text"
        className={styles.recipientInput}
        defaultValue="Lim Hon Sheang"
    />
</div>
<div className={styles.issueDate}>
    <div className={styles.recipient1}>Issue Date</div>
    <input
        type="text"
        className={styles.issueDateInput}
        defaultValue="December 17, 2024"
    />
</div>
<div className={styles.issuer}>
    <div className={styles.issuer1}>Issuer</div>
    <textarea
        className={styles.issuerTextArea}
        defaultValue="Peninsula College Georgetown"
    />
</div>

      			<div className={styles.transaction}>
    <div className={styles.transactionId}>Transaction ID</div>
    <textarea
        className={styles.transactionTextArea}
        readOnly
        value="makjsfna68sfha7sv6ahev8a7sdhvbna87s6dhfba67sgd8f987ans9f7"
    />
</div>

      			<img className={styles.comptiaIcon} alt="" src={comptia} />
    		</div>);
};

Verify.propTypes = {
  	className: PropTypes.string
};

export default Verify;
