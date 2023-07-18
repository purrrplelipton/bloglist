import PropTypes from "prop-types";
import styles from "./spinner.module.css";

const Spinner = ({ width }) => {
  return (
    <div>
      <span style={{ width }} className={styles.spRoot} role="progressbar">
        <svg className={styles.spSvg} viewBox="22 22 44 44">
          <circle
            className={styles.spCircle}
            cx={44}
            cy={44}
            r={20.2}
            fill={"none"}
            strokeWidth={3.6}
          ></circle>
        </svg>
      </span>
      <p>Hold on a sec</p>
    </div>
  );
};

Spinner.propTypes = { width: PropTypes.number.isRequired };

export default Spinner;
