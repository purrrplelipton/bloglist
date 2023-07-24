import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import styles from "./backdrop.module.css";
import { X } from "@assets/vectors/tabler-icons";

const Backdrop = ({ isOpen, onClose, children }) => {
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => {}}>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            aria-label="Close form"
            className={styles.closeBtn}
            onClick={onClose}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
          >
            <X />
          </motion.button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Backdrop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Backdrop;
