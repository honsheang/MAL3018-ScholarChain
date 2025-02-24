import React, { useState } from "react";
import styles from "./DashboardUniversity.module.css";

const AddBadgePopup = ({ onClose, onAddBadge }) => {
  const [badgeIcon, setBadgeIcon] = useState(null);
  const [badgeTitle, setBadgeTitle] = useState("");
  const [badgeDescription, setBadgeDescription] = useState("");
  const [badgeCategory, setBadgeCategory] = useState("academic"); // Default category

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setBadgeIcon(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddBadge = () => {
    if (!badgeIcon || !badgeTitle || !badgeDescription) {
      alert("Please fill all fields.");
      return;
    }

    const newBadge = {
      icon: badgeIcon,
      title: badgeTitle,
      description: badgeDescription,
      category: badgeCategory,
    };

    onAddBadge(newBadge);
    onClose();
  };

  return (
    <div className={styles.addBadgePopup}>
      <h3>Add Badge</h3>
      <div className={styles.badgeForm}>
        <label>Badge Icon:</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {badgeIcon && <img src={badgeIcon} alt="Badge Icon" className={styles.badgeIconPreview} />}

        <label>Badge Title:</label>
        <input
          type="text"
          value={badgeTitle}
          onChange={(e) => setBadgeTitle(e.target.value)}
          placeholder="Enter badge title"
        />

        <label>Badge Description:</label>
        <textarea
          value={badgeDescription}
          onChange={(e) => setBadgeDescription(e.target.value)}
          placeholder="Enter badge description"
        />

        <label>Category:</label>
        <select
          value={badgeCategory}
          onChange={(e) => setBadgeCategory(e.target.value)}
        >
          <option value="academic">Academic</option>
          <option value="sport">Sport</option>
        </select>

        <button onClick={handleAddBadge}>Add Badge</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddBadgePopup;