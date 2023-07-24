import { Menu, Search, User } from "@assets/vectors/tabler-icons";
import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import { getBlogs } from "@services/blog.js";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { HomeContext } from "../home";
import styles from "./header.module.css";

const Header = () => {
  const {
    homeStates: { drawerIsOpen, searchQuery },
    homeDispatch,
  } = useContext(HomeContext);
  const { dispatch } = useContext(AppContext);
  const [searching, setSearching] = useState(false);

  function handleBlogSearch(e) {
    e.preventDefault();
    setSearching(true);

    if (searchQuery.trim()) {
      getBlogs(searchQuery.trim())
        .then((res) => console.log(res))
        .catch(({ message }) =>
          dispatch((prv) => ({
            ...prv,
            notifs: prv.notifs.concat({
              message,
              color: "error",
              id: uuidv4(),
            }),
          }))
        )
        .finally(() => setSearching(false));
    }
  }

  return (
    <>
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
        <form
          method="GET"
          action="/get-blog"
          className={styles.blogSearch}
          onSubmit={handleBlogSearch}
        >
          <input
            type="text"
            id="blog-search"
            value={searchQuery}
            onChange={(e) =>
              homeDispatch((prv) => ({ ...prv, searchQuery: e.target.value }))
            }
            placeholder="search"
          />
          <button
            type="submit"
            aria-label="search"
            disabled={!searchQuery.trim() || searching}
            onClick={() => {}}
          >
            {searching ? <Spinner width={24} /> : <Search />}
          </button>
        </form>
        <Link aria-label="my account" to="/acc" className={styles.userInfo}>
          <User />
        </Link>
      </header>
    </>
  );
};

export default Header;
