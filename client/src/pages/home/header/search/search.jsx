import Loader from "@components/loader";
import { useContext } from "react";
import { connect } from "react-redux";
import { HeaderContext } from "..";

const SearchSection = ({ searchParam }) => {
  const {
    headerStates: { fetching, results },
  } = useContext(HeaderContext);

  return (
    <section className="fixed top-24 right-3 left-3 shadow shadow-slate-100 p-2 rounded-lg min-h-[280px] z-50 max-h-[375px]">
      {searchParam && fetching && <Loader />}
      {searchParam && !fetching && results.length > 0 && (
        <div>
          {results.map((blog) => (
            <article
              className="flex items-center justify-between rounded-lg p-2 overflow-hidden bg-slate-200"
              key={blog.id}
            >
              <p className="">{blog.title}</p>
              <img
                src={blog.thumbnail}
                alt={`Thumbnail for blog titled: ${blog.title}`}
                className="h-24 aspect-square rounded-md"
              />
            </article>
          ))}
        </div>
      )}
      {!searchParam && !fetching && results.length === 0 && (
        <div>No matching results.</div>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({ searchParam: state.common.searchParam });

export default connect(mapStateToProps)(SearchSection);
