import {
  IconDotsVertical,
  IconHeart,
  IconHeartFilled,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import Loader from "components/loader";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import blogsApi from "services/blogs";
import usersApi from "services/users";
import { appendNotification } from "store/reducers/global";
import { setBlogs } from "store/reducers/home";
import { setUserInfo } from "store/reducers/user";
import Options from "./more-options";

const Blog = (props) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [workingFavoritism, setWorkingFavoritism] = useState(false);
  const [workingLike, setWorkingLike] = useState(false);
  const [workingDislike, setWorkingDislike] = useState(false);
  const { user: userID, userDetails, ...rest } = props;
  const { favorites } = userDetails;
  const { likes: blogLikes, id: blogID, dislikes: blogDislikes } = rest.blog;

  async function handleFaveToggle() {
    if (workingFavoritism) {
      dispatch(
        appendNotification({
          message: "A process is still ongoing...",
          color: "warning",
        })
      );
      return;
    }
    setWorkingFavoritism(true);
    try {
      const updatedUser = await usersApi.patch({
        favorites: favorites.includes(blogID)
          ? favorites.filter((blog$ID) => blog$ID !== blogID)
          : [...favorites, blogID],
      });
      dispatch(setUserInfo(updatedUser));
      dispatch(
        appendNotification({
          message: updatedUser.favorites.includes(blogID)
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
    setWorkingFavoritism(false);
  }

  async function handleLikeToggle() {
    if (workingLike || workingDislike) {
      dispatch(
        appendNotification({
          message: "A process is still ongoing...",
          color: "warning",
        })
      );
      return;
    }
    setWorkingLike(true);
    if (blogLikes.includes(userID)) {
      try {
        const updatedBlog = await blogsApi.patch(blogID, {
          likes: blogLikes.filter((like) => like !== userID),
        });
        dispatch(
          setBlogs(
            rest.blogs.map((blog) => (blog.id === blogID ? updatedBlog : blog))
          )
        );
      } catch (error) {
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
          })
        );
      }
      setWorkingLike(false);
    } else {
      const updatedProps = { likes: [...blogLikes, userID] };
      if (blogDislikes.includes(userID))
        updatedProps.dislikes = blogDislikes.filter(
          (dislike) => dislike !== userID
        );
      try {
        const updatedBlog = await blogsApi.patch(blogID, updatedProps);
        dispatch(
          setBlogs(
            rest.blogs.map((blog) => (blog.id === blogID ? updatedBlog : blog))
          )
        );
      } catch (error) {
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
          })
        );
      }
      setWorkingLike(false);
    }
  }

  async function handleDislikeToggle() {
    if (workingLike || workingDislike) {
      dispatch(
        appendNotification({
          message: "A process is still ongoing...",
          color: "warning",
        })
      );
      return;
    }
    setWorkingDislike(true);
    if (blogDislikes.includes(userID)) {
      try {
        const updatedBlog = await blogsApi.patch(blogID, {
          dislikes: blogDislikes.filter((dislike) => dislike !== user),
        });
        dispatch(
          setBlogs(
            rest.blogs.map((blog) => (blog.id === blogID ? updatedBlog : blog))
          )
        );
      } catch (error) {
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
          })
        );
      }
      setWorkingDislike(false);
    } else {
      const updatedProps = { dislikes: [...blogDislikes, userID] };
      if (blogLikes.includes(userID)) {
        updatedProps.likes = blogLikes.filter((id) => id !== userID);
      }
      try {
        const updatedBlog = await blogsApi.patch(blogID, updatedProps);
        dispatch(
          setBlogs(
            rest.blogs.map((blog) => (blog.id === blogID ? updatedBlog : blog))
          )
        );
      } catch (error) {
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
          })
        );
      }
      setWorkingDislike(false);
    }
  }

  return (
    <article
      className={`relative first:mt-24 mb-3 bg-white text-slate-900 rounded-lg border-2 border-slate-100 p-2 blog-${blogID}`}
    >
      <p className="p-1 mb-2 rounded-md bg-slate-50">{rest.blog.title}</p>
      <div className="absolute top-0 right-0 z-50 translate-x-1/4 -translate-y-1/4">
        <div className="relative">
          <button
            type="button"
            aria-label="Show more options"
            onClick={() => setShowOptions((prv) => !prv)}
            className={`p-1 text-white rounded-full bg-android-green ${
              showOptions ? "bg-opacity-100" : "bg-opacity-70"
            }`}
          >
            <IconDotsVertical size={20} />
          </button>
          <Options
            isOpen={showOptions}
            toggle={setShowOptions}
            blogId={blogID}
            authorId={rest.blog.author}
          />
        </div>
      </div>
      <div className="bg-slate-50 w-full relative my-2 rounded-lg overflow-hidden pb-[calc((3/4)*100%)]">
        <img
          className="absolute top-0 left-0 object-cover object-center w-full h-full"
          src={rest.blog.thumbnail}
          alt={`thumbnail for blog titled: ${rest.blog.title}`}
        />
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleFaveToggle}
          aria-label={
            favorites.includes(blogID)
              ? "Remove from favorites"
              : "Add to favoriites"
          }
          className="relative p-1 rounded-full"
        >
          {favorites.includes(blogID) && !workingFavoritism && (
            <IconHeartFilled className="text-sheer-apricot" />
          )}
          {!favorites.includes(blogID) && !workingFavoritism && (
            <IconHeart className="text-slate-300" />
          )}
          {workingFavoritism && <Loader width={22} />}
          {workingFavoritism && <i className="block w-6 aspect-square" />}
        </button>
        <div className="ml-auto">
          <button
            type="button"
            aria-label={blogLikes.includes(userID) ? "Unlike" : "Like"}
            aria-disabled={workingLike || workingDislike}
            onClick={handleLikeToggle}
            className="relative p-1 rounded-full"
          >
            {blogLikes.includes(userID) && !workingLike && (
              <IconThumbUpFilled className="text-blue-400" />
            )}
            {!blogLikes.includes(userID) && !workingLike && (
              <IconThumbUp className="text-slate-300" />
            )}
            {workingLike && <Loader width={22} />}
            {workingLike && <i className="block w-6 aspect-square" />}
          </button>
          <button
            type="button"
            aria-label={
              blogDislikes.includes(userID) ? "Remove dislike" : "Dislike"
            }
            aria-disabled={workingLike || workingDislike}
            onClick={handleDislikeToggle}
            className="relative p-1 ml-2 rounded-full"
          >
            {blogDislikes.includes(userID) && !workingDislike && (
              <IconThumbDownFilled className="text-red-400" />
            )}
            {!blogDislikes.includes(userID) && !workingDislike && (
              <IconThumbDown className="text-slate-300" />
            )}
            {workingDislike && <Loader width={22} />}
            {workingDislike && <i className="block w-6 aspect-square" />}
          </button>
        </div>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  user: state.global.user,
  userDetails: state.user,
  blogs: state.home.blogs,
});

export default connect(mapStateToProps)(Blog);
