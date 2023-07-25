import { Spinner } from "@components/spinner";
import { AppContext } from "@contexts/";
import { getBlogs } from "@services/blog.js";
import { getUser } from "@services/user.js";
import { motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Blog } from "./blog";
import { BlogForm } from "./blog-form";
import { Drawer } from "./drawer";
import { Footer } from "./footer";
import { Header } from "./header";
import styles from "./home.module.css";

export const HomeContext = createContext(null);

const Home = () => {
  const navigate = useNavigate();
  const bloggerzonKey = localStorage.getItem("bloggerzon");
  if (bloggerzonKey) {
    let userId = null;
    userId = JSON.parse(bloggerzonKey).id;
    const { dispatch } = useContext(AppContext);
    const [homeStates, homeDispatch] = useState({
      drawerIsOpen: false,
      searchQuery: "",
      blogs: [],
      faves: [],
      formIsOpen: false,
    });
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      setFetching(true);

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
        )
        .finally(() => setFetching(false));
    }, []);

    useEffect(() => {
      getUser(userId)
        .then(({ favorites }) =>
          homeDispatch((prv) => ({ ...prv, faves: favorites }))
        )
        .catch(({ message }) => {
          dispatch((prv) => ({
            ...prv,
            notifs: prv.notifs.concat({
              message,
              color: "error",
              id: uuidv4(),
            }),
          }));
        });
    }, []);

    const homeVariants = {
      hidden: {
        opacity: 0,
        x: "100%",
      },
      visible: {
        opacity: 1,
        x: 0,
      },
      exit: {
        opacity: 0,
        x: "-100%",
      },
    };

    return (
      <HomeContext.Provider value={{ homeStates, homeDispatch }}>
        <motion.main
          variant={homeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Header />
          <Drawer />
          <section className={styles.blogs} aria-live="polite">
            {fetching ? (
              <Spinner text={"Please wait"} width={40} />
            ) : (
              homeStates.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
            )}
          </section>
          <BlogForm />
          <Footer />
        </motion.main>
      </HomeContext.Provider>
    );
  } else {
    return navigate("/", { replace: true });
  }
};

export default Home;
