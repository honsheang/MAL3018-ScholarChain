import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Receipt.module.css";

const Receipt = ({ className = "", onClose, transactionDetails }) => {
  const onDoneButtonContainerClick = useCallback(() => {
    onClose(); // Close the receipt
  }, [onClose]);

  return (
    <div className={[styles.receipt, className].join(" ")}>
      <div className={styles.transcriptSpecific}>
        <div className={styles.transcriptSpecificChild} />
        <b className={styles.transcriptSpecificReceipt}>Transcript-Specific Receipt</b>
        <div className={styles.transactionId}>Transaction ID</div>
        <div className={styles.issueDate}>Issue Date</div>
        <div className={styles.transcriptSpecificItem} />
        <div className={styles.transcriptSpecificInner} />
        <div className={styles.rectangleDiv} />
        <div className={styles.transcriptSpecificChild1} />
        <div className={styles.div}>2024</div>
        <div className={styles.makjsfna68sfha7sv6ahev8a7sdhvb}>
          {transactionDetails.transactionID}
        </div>
        <div className={styles.dec}>Dec</div>
        <div className={styles.div1}>16</div>
      </div>
      <div className={styles.doneButton} onClick={onDoneButtonContainerClick}>
        <div className={styles.doneButtonChild} />
        <div className={styles.done}>Done</div>
      </div>
    </div>
  );
};

Receipt.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  transactionDetails: PropTypes.shape({
    studentName: PropTypes.string,
    studentID: PropTypes.string,
    transcriptFile: PropTypes.string,
    transactionID: PropTypes.string,
  }).isRequired,
};

export default Receipt;