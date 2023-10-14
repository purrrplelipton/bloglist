import { IconEdit, IconShare, IconTrash } from "@tabler/icons-react";
import { bool, func, string } from "prop-types";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import blogsApi from "services/blogs";
import { appendNotification } from "store/reducers/global";
import { setBlogs } from "store/reducers/home";
import { v4 } from "uuid";

const Options = (props) => {
  const { isOpen, toggle, blogId, authorId, ...rest } = props;
  const dispatch = useDispatch();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (rest.user === authorId) return setIsAuthor(true);
    setIsAuthor(false);
  }, [rest.user, authorId]);

  async function handleBlogDeletion() {
    toggle(false);
    try {
      await blogsApi.delete(blogId);
      dispatch(setBlogs(rest.blogs.filter((blog) => blog.id !== blogId)));
      dispatch(
        appendNotification({
          message: "Blog has been deleted.",
          color: "warning",
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

  const options = {
    general: [
      {
        clicked: () => {},
        icon: <IconShare size={20} />,
        label: "Share",
      },
    ],
    protected: [
      {
        clicked: () => {},
        icon: <IconEdit size={20} />,
        label: "Edit",
      },
      {
        clicked: handleBlogDeletion,
        icon: <IconTrash size={20} />,
        label: "Delete",
      },
    ],
  };

  return (
    isOpen && (
      <div
        className="absolute z-50 min-w-fit top-full right-1/2 translate-y-1 bg-stable-hay rounded-lg py-2 flex flex-col items-stretch text-sm"
        role="combobox"
      >
        {options.general.map(({ clicked, icon, label }) => (
          <button
            key={v4()}
            role="option"
            className="py-[2px] px-[6px] flex items-center gap-1"
            type="button"
            onClick={clicked}
          >
            {icon}
            <span className="mr-2">{label}</span>
          </button>
        ))}
        {isAuthor &&
          options.protected.map(({ clicked, icon, label }) => (
            <button
              key={v4()}
              role="option"
              className="py-[2px] px-[6px] flex items-center gap-1"
              type="button"
              onClick={clicked}
            >
              {icon}
              <span className="mr-2">{label}</span>
            </button>
          ))}
      </div>
    )
  );
};

Options.propTypes = {
  isOpen: bool.isRequired,
  toggle: func.isRequired,
  authorId: string.isRequired,
  blogId: string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.global.user,
  blogs: state.home.blogs,
});

export default connect(mapStateToProps)(Options);
