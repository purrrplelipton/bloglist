import {
  Heart,
  HeartFilled,
  ThumbDown,
  ThumbDownFilled,
  ThumbUp,
  ThumbUpFilled,
} from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import { HomeContext } from "@pages/home/home";
import { updateBlog } from "@services/blog.js";
import { updateUser } from "@services/user.js";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog.module.css";

const Blog = ({ blog }) => {
  let userId = null;
  const bloggerzon = localStorage.getItem("bloggerzon");
  if (bloggerzon) userId = JSON.parse(bloggerzon).id;

  const { dispatch } = useContext(AppContext);
  const { homeStates, homeDispatch } = useContext(HomeContext);

  async function handleFaveToggle() {
    try {
      const { favorites } = await updateUser({
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
    if (blog.likes.includes(userId)) {
      updateBlog(blog.id, {
        userId,
        updatedProps: { likes: blog.likes.filter((like) => like !== userId) },
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
      const updatedProps = { likes: [...blog.likes, userId] };
      if (blog.dislikes.includes(userId))
        updatedProps.dislikes = blog.dislikes.filter((id) => id !== userId);
      updateBlog(blog.id, {
        userId,
        updatedProps,
      })
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
    if (blog.dislikes.includes(userId)) {
      try {
        const { dislikes } = await updateBlog(blog.id, {
          userId,
          updatedProps: {
            dislikes: blog.dislikes.filter((dislike) => dislike !== userId),
          },
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
      const updatedProps = { dislikes: [...blog.dislikes, userId] };
      if (blog.likes.includes(userId))
        updatedProps.likes = blog.likes.filter((id) => id !== userId);
      updateBlog(blog.id, {
        userId,
        updatedProps,
      })
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
            aria-label={blog.likes.includes(userId) ? "Unlike" : "Like"}
            onClick={handleLikeToggle}
          >
            {blog.likes.includes(userId) ? <ThumbUpFilled /> : <ThumbUp />}
          </button>
          <button
            type="button"
            aria-label={
              blog.dislikes.includes(userId) ? "Remove dislike" : "Disike"
            }
            onClick={handleDislikeToggle}
          >
            {blog.dislikes.includes(userId) ? (
              <ThumbDownFilled />
            ) : (
              <ThumbDown />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

Blog.propTypes = { blog: PropTypes.object.isRequired };

export default Blog;
