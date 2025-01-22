import { useState, useCallback } from "react";
import CreateBadge from "./CreateBadges";
import PortalPopup from "./PortalPopup";
import PropTypes from "prop-types";
import styles from "./AddBadges.module.css";

const AddBadges = ({ className = "" }) => {
  const [isCreateBadgeOpen, setCreateBadgeOpen] = useState(false);
  const [badges, setBadges] = useState([]); // State to store created badges

  const openCreateBadge = useCallback(() => {
    setCreateBadgeOpen(true);
  }, []);

  const closeCreateBadge = useCallback(() => {
    setCreateBadgeOpen(false);
  }, []);

  const handleAddBadge = useCallback((badge) => {
    setBadges((prevBadges) => [...prevBadges, badge]);
    closeCreateBadge();
  }, [closeCreateBadge]);

  return (
    <>
      <div className={[styles.addBadges, className].join(" ")}>
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
          <div className={styles.create}>Create</div>
        </div>
        <div className={styles.dropdownWrapper}>
          <label htmlFor="category" className={styles.dropdownLabel}>
            Select Category
          </label>
          <select id="category" className={styles.dropdown}>
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Badge Display Section */}
        <div className={styles.rectangleDiv}>
          {badges.map((badge, index) => (
            <div key={index} className={styles.badgesDisplay}>
              <img
                src={badge.image}
                alt={badge.title}
                className={styles.badgeImage}
              />
              <div className={styles.badgeTitle}>{badge.title}</div>
            </div>
          ))}
        </div>
      </div>

      {isCreateBadgeOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeCreateBadge}
        >
          <CreateBadge onAddBadge={handleAddBadge} onClose={closeCreateBadge} />
        </PortalPopup>
      )}
    </>
  );
};

AddBadges.propTypes = {
  className: PropTypes.string,
};

export default AddBadges;
