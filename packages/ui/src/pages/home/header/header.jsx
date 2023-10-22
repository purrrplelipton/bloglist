import { IconMenu, IconUserCircle, IconX } from "@tabler/icons-react"
import { bool, string } from "prop-types"
import React, { useCallback, useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import blogsApi from "services/blogs"
import {
  setSearchParam,
  setSearchResults,
  setSearching,
  showDrawer,
} from "store/reducers/common"
import { appendNotification } from "store/reducers/global"
import { SearchSection } from "./search"

const Header = ({ showDrawer: drawerVisible, searchParam, searching }) => {
  const dispatch = useDispatch()

  const blogSearchHandler = useCallback(() => {
    if (!searchParam.trim()) return dispatch(setSearchResults([]))

    setTimeout(async () => {
      dispatch(setSearching(true))
      try {
        const results = await blogsApi.get("/", searchParam)
        dispatch(setSearchResults(results))
      } catch (error) {
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
          }),
        )
      }
      dispatch(setSearching(false))
    }, 1800)
  }, [dispatch, searchParam])

  useEffect(() => {
    if (searchParam) {
      blogSearchHandler()
    }
  }, [blogSearchHandler, searchParam])

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] w-full px-3 py-5">
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
            onSubmit={blogSearchHandler}
          >
            <input
              type="text"
              id="blog-search"
              value={searchParam}
              onChange={(e) => {
                const { value } = e.target
                dispatch(setSearchParam(value))
                dispatch(setSearching(Boolean(value)))
              }}
              placeholder="Search"
              className="w-full py-1 pl-2 outline-none bg-inherit"
            />
            <button
              type="button"
              aria-label="Clear"
              aria-disabled={!searchParam || searching}
              onClick={() => {
                if (searchParam && !searching) {
                  dispatch(setSearchParam(""))
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
    </>
  )
}

Header.propTypes = {
  searchParam: string.isRequired,
  searching: bool.isRequired,
  showDrawer: bool.isRequired,
}

const mapStateToProps = (state) => ({
  searchParam: state.common.searchParam,
  searchResults: state.common.searchResults,
  showDrawer: state.common.showDrawer,
  searching: state.common.searching,
})

export default connect(mapStateToProps)(Header)
