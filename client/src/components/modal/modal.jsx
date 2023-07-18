import { X } from "@assets/vectors/tabler-icons";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button
          type="button"
          aria-label="close"
          onClick={onClose}
          className={styles.closeBtn}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
