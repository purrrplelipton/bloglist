import { Edit, Share, Trash } from "@assets/vectors/tabler-icons";
import { HomeContext } from "@pages/home";
import blogsApi from "@services/blogs";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./more-options.module.css";

const Options = ({ user, isOpen, toggle, blogId, authorId }) => {
  const dispatch = useDispatch();
  const { homeDispatch } = useContext(HomeContext);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (user === authorId) setIsAuthor(true);
    else setIsAuthor(false);
  }, [user, authorId]);

  function handleBlogDeletion() {
    toggle(false);
    blogsApi
      .delete(blogId)
      .then(() => {
        homeDispatch((prv) => ({
          ...prv,
          blogs: prv.blogs.filter((blog) => blog.id !== blogId),
        }));
        dispatch(
          appendNotification({
            message: "Blog has been deleted.",
            color: "error",
            id: uuidv4(),
          })
        );
      })
      .catch(({ message }) =>
        dispatch(
          appendNotification({
            message,
            color: "error",
            id: uuidv4(),
          })
        )
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

  return (
    isOpen && (
      <div className={styles.optionsWrapper} role="combobox">
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
      </div>
    )
  );
};

Options.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  blogId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ user: state.global.user });

export default connect(mapStateToProps)(Options);
