import Backdrop from "@components/backdrop";
import Loader from "@components/loader";
import blogsApi from "@services/blogs";
import { appendNotification } from "@store/reducers/global";
import { createBlog, setFormHidden } from "@store/reducers/home";
import { IconPhoto } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styles from "./blog-form.module.css";
import { Input } from "./input";

const BlogForm = ({ formVisible }) => {
  const dispatch = useDispatch();
  const [blog, setBlog] = useState({ title: "", content: "", thumbnail: null });
  const [uploading, setUploading] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();

  function uploadBlog(event) {
    event.preventDefault();
    setUploading(true);
    blogsApi
      .post(blog)
      .then(() => {
        createBlog(blog);
        dispatch(
          appendNotification({
            message: "Blog Uploaded",
            color: "success",
            id: uuidv4(),
          })
        );
        dispatch(setFormHidden());
        setBlog({});
      })
      .catch(({ message }) => {
        dispatch(
          appendNotification({
            message,
            color: "error",
            id: uuidv4(),
          })
        );
      });
    setUploading(false);
  }

  function handleThumbnailChange(event) {
    const file = event.target.files[0],
      reader = new FileReader();

    reader.onload = (evt) =>
      setBlog((prv) => ({ ...prv, thumbnail: evt.target.result }));

    return reader.readAsDataURL(file);
  }

  return (
    formVisible && (
      <>
        <Backdrop
          isOpen={formVisible}
          onClose={() => dispatch(setFormHidden())}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            encType="multipart/form-data"
            onSubmit={uploadBlog}
            className="w-full bg-white mt-auto rounded-tr-3xl rounded-tl-3xl p-6"
          >
            <input
              id="title"
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setBlog((prv) => ({ ...prv, title: e.target.value }))
              }
              className="block w-full bg-slate-50 outline-none"
            />
            <textarea
              id="content"
              cols="30"
              rows="10"
              placeholder="Content"
              onChange={(e) =>
                setBlog((prv) => ({ ...prv, content: e.target.value }))
              }
              className="block w-full resize-none bg-slate-50 outline-none my-3"
            />

            <div className={styles.chooseThumbnail}>
              <label htmlFor="blog-thumbnail">
                <IconPhoto />
                {blog.thumbnail ? "change" : "pick a"} thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                id="blog-thumbnail"
                onChange={handleThumbnailChange}
              />
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt="Thumbnail Preview"
                  className={styles.thumbnailPreview}
                />
              )}
            </div>
            <button
              type="submit"
              aria-disabled={
                !(blog.title.trim() && blog.content.trim()) || uploading
              }
              aria-label="upload blog"
            >
              {uploading ? <Loader width={18} /> : "upload"}
            </button>
          </form>
        </Backdrop>
      </>
    )
  );
};

const mapStateToProps = (state) => ({ formVisible: state.home.formVisible });

export default connect(mapStateToProps)(BlogForm);
