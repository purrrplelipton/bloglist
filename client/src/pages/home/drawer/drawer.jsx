import BloggerzonSVG from "@assets/vectors/bloggerzon-svg";
import { HeartFilled, Home } from "@assets/vectors/tabler-icons";
import { Backdrop } from "@components/backdrop";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { HomeContext } from "../home";
import styles from "./drawer.module.css";

const navigations = [
  {
    href: "/",
    aria: "Link to main page",
    id: uuidv4(),
    icon: <Home />,
    label: "Home",
  },
  {
    href: "/favorites",
    aria: "Link to my favorites",
    id: uuidv4(),
    icon: <HeartFilled />,
    label: "Favorites",
  },
];

const Drawer = () => {
  const {
    homeStates: { drawerIsOpen },
    homeDispatch,
  } = useContext(HomeContext);

  return (
    <Backdrop
      isOpen={drawerIsOpen}
      onClose={() => homeDispatch((prv) => ({ ...prv, drawerIsOpen: false }))}
    >
      <motion.aside
        className={styles.drawer}
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.drawerHeader}>
          <div>
            <BloggerzonSVG />
            <span>Bloggerzon</span>
          </div>
        </header>
        <nav className={styles.navSection}>
          {navigations.map(({ href, aria, id, icon, label }) => (
            <NavLink
              key={id}
              to={href}
              className={({ isActive }) =>
                `${styles.navlinks}${isActive ? ` ${styles.current}` : ""}`
              }
              aria-label={aria}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <section className={styles.footer}>
          <a
            href="https://github.com/purrrplelipton"
            target="_blank"
            rel="noopener noreferrer"
          >
            Purrrplelipton
          </a>
        </section>
      </motion.aside>
    </Backdrop>
  );
};

export default Drawer;
