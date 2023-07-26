import { Spinner } from "@components/spinner";
import { HomeContext } from "@pages/home";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { HeaderContext } from "..";
import styles from "./search.module.css";

const SearchSection = () => {
  const {
    homeStates: { searchQuery },
  } = useContext(HomeContext);
  const {
    headerStates: { fetching, queryResults },
  } = useContext(HeaderContext);

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {(searchQuery.trim() || fetching) && (
          <motion.section
            initial={{ oapcity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            className={styles.searchResultsSection}
          >
            {fetching ? (
              <Spinner width={32} />
            ) : queryResults.length ? (
              queryResults.map((blog) => (
                <article className={styles.fetchedBlog} key={blog.id}>
                  <p className={styles.blogTitle}>{blog.title}</p>
                  <img
                    src={blog.thumbnail}
                    alt={`Thumbnail for blog titled: ${blog.title}`}
                  />
                </article>
              ))
            ) : (
              <p>No matching results.</p>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchSection;
