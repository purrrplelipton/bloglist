import Loader from "components/loader"
import { array, bool, string } from "prop-types"
import React from "react"
import { connect } from "react-redux"

const SearchSection = ({ searchParam, searchResults, searching, userID }) => {
  return (
    <section className="fixed top-24 right-3 left-3">
      <div className="relative bg-white shadow shadow-slate-100 p-2 rounded-lg min-h-[320px] z-[100] max-h-[425px]">
        {searchParam && searching && <Loader />}
        {searchParam && !searching && searchResults.length > 0 && (
          <div>
            {searchResults.map((blog) => (
              <article
                className="flex items-center justify-between p-2 overflow-hidden rounded-lg bg-slate-100"
                key={blog.id}
              >
                <p>{blog.title}</p>
                <img
                  src={`hotcakes/${userID}/${blog.thumbnail}`}
                  alt={`Thumbnail for blog titled: ${blog.title}`}
                  className="h-24 rounded-md aspect-square"
                />
              </article>
            ))}
          </div>
        )}
        {searchParam && !searching && searchResults.length === 0 && (
          <div>No matching results.</div>
        )}
      </div>
    </section>
  )
}

SearchSection.propTypes = {
  searchParam: string.isRequired,
  searching: bool.isRequired,
  searchResults: array.isRequired,
  userID: string.isRequired,
}

const mapStateToProps = (state) => ({
  searchParam: state.common.searchParam,
  searching: state.common.searching,
  searchResults: state.common.searchResults,
  userID: state.global.user,
})

export default connect(mapStateToProps)(SearchSection)
