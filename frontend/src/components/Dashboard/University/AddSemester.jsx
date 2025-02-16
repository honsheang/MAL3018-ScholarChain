import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from './AddSemester.module.css';

const AddSemester = ({ className = "", onAddSemester }) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [rows, setRows] = useState([
    { code: "", course: "", creditHours: "", grade: "", description: "" }
  ]);

  // Handle Input Change
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a New Row
  const handleAddRow = () => {
    setRows([...rows, { code: "", course: "", creditHours: "", grade: "", description: "" }]);
  };

  // Remove a Row
  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Handle Update (Send data to Dashboard)
  const handleUpdate = () => {
    if (!selectedSemester || rows.length === 0) {
      alert("Please select a semester and enter course details.");
      return;
    }

    const isValid = rows.every(row =>
      row.code.trim() &&
      row.course.trim() &&
      row.creditHours > 0 &&
      row.grade.trim()
    );

    if (!isValid) {
      alert("Please fill all required fields for each course.");
      return;
    }

    const semesterData = {
      semester: selectedSemester,
      courses: rows.map(row => ({
        ...row,
        creditHours: Number(row.creditHours)
      }))
    };

    onAddSemester(semesterData);

    // Reset form after submission
    setSelectedSemester("");
    setRows([{ code: "", course: "", creditHours: "", grade: "", description: "" }]);
  };

  return (
    <div className={[styles.addSemester, className].join(" ")}>
      <b className={styles.addSemester1}>Add Semester</b>

      <div className={styles.semesterDropdown}>
        <label htmlFor="semesterSelect" className={styles.semester}>Semester: </label>
        <select
          id="semesterSelect"
          className={styles.dropdown}
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          <option value="">Select the semester</option>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.table}>
        <div className={styles.label}>
          <div className={styles.code}>Code</div>
          <div className={styles.course}>Course</div>
          <div className={styles.creditHours}>Credit Hours</div>
          <div className={styles.grade}>Grade</div>
          <div className={styles.description}>Description</div>
        </div>

        {rows.map((row, index) => (
          <div key={index} className={styles.row}>
            <input
              type="text"
              value={row.code}
              onChange={(e) => handleInputChange(index, "code", e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              value={row.course}
              onChange={(e) => handleInputChange(index, "course", e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              min="1"
              value={row.creditHours}
              onChange={(e) => handleInputChange(index, "creditHours", e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="text"
              value={row.grade}
              onChange={(e) => handleInputChange(index, "grade", e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              value={row.description}
              onChange={(e) => handleInputChange(index, "description", e.target.value)}
              className={styles.input}
            />
            <button onClick={() => handleRemoveRow(index)} className={styles.removeButton}>
              Remove
            </button>
          </div>
        ))}

        <button onClick={handleAddRow} className={styles.addButton}>
          Add Row
        </button>
      </div>

      <div className={styles.updateButton}>
        <button className={styles.update} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

AddSemester.propTypes = {
  className: PropTypes.string,
  onAddSemester: PropTypes.func.isRequired,
};

export default AddSemester;