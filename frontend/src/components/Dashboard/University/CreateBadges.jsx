import PropTypes from "prop-types";
import styles from './CreateBadges.module.css';


const CreateBadge = ({ className="" }) => {
  	return (
    		<div className={[styles.createBadge, className].join(' ')}>
      			<div className={styles.createBadgeChild} />
      			<div className={styles.createBadge1}>Create Badge</div>
      			<div className={styles.title}>Title</div>
      			<div className={styles.description}>Description</div>
      			<div className={styles.logo}>Logo</div>
      			<div className={styles.createBadgeItem} />
      			<div className={styles.createBadgeInner} />
      			<div className={styles.rectangleDiv} />
      			<div className={styles.createBadgeChild1} />
      			<div className={styles.upload}>upload</div>
      			<div className={styles.createButton}>
        				<div className={styles.createButtonChild} />
        				<div className={styles.create}>create</div>
      			</div>
      			<div className={styles.cancelButton}>
        				<div className={styles.cancelButtonChild} />
        				<div className={styles.create}>cancel</div>
      			</div>
    		</div>);
};

CreateBadge.propTypes = {
  	className: PropTypes.string
};

export default CreateBadge;
