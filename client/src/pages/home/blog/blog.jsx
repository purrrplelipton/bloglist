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
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog.module.css";

const Blog = ({ blog }) => {
  const { dispatch } = useContext(AppContext);
  const {
    homeStates: { faves },
    homeDispatch,
  } = useContext(HomeContext);
  const [blogStates, setBlogStates] = useState({
    isAFave: faves.includes(blog.id),
    isLiked: false,
    isDisliked: false,
  });

  useEffect(() => {
    const bloggerzon = localStorage.getItem("bloglist");
    if (bloggerzon) {
      const { id } = JSON.parse(bloggerzon);
      if (blog.likes.includes(id))
        setBlogStates((prv) => ({ ...prv, isLiked: true }));
      else if (blog.dislikes.includes(id))
        setBlogStates((prv) => ({ ...prv, isDisliked: true }));
    }
  }, [blogStates.isLiked, blogStates.isDisliked, setBlogStates]);

  async function handleFaveToggle() {
    try {
      const { favorites } = await updateUser({
        favorites: blogStates.isAFave
          ? faves.filter((id) => id !== blog.id)
          : [...faves, blog.id],
      });
      homeDispatch((prv) => ({ ...prv, faves: favorites }));
      setBlogStates((prv) => ({ ...prv, isAFave: !prv.isAFave }));
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

  async function handleLikeToggle() {
    const bloggerzon = localStorage.getItem("bloglist");
    if (bloggerzon) {
      const { id } = JSON.parse(bloggerzon);
      if (blogStates.isLiked) {
        try {
          const { likes } = await updateBlog(blog.id, {
            userId: id,
            updatedProps: { likes: blog.likes.filter((like) => like !== id) },
          });
          setBlogStates((prv) => ({ ...prv, isLiked: likes.includes(id) }));
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { ...prvBlog, likes } : prvBlog
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
        try {
          const { likes } = await updateBlog(blog.id, {
            userId: id,
            updatedProps: { likes: [...blog.likes, id] },
          });
          setBlogStates((prv) => ({ ...prv, likes: likes.includes(id) }));
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { ...prvBlog, likes } : prvBlog
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
      }
    }
  }

  async function handleDislikeToggle() {
    const bloggerzon = localStorage.getItem("bloglist");
    console.log(bloggerzon);
    if (bloggerzon) {
      const { id } = JSON.parse(bloggerzon);
      console.log(id);
      if (blogStates.isDisliked) {
        try {
          const { dislikes } = await updateBlog(blog.id, {
            userId: id,
            updatedProps: {
              dislikes: blog.dislikes.filter((dislike) => dislike !== id),
            },
          });
          setBlogStates((prv) => ({
            ...prv,
            isDisliked: dislikes.includes(id),
          }));
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
        try {
          const { dislikes } = updateBlog(blog.id, {
            userId: id,
            updatedProps: { dislikes: [...blog.dislikes, id] },
          });
          setBlogStates((prv) => ({
            ...prv,
            dislikes: dislikes.includes(id),
          }));
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
      }
    }
  }

  return (
    <article className={`${styles.blog} blog-${blog.id}`}>
      <p className={styles.blogTitle}>{blog.title}</p>
      <div className={styles.blogDoohickeys}>
        <div className={styles.faveToggleBtn}>
          <button
            aria-label={
              blogStates.isAFave ? "remove from favorites" : "add to favoriites"
            }
            onClick={handleFaveToggle}
          >
            {blogStates.isAFave ? <HeartFilled /> : <Heart />}
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
            aria-label={blogStates.isLiked ? "Remove like" : "Like"}
            onClick={handleLikeToggle}
          >
            {blogStates.isLiked ? <ThumbUpFilled /> : <ThumbUp />}
          </button>
          <button
            type="button"
            aria-label={blogStates.isDisliked ? "Remove dislike" : "Disike"}
            onClick={handleDislikeToggle}
          >
            {blogStates.isDisliked ? <ThumbDownFilled /> : <ThumbDown />}
          </button>
        </div>
      </div>
    </article>
  );
};

Blog.propTypes = { blog: PropTypes.object.isRequired };

export default Blog;
