import PropTypes from "prop-types";
import styles from './AddSemester.module.css';


const AddSemester = ({ className="" }) => {
  	return (
    		<div className={[styles.addSemester, className].join(' ')}>
      			<div className={styles.addSemesterChild} />
      			<div className={styles.cancel}>Cancel</div>
      			<b className={styles.addSemester1}>Add Semester</b>
      			<div className={styles.addSemesterItem} />


      			<div className={styles.semesterDropdown}>
    <label htmlFor="semesterSelect" className={styles.semester}>Semester: </label>
    <select id="semesterSelect" className={styles.dropdown}>
        <option value="">Select the semester</option>
        {Array.from({ length: 9 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
                {i + 1}
            </option>
        ))}
    </select>
</div>
      			{/*<img className={styles.dropdownIcon} alt="" src="dropdown.svg" />*/}

				
      			<div className={styles.table}>
        				<div className={styles.tableChild} />
        				<div className={styles.tableItem} />
        				<div className={styles.tableInner} />
        				<div className={styles.lineDiv} />
        				<div className={styles.tableChild1} />
        				<div className={styles.tableChild2} />
        				<div className={styles.second}>
          					<div className={styles.dcs1133}>DCS1133</div>
          					<div className={styles.discreteMathematics}>Discrete Mathematics</div>
          					<div className={styles.div}>3</div>
          					<div className={styles.a}>A</div>
          					<div className={styles.distinction}>Distinction</div>
        				</div>
        				<div className={styles.first}>
          					<div className={styles.dcs1133}>DCS1233</div>
          					<div className={styles.discreteMathematics}>Business Communication</div>
          					<div className={styles.div1}>3</div>
          					<div className={styles.b}>B+</div>
          					<div className={styles.distinction}>Credit</div>
        				</div>
        				<div className={styles.label}>
          					<div className={styles.code}>Code</div>
          					<div className={styles.creditHours}>Credit Hours</div>
          					<div className={styles.grade}>Grade</div>
          					<div className={styles.description}>Description</div>
          					<div className={styles.course}>Course</div>
        				</div>
        				<div className={styles.tableChild3} />
        				<div className={styles.tableChild4} />
        				<div className={styles.tableChild5} />
        				<div className={styles.tableChild6} />
        				<div className={styles.tableChild7} />
      			</div>
      			<div className={styles.updateButton}>
        				<div className={styles.updateButtonChild} />
        				<div className={styles.update}>Update</div>
      			</div>
    		</div>);
};

AddSemester.propTypes = {
  	className: PropTypes.string
};

export default AddSemester;
