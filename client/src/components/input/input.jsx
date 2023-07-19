import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import styles from "./input.module.css";

const Input = ({ label, placeholder, value, onInput, ...rest }) => {
  const InputRef = useRef(null);

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.textContent = value || "";
    }
  }, [value]);

  function handleInputChange() {
    if (InputRef.current) {
      const sanitizedValue = DOMPurify.sanitize(InputRef.current.textContent);
      onInput(sanitizedValue);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  }

  return (
    <div
      contentEditable
      role="textbox"
      aria-label={label}
      data-placeholder={placeholder}
      onInput={handleInputChange}
      onKeyDown={handleKeyDown}
      ref={InputRef}
      className={styles.input}
      aria-multiline="true"
      spellCheck
      tabIndex={0}
      {...rest}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onInput: PropTypes.func.isRequired,
};

export default Input;
