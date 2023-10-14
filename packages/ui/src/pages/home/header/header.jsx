import { IconMenu, IconUserCircle, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import blogsApi from "services/blogs";
import { setSearchParam, showDrawer } from "store/reducers/common";
import { appendNotification } from "store/reducers/global";
import { HeaderContext } from ".";
import { SearchSection } from "./search";

const Header = ({ showDrawer: drawerVisible, searchParam }) => {
  const dispatch = useDispatch();
  const [headerStates, headerDispatch] = useState({
    fetching: false,
    results: [],
  });
  const [searchDelay, setSearchDelay] = useState(null);

  useEffect(() => {
    if (searchParam) {
      if (searchDelay) {
        clearTimeout(searchDelay);
      }
      const delayTimer = setTimeout(() => {
        handleBlogSearch();
      }, 1000);

      setSearchDelay(delayTimer);
    }
  }, [searchParam]);

  function handleBlogSearch() {
    headerDispatch((prv) => ({ ...prv, fetching: true }));

    if (searchParam.trim()) {
      blogsApi
        .get("/", searchParam)
        .then((blogs) => headerDispatch((prv) => ({ ...prv, results: blogs })))
        .catch(({ message }) => {
          dispatch(
            appendNotification({
              message,
              color: "error",
            })
          );
        });
      headerDispatch((prv) => ({ ...prv, fetching: false }));
      return;
    }
    headerDispatch((prv) => ({ ...prv, results: [] }));
  }

  return (
    <HeaderContext.Provider value={{ headerStates, headerDispatch }}>
      <header className="fixed top-0 left-0 z-50 w-full px-3 py-5">
        <div className="flex items-center justify-between w-full max-w-screen-xl p-3 mx-auto bg-white rounded-full shadow shadow-gray-300">
          <button
            type="button"
            className="p-1 overflow-hidden rounded-full"
            onClick={() => dispatch(showDrawer())}
            aria-label={drawerVisible ? "Close drawer" : "Open drawer"}
          >
            <IconMenu />
          </button>
          <form
            className="flex items-center overflow-hidden rounded-md focus-within:bg-slate-50"
            onSubmit={handleBlogSearch}
          >
            <input
              type="text"
              id="blog-search"
              value={searchParam}
              onChange={(e) => {
                const { value } = e.target;
                dispatch(setSearchParam(value));
                headerDispatch((prv) => ({
                  ...prv,
                  fetching: Boolean(value),
                }));
              }}
              placeholder="Search"
              className="w-full py-1 pl-2 outline-none bg-inherit"
            />
            <button
              type="button"
              aria-label="Clear"
              aria-disabled={!searchParam || headerStates.fetching}
              onClick={() => {
                if (searchParam && !headerStates.fetching) {
                  dispatch(setSearchParam(""));
                }
              }}
              className="p-1 rounded-md outline-none aria-disabled:opacity-5 focus:bg-slate-100"
            >
              <IconX />
            </button>
          </form>
          <Link
            aria-label="My Account"
            to="/acc"
            className="p-1 overflow-hidden rounded-full"
          >
            <IconUserCircle />
          </Link>
        </div>
      </header>
      {searchParam.trim() && <SearchSection />}
    </HeaderContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  searchParam: state.common.searchParam,
  showDrawer: state.common.showDrawer,
});

export default connect(mapStateToProps)(Header);
