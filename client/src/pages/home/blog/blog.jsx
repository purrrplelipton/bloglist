import { Heart, HeartFilled } from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import { HomeContext } from "@pages/home";
import { updateUser } from "@services/user.js";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog.module.css";

const Blog = ({ blog }) => {
  const { dispatch } = useContext(AppContext);
  const {
    homeStates: { faves },
    homeDispatch,
  } = useContext(HomeContext);
  const [blogIsAFave, setBlogIsAFave] = useState(faves.includes(blog.id));

  function handleFaveToggle(id) {
    updateUser({
      favorites: blogIsAFave ? faves.filter((id) => id !== id) : [...faves, id],
    })
      .then(({ favorites }) => {
        homeDispatch((prv) => ({ ...prv, faves: favorites }));
        setBlogIsAFave((prv) => !prv);
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({
            message: favorites.includes(id)
              ? "Blog added to favorites"
              : "Blog removed from favorites",
            color: "info",
            id: uuidv4(),
          }),
        }));
      })
      .catch(({ message }) =>
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({ message, color: "error", id: uuidv4() }),
        }))
      );
  }

  return (
    <article className={`${styles.blog} blog-${blog.id}`}>
      <div className={styles.faveToggleBtn}>
        <button
          aria-label={
            blogIsAFave ? "remove from favorites" : "add to favoriites"
          }
          onClick={() => handleFaveToggle(blog.id)}
        >
          {blogIsAFave ? <HeartFilled /> : <Heart />}
        </button>
      </div>
      {blog.thumbnail && (
        <img
          className={styles.blogThumbnail}
          src={blog.thumbnail}
          alt={`thumbnail for blog titled: ${blog.title}`}
        />
      )}
      <p className={styles.blogTitle}>{blog.title}</p>
    </article>
  );
};

Blog.propTypes = { blog: PropTypes.object.isRequired };

export default Blog;
