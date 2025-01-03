import styles from './BadgeDescription.module.css';
import academicBadge from "/ScholarChain/frontend/src/components/Image/academic badge.png";


const BadgeDescription = () => {
  	return (
    		<div className={styles.badgeDescription}>
      			<img className={styles.badgeimgIcon} alt="" src={academicBadge} />
      			<b className={styles.topGpa}>Top GPA</b>
      			<b className={styles.networkSecurity}>Network Security</b>
      			<div className={styles.networkSecurityIs}>Network Security is a field dedicated to safeguarding computer networks and data from unauthorized access, misuse, or damage. It encompasses techniques like encryption, firewalls, intrusion detection, and access controls to ensure the confidentiality, integrity, and availability of information. Constant vigilance and updated practices are essential due to evolving cyber threats.</div>
    		</div>);
};

export default BadgeDescription;
