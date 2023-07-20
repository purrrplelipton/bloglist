import { Blog } from "@components/blog";
import { AppContext } from "@contexts/";
import { getBlogs } from "@services/blog.js";
import { getUser } from "@services/user.js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BlogForm } from "./blog-form";
import { Footer } from "./footer";
import { Header } from "./header";
import styles from "./home.module.css";

export const HomeContext = createContext(null);

const Home = () => {
  const { dispatch } = useContext(AppContext);
  const { id } = JSON.parse(localStorage.getItem("bloglist"));
  const [homeStates, homeDispatch] = useState({
    drawerIsOpen: false,
    searchQuery: "",
    blogs: [],
    faves: [],
    formIsOpen: false,
  });

  useEffect(() => {
    getBlogs()
      .then((data) => homeDispatch((prv) => ({ ...prv, blogs: data })))
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

  useEffect(() => {
    getUser(id)
      .then(({ favorites }) =>
        homeDispatch((prv) => ({ ...prv, faves: favorites }))
      )
      .catch(({ message }) => {
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.concat({ message, color: "error", id: uuidv4() }),
        }));
      });
  }, []);

  return (
    <HomeContext.Provider value={{ homeStates, homeDispatch }}>
      <Header />
      <section className={styles.blogs} aria-live="polite">
        {homeStates.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </section>
      <BlogForm />
      <Footer />
    </HomeContext.Provider>
  );
};

export default Home;
