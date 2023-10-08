import Loader from "@components/loader";
import { useContext } from "react";
import { connect } from "react-redux";
import { HeaderContext } from "..";

const SearchSection = ({ searchParam }) => {
  const {
    headerStates: { fetching, results },
  } = useContext(HeaderContext);

  return (
    <section className="fixed top-24 right-3 left-3">
      <div className="relative bg-white shadow shadow-slate-100 p-2 rounded-lg min-h-[320px] z-50 max-h-[425px]">
        {searchParam && fetching && <Loader />}
        {searchParam && !fetching && results.length > 0 && (
          <div>
            {results.map((blog) => (
              <article
                className="flex items-center justify-between p-2 overflow-hidden rounded-lg bg-slate-100"
                key={blog.id}
              >
                <p className="">{blog.title}</p>
                <img
                  src={blog.thumbnail}
                  alt={`Thumbnail for blog titled: ${blog.title}`}
                  className="h-24 rounded-md aspect-square"
                />
              </article>
            ))}
          </div>
        )}
        {!searchParam && !fetching && results.length === 0 && (
          <div>No matching results.</div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ searchParam: state.common.searchParam });

export default connect(mapStateToProps)(SearchSection);
