import blogsApi from "@services/blogs";
import usersApi from "@services/users";
import { appendNotification } from "@store/reducers/global";
import { addToFavorites, removeFromFavorites } from "@store/reducers/user";
import {
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { shape } from "prop-types";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Options } from "./more-options";

const Blog = ({ user, userDetails, blog }) => {
  const { favorites } = userDetails;
  const dispatch = useDispatch();
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
        })
      );
    } catch (error) {
      dispatch(
        appendNotification({
          message: error.message,
          color: "error",
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
            })
          )
        );
    }
  }

  return (
    <article
      className={`relative first:mt-24 mb-3 bg-white text-slate-900 rounded-lg border-2 border-slate-100 p-2 blog-${blog.id}`}
    >
      <p className="p-1 mb-2 rounded-md bg-slate-50">{blog.title}</p>
      <>
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
          <div className="relative">
            <button
              type="button"
              aria-label="Show more options"
              onClick={() => setShowOptions((prv) => !prv)}
              className="p-1 text-white rounded-full bg-[#a4c83f]"
            >
              <IconDotsVertical size={20} />
            </button>
            <Options
              isOpen={showOptions}
              toggle={setShowOptions}
              blogId={blog.id}
              authorId={blog.author}
            />
          </div>
        </div>
        {blog.thumbnail && (
          <img
            className="my-2 rounded-lg"
            src={blog.thumbnail}
            alt={`thumbnail for blog titled: ${blog.title}`}
          />
        )}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleFaveToggle}
            aria-label={
              favorites.includes(blog.id)
                ? "Remove from favorites"
                : "Add to favoriites"
            }
            className="p-1 rounded-full"
          >
            {favorites.includes(blog.id) && (
              <IconHeartFilled className="text-red-400" />
            )}
            {!favorites.includes(blog.id) && <IconHeart />}
          </button>
          <div className="ml-auto">
            <button
              type="button"
              aria-label={blog.likes.includes(user) ? "Unlike" : "Like"}
              onClick={handleLikeToggle}
              className="p-1 rounded-full"
            >
              {blog.likes.includes(user) && <IconThumbUpFilled />}
              {!blog.likes.includes(user) && <IconThumbUp />}
            </button>
            <button
              type="button"
              aria-label={
                blog.dislikes.includes(user) ? "Remove dislike" : "Dislike"
              }
              onClick={handleDislikeToggle}
              className="p-1 ml-2 rounded-full"
            >
              {blog.dislikes.includes(user) && <IconThumbDownFilled />}
              {!blog.dislikes.includes(user) && <IconThumbDown />}
            </button>
          </div>
        </div>
      </>
    </article>
  );
};

Blog.propTypes = { blog: shape({}).isRequired };

const mapStateToProps = (state) => ({
  user: state.global.user,
  userDetails: state.user,
  blogs: state.home.blogs,
});

export default connect(mapStateToProps)(Blog);
