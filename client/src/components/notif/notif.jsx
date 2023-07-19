import { X } from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import React, { useContext, useEffect, useState } from "react";
import styles from "./notif.module.css";

const dismissDelay = 500;

const Notif = () => {
  const {
    state: { notifs },
    dispatch,
  } = useContext(AppContext);

  const [dismissingId, setDismissingId] = useState(null);

  useEffect(() => {
    if (dismissingId) {
      const timeoutId = setTimeout(() => {
        dispatch((prv) => ({
          notifs: prv.notifs.filter((notif) => notif.id !== dismissingId),
        }));
      }, dismissDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [dismissingId, notifs, dismissDelay]);

  useEffect(() => {
    if (notifs.length) {
      const timeoutId = setTimeout(
        () => setDismissingId(notifs[0].id),
        dismissDelay * 10
      );

      return () => clearTimeout(timeoutId);
    }
  }, [notifs]);

  return (
    <div id="notifs-container" className={styles.notifsContainer}>
      {notifs.map(({ message, color, id }) => (
        <div
          key={id}
          className={`${styles.container} ${
            dismissingId === id ? styles.shrink : ""
          }`}
        >
          <div
            className={`${styles.notif} ${styles[color]} ${
              styles[dismissingId === id ? "roll-out" : "roll-up"]
            }`}
          >
            <p>{message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setDismissingId(id)}
              className={styles.dismissBtn}
            >
              <X />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notif;
