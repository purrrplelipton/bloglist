import {
  DotsVertical,
  Heart,
  HeartFilled,
  ThumbDown,
  ThumbDownFilled,
  ThumbUp,
  ThumbUpFilled,
} from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import { HomeContext } from "@pages/home";
import services from "@services/";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog.module.css";
import { Options } from "./more-options";

const Blog = ({ blog }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);
  const { homeStates, homeDispatch } = useContext(HomeContext);
  const [showOptions, setShowOptions] = useState(false);

  async function handleFaveToggle() {
    try {
      const { favorites } = await services.user.patch({
        favorites: homeStates.faves.includes(blog.id)
          ? homeStates.faves.filter((blogId) => blogId !== blog.id)
          : [...homeStates.faves, blog.id],
      });
      homeDispatch((prv) => ({ ...prv, faves: favorites }));
      dispatch((prv) => ({
        ...prv,
        notifs: prv.notifs.concat({
          message: favorites.includes(blog.id)
            ? "Blog added to favorites"
            : "Blog removed from favorites",
          color: "info",
          id: uuidv4(),
        }),
      }));
    } catch ({ message }) {
      dispatch((prv) => ({
        ...prv,
        notifs: prv.notifs.concat({ message, color: "error", id: uuidv4() }),
      }));
    }
  }

  function handleLikeToggle() {
    if (blog.likes.includes(user)) {
      services.blog
        .patch(blog.id, {
          likes: blog.likes.filter((like) => like !== user),
        })
        .then(({ likes }) =>
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { prvBlog, likes } : prvBlog
            ),
          }))
        )
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
    } else {
      const updatedProps = { likes: [...blog.likes, user] };
      if (blog.dislikes.includes(user))
        updatedProps.dislikes = blog.dislikes.filter((id) => id !== user);
      services.blog
        .patch(blog.id, updatedProps)
        .then(({ likes, dislikes }) =>
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { ...prvBlog, likes, dislikes } : prvBlog
            ),
          }))
        )
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
  }

  async function handleDislikeToggle() {
    if (blog.dislikes.includes(user)) {
      try {
        const { dislikes } = await services.blog.patch(blog.id, {
          dislikes: blog.dislikes.filter((dislike) => dislike !== user),
        });
        homeDispatch((prv) => ({
          ...prv,
          blogs: prv.blogs.map((prvBlog) =>
            prvBlog.id === blog.id ? { ...prvBlog, dislikes } : prvBlog
          ),
        }));
      } catch ({ message }) {
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({
            message,
            color: "error",
            id: uuidv4(),
          }),
        }));
      }
    } else {
      const updatedProps = { dislikes: [...blog.dislikes, user] };
      if (blog.likes.includes(user))
        updatedProps.likes = blog.likes.filter((id) => id !== user);
      services.blog
        .patch(blog.id, updatedProps)
        .then(({ likes, dislikes }) =>
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { ...prvBlog, likes, dislikes } : prvBlog
            ),
          }))
        )
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
  }

  return (
    <article className={`${styles.blog} blog-${blog.id}`}>
      <p className={styles.blogTitle}>{blog.title}</p>
      <div className={styles.blogDoohickeys}>
        <div className={styles.faveToggleBtn}>
          <button
            aria-label={
              homeStates.faves.includes(blog.id)
                ? "remove from favorites"
                : "add to favoriites"
            }
            onClick={handleFaveToggle}
            type="button"
          >
            {homeStates.faves.includes(blog.id) ? <HeartFilled /> : <Heart />}
          </button>
        </div>
        <div className={styles.moreOptionsWrapper}>
          <button
            type="button"
            aria-label="Show more options"
            onClick={() => setShowOptions((prv) => !prv)}
            className={styles.moreOptionsToggle}
          >
            <DotsVertical />
          </button>
          <Options
            isOpen={showOptions}
            toggle={setShowOptions}
            blogId={blog.id}
            authorId={blog.author.id || blog.author}
          />
        </div>
        {blog.thumbnail && (
          <img
            className={styles.blogThumbnail}
            src={blog.thumbnail}
            alt={`thumbnail for blog titled: ${blog.title}`}
          />
        )}
        <div className={styles.btnWrapper}>
          <button
            type="button"
            aria-label={blog.likes.includes(user) ? "Unlike" : "Like"}
            onClick={handleLikeToggle}
          >
            {blog.likes.includes(user) ? <ThumbUpFilled /> : <ThumbUp />}
          </button>
          <button
            type="button"
            aria-label={
              blog.dislikes.includes(user) ? "Remove dislike" : "Disike"
            }
            onClick={handleDislikeToggle}
          >
            {blog.dislikes.includes(user) ? <ThumbDownFilled /> : <ThumbDown />}
          </button>
        </div>
      </div>
    </article>
  );
};

Blog.propTypes = { blog: PropTypes.object.isRequired };

export default Blog;
