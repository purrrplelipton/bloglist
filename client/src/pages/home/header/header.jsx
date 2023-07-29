import { Menu, Search, UserCircle, X } from "@assets/vectors/tabler-icons";
import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import services from "@services/";
import { HomeContext } from "../";
import styles from "./header.module.css";
import { SearchSection } from "./search";
import { HeaderContext } from "./";

const Header = () => {
  const {
    homeStates: { drawerIsOpen, searchQuery },
    homeDispatch,
  } = useContext(HomeContext);
  const { dispatch } = useContext(AppContext);
  const [headerStates, headerDispatch] = useState({
    fetching: false,
    queryResults: [],
  });
  const [searchDelay, setSearchDelay] = useState(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      if (searchDelay) clearTimeout(searchDelay);

      const delayTimer = setTimeout(() => handleBlogSearch(), 500);

      setSearchDelay(delayTimer);
    }
  }, [searchQuery]);

  function handleBlogSearch() {
    headerDispatch((prv) => ({ ...prv, fetching: true }));

    if (searchQuery.trim()) {
      services.blog
        .get("search", searchQuery.trim())
        .then((blogs) =>
          headerDispatch((prv) => ({ ...prv, queryResults: blogs }))
        )
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
        .finally(() => headerDispatch((prv) => ({ ...prv, fetching: false })));
    } else headerDispatch((prv) => ({ ...prv, queryResults: [] }));
  }

  return (
    <HeaderContext.Provider value={{ headerStates, headerDispatch }}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.drawerToggler}
          onClick={() =>
            homeDispatch((prv) => ({ ...prv, drawerIsOpen: !prv.drawerIsOpen }))
          }
          aria-label={drawerIsOpen ? "Close drawer" : "Open drawer"}
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
            onChange={(e) => {
              const value = e.target.value;
              homeDispatch((prv) => ({ ...prv, searchQuery: value }));
              headerDispatch((prv) => ({
                ...prv,
                fetching: Boolean(value.trim()),
              }));
            }}
            placeholder="search"
          />
          <button
            type={searchQuery.trim() ? "reset" : "submit"}
            aria-label={searchQuery.trim() ? "Clear search" : "Search"}
            disabled={!searchQuery.trim() || headerStates.fetching}
            onClick={(e) => {
              e.preventDefault();
              if (e.currentTarget.type === "reset") {
                homeDispatch((prv) => ({ ...prv, searchQuery: "" }));
                headerDispatch((prv) => ({
                  ...prv,
                  fetching: false,
                  queryResults: [],
                }));
              }
            }}
          >
            {headerStates.fetching ? (
              <Spinner width={24} />
            ) : searchQuery.trim() ? (
              <X />
            ) : (
              <Search />
            )}
          </button>
        </form>
        <Link aria-label="my account" to="/acc" className={styles.userInfo}>
          <UserCircle />
        </Link>
      </header>
      <SearchSection />
    </HeaderContext.Provider>
  );
};

export default Header;
