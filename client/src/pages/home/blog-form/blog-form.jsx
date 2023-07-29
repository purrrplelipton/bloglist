import { Photo } from "@assets/vectors/tabler-icons";
import { Backdrop } from "@components/backdrop";
import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import services from "@services/";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { HomeContext } from "../";
import styles from "./blog-form.module.css";
import { Input } from "./input";

const defaultBlog = { title: "", content: "", thumbnail: null };

const BlogForm = () => {
  const { dispatch } = useContext(AppContext);
  const {
    homeStates: { formIsOpen },
    homeDispatch,
  } = useContext(HomeContext);
  const [blog, setBlog] = useState(defaultBlog);
  const [uploading, setUploading] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();

  function closeForm() {
    return homeDispatch((prv) => ({ ...prv, formIsOpen: false }));
  }

  function uploadBlog(event) {
    event.preventDefault();
    setUploading(true);

    return services.blog
      .post(blog)
      .then((savedBlog) => {
        console.log(savedBlog);
        homeDispatch((prv) => ({ ...prv, blogs: [savedBlog, ...prv.blogs] }));
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
        homeDispatch((prv) => ({ ...prv, formIsOpen: false }));
      });
  }

  function handleThumbnailChange(event) {
    const file = event.target.files[0],
      reader = new FileReader();

    reader.onload = (evt) =>
      setBlog((prv) => ({ ...prv, thumbnail: evt.target.result }));

    return reader.readAsDataURL(file);
  }

  const blogFormVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
    },
    exit: {
      y: "100%",
      opacity: 0,
    },
  };

  return (
    <Backdrop isOpen={formIsOpen} onClose={closeForm}>
      <motion.div
        className={styles.formWrapper}
        variants={blogFormVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          action="/upload-blog"
          method="POST"
          encType="multipart/form-data"
          onSubmit={uploadBlog}
          className={styles.createForm}
        >
          <div className={styles.fieldWrapper}>
            <Input
              ref={titleRef}
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
              ref={contentRef}
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
      </motion.div>
    </Backdrop>
  );
};

export default BlogForm;
