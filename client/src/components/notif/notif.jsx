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
    if (notifs.length) {
      const timeoutId = setTimeout(() => {
        setDismissingId(notifs[0].id);
        dispatch((prv) => ({
          ...prv,
          notifs: prv.notifs.filter((notif) => notif.id !== dismissingId),
        }));
      }, dismissDelay * 6);

      return () => clearTimeout(timeoutId);
    }
  }, [dismissingId, dispatch, notifs]);

  return (
    <div id="notifs-container" className={styles.notifsContainer}>
      {notifs.map(({ message, color, id }) => (
        <div
          key={id}
          className={`${styles.container} ${id.split(/-/g).pop()} ${
            id === dismissingId ? styles.shrink : ""
          }`}
        >
          <div
            className={`${styles.notif} ${styles[color]} ${
              styles[id === dismissingId ? "roll-out" : "roll-up"]
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
