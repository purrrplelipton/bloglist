import { Edit, Share, Trash } from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import { HomeContext } from "@pages/home";
import services from "@services/";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./more-options.module.css";

const Options = ({ isOpen, toggle, blogId, authorId }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);
  const { homeDispatch } = useContext(HomeContext);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (user === authorId) setIsAuthor(true);
    else setIsAuthor(false);
  }, [user, authorId]);

  function handleBlogDeletion() {
    toggle(false);
    services.blog
      .delete(blogId)
      .then(() => {
        homeDispatch((prv) => ({
          ...prv,
          blogs: prv.blogs.filter((blog) => blog.id !== blogId),
        }));
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

  const options = {
    general: [
      {
        id: uuidv4(),
        clickFunc: function () {},
        icon: <Share />,
        label: "Share",
      },
    ],
    protected: [
      {
        id: uuidv4(),
        clickFunc: function () {},
        icon: <Edit />,
        label: "Edit",
      },
      {
        id: uuidv4(),
        clickFunc: handleBlogDeletion,
        icon: <Trash />,
        label: "Delete",
      },
    ],
  };
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
            {options.general.map(({ id, clickFunc, icon, label }) => (
              <button
                key={id}
                role="option"
                className={styles.option}
                type="button"
                onClick={clickFunc}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
            {isAuthor &&
              options.protected.map(({ id, clickFunc, icon, label }) => (
                <button
                  key={id}
                  role="option"
                  className={styles.option}
                  type="button"
                  onClick={clickFunc}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Options.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  blogId: PropTypes.string.isRequired,
};

export default Options;
