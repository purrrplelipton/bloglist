import { Blog } from "@components/blog";
import { AppContext } from "@contexts/";
import { getBlogs } from "@services/blog.js";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./blogs.module.css";
import { Bottom } from "./bottom";
import { Top } from "./top";

const Blogs = () => {
  const { dispatch } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch(({ message }) =>
        dispatch((prv) => ({
          notifs: prv.notifs.concat({
            message,
            color: ["secondary", "info", "success", "warning", "error"][
              Math.floor(Math.random() * 5)
            ],
            id: uuidv4(),
          }),
        }))
      );
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
