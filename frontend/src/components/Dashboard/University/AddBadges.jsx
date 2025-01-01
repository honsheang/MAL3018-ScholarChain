import { useState, useCallback } from 'react';
import CreateBadge from "./CreateBadges";
import PortalPopup from "./PortalPopup";
import PropTypes from "prop-types";
import styles from './AddBadges.module.css';


const AddBadges = ({ className="" }) => {
  	const [isCreateBadgeOpen, setCreateBadgeOpen] = useState(false);
  	
  	const openCreateBadge = useCallback(() => {
    		setCreateBadgeOpen(true);
  	}, []);
  	
  	const closeCreateBadge = useCallback(() => {
    		setCreateBadgeOpen(false);
  	}, []);
  	
  	return (<>
    		<div className={[styles.addBadges, className].join(' ')}>
      			<div className={styles.addBadgesChild} />
      			<div className={styles.cancel}>Cancel</div>
      			<b className={styles.addGamificationBadges}>Add Gamification Badges</b>
      			<div className={styles.addBadgesItem} />
      			<div className={styles.category}>Category</div>
      			<div className={styles.addBadgesInner} />
      			<img className={styles.dropdownIcon} alt="" src="dropdown.svg" />
      			<div className={styles.updateButton}>
        				<div className={styles.updateButtonChild} />
        				<div className={styles.issue}>Issue</div>
      			</div>
      			<div className={styles.updateButton1} onClick={openCreateBadge}>
        				<div className={styles.updateButtonItem} />
        				<div className={styles.issue}>Create</div>
      			</div>
      			<div className={styles.academic}>Academic</div>
      			<div className={styles.rectangleDiv} />
    		</div>
    		{isCreateBadgeOpen && (
      			<PortalPopup
        				overlayColor="rgba(113, 113, 113, 0.3)"
        				placement="Centered"
        				
        				
        				
        				
        				
        				onOutsideClick={closeCreateBadge}
        				>
        				<CreateBadge onClose={closeCreateBadge} />
      			</PortalPopup>
    		)}</>);
};

AddBadges.propTypes = {
  	className: PropTypes.string
};

export default AddBadges;
