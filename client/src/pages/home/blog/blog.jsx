import {
  IconThumbDownFilled,
  IconThumbDown,
  IconThumbUp,
  IconThumbUpFilled,
  IconHeart,
  IconHeartFilled,
  IconDotsVertical,
} from "@tabler/icons-react";
import { HomeContext } from "@pages/home";
import blogsApi from "@services/blogs";
import usersApi from "@services/users";
import { appendNotification } from "@store/reducers/global";
import { shape } from "prop-types";
import { useContext, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog.module.css";
import { Options } from "./more-options";
import { removeFromFavorites, addToFavorites } from "@store/reducers/user";

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch();
  const { favorites } = user;
  const [showOptions, setShowOptions] = useState(false);

  async function handleFaveToggle() {
    try {
      const { favorites: newFavorites } = await usersApi.patch({
        favorites: favorites.includes(blog.id)
          ? favorites.filter((blogID) => blogID !== blog.id)
          : [...favorites, blog.id],
      });
      dispatch(setUserInfo({ ...user, favorites: newFavorites }));
      dispatch(
        appendNotification({
          message: favorites.includes(blog.id)
            ? "Blog added to favorites"
            : "Blog removed from favorites",
          color: "info",
          id: uuidv4(),
        })
      );
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
          id: uuidv4(),
        })
      );
    }
  }

  function handleLikeToggle() {
    if (blog.likes.includes(user)) {
      blogsApi
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
        .catch((error) =>
          dispatch(
            appendNotification({
              message,
              color: "error",
              id: uuidv4(),
            })
          )
        );
    } else {
      const updatedProps = { likes: [...blog.likes, user] };
      if (blog.dislikes.includes(user))
        updatedProps.dislikes = blog.dislikes.filter((id) => id !== user);
      blogsApi
        .patch(blog.id, updatedProps)
        .then(({ likes, dislikes }) =>
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { ...prvBlog, likes, dislikes } : prvBlog
            ),
          }))
        )
        .catch((error) =>
          dispatch(
            appendNotification({
              message: error.message,
              color: "error",
              id: uuidv4(),
            })
          )
        );
    }
  }

  async function handleDislikeToggle() {
    if (blog.dislikes.includes(user)) {
      try {
        const { dislikes } = await blogsApi.patch(blog.id, {
          dislikes: blog.dislikes.filter((dislike) => dislike !== user),
        });
        homeDispatch((prv) => ({
          ...prv,
          blogs: prv.blogs.map((prvBlog) =>
            prvBlog.id === blog.id ? { ...prvBlog, dislikes } : prvBlog
          ),
        }));
      } catch (error) {
        dispatch(
          appendNotification({
            message,
            color: "error",
            id: uuidv4(),
          })
        );
      }
    } else {
      const updatedProps = { dislikes: [...blog.dislikes, user] };
      if (blog.likes.includes(user))
        updatedProps.likes = blog.likes.filter((id) => id !== user);
      blogsApi
        .patch(blog.id, updatedProps)
        .then(({ likes, dislikes }) =>
          homeDispatch((prv) => ({
            ...prv,
            blogs: prv.blogs.map((prvBlog) =>
              prvBlog.id === blog.id ? { ...prvBlog, likes, dislikes } : prvBlog
            ),
          }))
        )
        .catch((error) =>
          dispatch(
            appendNotification({
              message: error.message,
              color: "error",
              id: uuidv4(),
            })
          )
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
              favorites.includes(blog.id)
                ? "remove from favorites"
                : "add to favoriites"
            }
            onClick={handleFaveToggle}
            type="button"
          >
            {favorites.includes(blog.id) ? <IconHeartFilled /> : <IconHeart />}
          </button>
        </div>
        <div className={styles.moreOptionsWrapper}>
          <button
            type="button"
            aria-label="Show more options"
            onClick={() => setShowOptions((prv) => !prv)}
            className={styles.moreOptionsToggle}
          >
            <IconDotsVertical />
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
            {blog.likes.includes(user) ? (
              <IconThumbUpFilled />
            ) : (
              <IconThumbUp />
            )}
          </button>
          <button
            type="button"
            aria-label={
              blog.dislikes.includes(user) ? "Remove dislike" : "Disike"
            }
            onClick={handleDislikeToggle}
          >
            {blog.dislikes.includes(user) ? (
              <IconThumbDownFilled />
            ) : (
              <IconThumbDown />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

Blog.propTypes = { blog: shape({}).isRequired };

const mapStateToProps = (state) => ({
  user: state.global.user,
  blogs: state.home.blogs,
});

export default connect(mapStateToProps)(Blog);
