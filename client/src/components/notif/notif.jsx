import { X } from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import styles from "./notif.module.css";

const dismissDelay = 500;

const Notif = () => {
  const {
    state: { notifs },
    dispatch,
  } = useContext(AppContext);

  const [dismissQueue, setDismissQueue] = useState([]);

  useEffect(() => {
    if (dismissQueue.length) {
      const timeoutId = setTimeout(() => {
        const dismissedId = dismissQueue[0];
        setDismissQueue((prevQueue) => prevQueue.slice(1));
        dispatch((prevState) => ({
          ...prevState,
          notifs: prevState.notifs.filter((notif) => notif.id !== dismissedId),
        }));
      }, dismissDelay);
      return () => clearTimeout(timeoutId);
    }
  }, [dismissQueue, dispatch]);

  useEffect(() => {
    if (notifs.length && !dismissQueue.length) {
      const timeoutId = setTimeout(() => {
        setDismissQueue([notifs[0].id]);
      }, dismissDelay * 10);

      return () => clearTimeout(timeoutId);
    }
  }, [notifs, dismissQueue]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const notificationVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: { opacity: 1, height: "auto", marginBottom: 8 },
    exit: { opacity: 0, height: 0, marginBottom: 0 },
  };

  const handleDismiss = (id) => {
    setDismissQueue((prevQueue) => [...prevQueue, id]);
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {notifs.length && (
          <motion.div
            id="notifs-container"
            className={styles.notifsContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {notifs.map(({ message, color, id }) => (
              <motion.div
                key={id}
                className={`${styles.container} ${id.split(/-/g).pop()}`}
                variants={notificationVariants}
                initial="hidden"
                animate={dismissQueue.includes(id) ? "exit" : "visible"}
                exit="exit"
              >
                <div className={`${styles.notif} ${styles[color]}`}>
                  <p>{message}</p>
                  <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={() => handleDismiss(id)}
                    className={styles.dismissBtn}
                  >
                    <X />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Notif;
