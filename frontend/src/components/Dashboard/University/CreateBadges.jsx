import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./CreateBadges.module.css";

const CreateBadge = ({ onAddBadge, className = "" }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 3 * 1024 * 1024) {
      // Limit to 3MB
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      alert("Please upload an image smaller than 3MB.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.size <= 3 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      alert("Please upload an image smaller than 3MB.");
    }
  };

  const handleCreate = () => {
    if (!title || !description || !imageFile) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const newBadge = {
      title,
      description,
      image: imagePreview,
    };

    if (onAddBadge) {
      onAddBadge(newBadge); // Pass the badge to the parent component
    }

    // Clear the form
    setTitle("");
    setDescription("");
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <div className={[styles.createBadge, className].join(" ")}>
      <div className={styles.createBadgeChild} />
      <div className={styles.createBadge1}>Create Badge</div>

      {/* Title Input */}
      <div className={styles.title}>Title</div>
      <div className={styles.createBadgeItem}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {/* Description Input */}
      <div className={styles.description}>Description</div>
      <div className={styles.createBadgeInner}>
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textAreaField}
        ></textarea>
      </div>

      {/* Image Upload */}
      <div
        className={styles.rectangleDiv}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.previewImage}
          />
        ) : (
          <p className={styles.placeholder}>Drag & Drop or Click to Upload</p>
        )}
        <input
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleImageUpload}
        />
      </div>

      {/* Upload Button */}
      <div
        className={styles.createBadgeChild1}
        onClick={() => document.querySelector(`.${styles.fileInput}`).click()}
      >
        <div className={styles.upload}>Upload</div>
      </div>

      {/* Create Button */}
      <div className={styles.createButton} onClick={handleCreate}>
        <div className={styles.createButtonChild} />
        <div className={styles.create}>Create</div>
      </div>

      {/* Cancel Button */}
      <div className={styles.cancelButton}>
        <div className={styles.cancelButtonChild} />
        <div className={styles.create}>Cancel</div>
      </div>
    </div>
  );
};

CreateBadge.propTypes = {
  onAddBadge: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CreateBadge;
