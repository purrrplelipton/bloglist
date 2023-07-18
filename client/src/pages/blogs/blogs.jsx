import { Blog } from "@components/blog";
import { getBlogs } from "@services/blog.js";
import React, { useEffect, useState } from "react";
import styles from "./blogs.module.css";
import { Bottom } from "./bottom";
import { Top } from "./top";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch(({ message }) => console.error(message));
  }, []);

  return (
    <>
      <Top />
      <section className={styles.blogs} aria-live="polite">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </section>
      <Bottom isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Blogs;
