import { Menu, Search, User } from "@assets/vectors/tabler-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./top.module.css";

const Top = () => {
  const [query, setQuery] = useState("");

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.drawerToggler}
        onClick={() => {}}
        aria-label={"drawer-toggle"}
      >
        <Menu />
      </button>
      <label htmlFor="blog-search">
        <Search />
        <input
          type="text"
          id="blog-search"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
          placeholder="search"
        />
      </label>
      <Link aria-label="my account" to="/acc" className={styles.userInfo}>
        <User />
      </Link>
    </header>
  );
};

export default Top;
