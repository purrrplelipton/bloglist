import { Photo } from "@assets/vectors/tabler-icons";
import { Input } from "@components/input";
import { Modal } from "@components/modal";
import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import { addBlog } from "@services/blog.js";
import DOMPurify from "dompurify";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HomeContext } from "../home";
import styles from "./blog-form.module.css";

const defaultBlog = { title: "", content: "", thumbnail: null };

const BlogForm = () => {
  const { dispatch } = useContext(AppContext);
  const {
    homeStates: { formIsOpen },
    homeDispatch,
  } = useContext(HomeContext);
  const [blog, setBlog] = useState(defaultBlog);
  const [uploading, setUploading] = useState(false);

  function closeForm() {
    homeDispatch((prv) => ({ ...prv, formIsOpen: false }));
  }

  function uploadBlog(event) {
    event.preventDefault();
    setUploading(true);

    addBlog(blog)
      .then((savedBlog) => {
        homeDispatch((prv) => ({ ...prv, blogs: [...prv.blogs, savedBlog] }));
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({
            message: "Blog Uploaded",
            color: "success",
            id: uuidv4(),
          }),
        }));
      })
      .catch(({ message }) =>
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({ message, color: "error", id: uuidv4() }),
        }))
      )
      .finally(() => {
        setUploading(false);
        setBlog(defaultBlog);
      });
  }

  function handleThumbnailChange(event) {
    const file = event.target.files[0],
      reader = new FileReader();

    reader.onload = (evt) =>
      setBlog((prv) => ({ ...prv, thumbnail: evt.target.result }));

    reader.readAsDataURL(file);
  }

  return (
    <Modal isOpen={formIsOpen} onClose={closeForm}>
      <div className={styles.formWrapper}>
        <form
          action="/upload-blog"
          method="POST"
          encType="multipart/form-data"
          onSubmit={uploadBlog}
          className={styles.createForm}
        >
          <div className={styles.fieldWrapper}>
            <Input
              label="Title"
              placeholder="title"
              onInput={(value) => setBlog((prv) => ({ ...prv, title: value }))}
              value={DOMPurify.sanitize(blog.title)}
            />
          </div>
          <div
            className={[styles.fieldWrapper, styles.contentWrapper].join(" ")}
          >
            <Input
              label="Content"
              placeholder="content"
              onInput={(value) =>
                setBlog((prv) => ({ ...prv, content: value }))
              }
              value={DOMPurify.sanitize(blog.content)}
            />
          </div>
          <div className={styles.chooseThumbnail}>
            <label htmlFor="blog-thumbnail">
              <Photo />
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
            disabled={!(blog.title.trim() && blog.content.trim()) || uploading}
            aria-label="upload blog"
          >
            {uploading ? <Spinner width={18} /> : "upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default BlogForm;
