import { Menu, Search, User } from "@assets/vectors/tabler-icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeContext } from "../home";
import styles from "./header.module.css";

const Header = () => {
  const {
    homeStates: { drawerIsOpen, searchQuery },
    homeDispatch,
  } = useContext(HomeContext);

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.drawerToggler}
        onClick={() =>
          homeDispatch((prv) => ({ ...prv, drawerIsOpen: !prv.drawerIsOpen }))
        }
        aria-label={drawerIsOpen ? "close side-drawer" : "open side-drawer"}
      >
        <Menu />
      </button>
      <label htmlFor="blog-search">
        <Search />
        <input
          type="text"
          id="blog-search"
          value={searchQuery}
          onChange={(e) =>
            homeDispatch((prv) => ({ ...prv, searchQuery: e.target.value }))
          }
          placeholder="search"
        />
      </label>
      <Link aria-label="my account" to="/acc" className={styles.userInfo}>
        <User />
      </Link>
    </header>
  );
};

export default Header;
