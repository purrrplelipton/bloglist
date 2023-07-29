import { Plus } from "@assets/vectors/tabler-icons";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { HomeContext } from "../";
import styles from "./footer.module.css";

const Footer = () => {
  const { homeDispatch } = useContext(HomeContext);

  return (
    <motion.footer
      className={styles.toolbar}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <button
        aria-label="create blog"
        type="button"
        onClick={() => homeDispatch((prv) => ({ ...prv, formIsOpen: true }))}
      >
        <Plus />
      </button>
    </motion.footer>
  );
};

export default Footer;
