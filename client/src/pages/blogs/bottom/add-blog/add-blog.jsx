import { Photo } from "@assets/vectors/tabler-icons";
import { Input } from "@components/input";
import { Modal } from "@components/modal";
import { Spinner } from "@components/spinner";
import { addBlog } from "@services/blog.js";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./add-blog.module.css";

const AddBlog = ({ isOpen, setIsOpen }) => {
  const [blog, setBlog] = useState({ title: "", content: "", thumbnail: null });
  const [uploading, setUploading] = useState(false);

  async function uploadBlog(event) {
    event.preventDefault();
    setUploading(true);

    try {
      await addBlog(blog);
      setBlog((prv) => ({ ...prv, title: "", content: "", thumbnail: null }));
    } catch ({ message }) {
      console.error(message);
    }

    setUploading(false);
  }

  function handleThumbnailChange(event) {
    const file = event.target.files[0],
      reader = new FileReader();

    reader.onload = (evt) =>
      setBlog((prv) => ({ ...prv, thumbnail: evt.target.result }));

    reader.readAsDataURL(file);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className={styles.formWrapper}>
        <form
          action="/upload-blog"
          method="POST"
          onSubmit={uploadBlog}
          className={styles.createForm}
        >
          <div className={styles.fieldWrapper}>
            <Input
              label="Title"
              placeholder="title"
              onInput={(value) =>
                setBlog((prv) => ({
                  ...prv,
                  title: DOMPurify.sanitize(value),
                }))
              }
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
                setBlog((prv) => ({
                  ...prv,
                  content: DOMPurify.sanitize(value),
                }))
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
            disabled={
              !Object.values(blog).every((val) => Boolean(val)) || uploading
            }
            aria-label="upload blog"
          >
            {uploading ? <Spinner width={18} /> : "upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

AddBlog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddBlog;
