import PropTypes from "prop-types";
import React from "react";
import styles from "./spinner.module.css";

const Spinner = ({ text, width }) => {
  return (
    <>
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
      {text && <p className={styles.spText}>{text}</p>}
    </>
  );
};

Spinner.propTypes = {
  width: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Spinner;
