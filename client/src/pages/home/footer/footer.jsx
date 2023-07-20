import { Plus } from "@assets/vectors/tabler-icons";
import React, { useContext } from "react";
import { HomeContext } from "../home";
import styles from "./footer.module.css";

const Footer = () => {
  const { homeDispatch } = useContext(HomeContext);

  return (
    <footer className={styles.toolbar}>
      <button
        aria-label="create blog"
        type="button"
        onClick={() => homeDispatch((prv) => ({ ...prv, formIsOpen: true }))}
      >
        <Plus />
      </button>
    </footer>
  );
};

export default Footer;
