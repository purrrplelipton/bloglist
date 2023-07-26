import { Trash } from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { deleteBlog } from "../../../../services/blog";
import styles from "./more-options.module.css";

const Options = ({ isOpen, blogId, authorId }) => {
  const { dispatch } = useContext(AppContext);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const bloggerzon = localStorage.getItem("bloggerzon");
    if (bloggerzon) {
      const { id } = JSON.parse(bloggerzon);
      if (id === authorId) setIsAuthor(true);
    } else {
      const navigate = useNavigate();
      localStorage.removeItem("bloggerzon");
      navigate("/", { replace: true });
    }
  }, []);

  function handleBlogDeletion() {
    deleteBlog(blogId)
      .then((response) => {
        console.log(response);
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({
            message: "Blog has been deleted.",
            color: "error",
            id: uuidv4(),
          }),
        }));
      })
      .catch(({ message }) =>
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({
            message,
            color: "error",
            id: uuidv4(),
          }),
        }))
      );
  }

  const optionsVariants = {
    initial: { opacity: 0, scale: 1.5, pointerEvents: "none" },
    visible: { opacity: 1, scale: 1, pointerEvents: "auto" },
    exit: { opacity: 0, scale: 0.5, pointerEvents: "none" },
  };

  return (
    <>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => {}}>
        {isOpen && (
          <motion.div
            variants={optionsVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            className={styles.optionsWrapper}
            role="combobox"
          >
            {isAuthor && (
              <button
                role="option"
                className={styles.option}
                type="button"
                onClick={() => handleBlogDeletion()}
              >
                <Trash />
                <span>Delete blog</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Options.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  authorId: PropTypes.string,
  blogId: PropTypes.string.isRequired,
};

export default Options;
