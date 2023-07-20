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

  const [dismissQueue, setDismissQueue] = useState([]);

  useEffect(() => {
    if (dismissQueue.length) {
      const dismissingId = dismissQueue[0];
      const timeoutId = setTimeout(() => {
        dispatch((prv) => ({
          notifs: prv.notifs.filter((notif) => notif.id !== dismissingId),
        }));
        setDismissQueue((prv) => prv.slice(1));
      }, dismissDelay * 15);

      return () => clearTimeout(timeoutId);
    }
  }, [dismissQueue, dispatch, notifs]);

  useEffect(() => {
    if (notifs.length) setDismissQueue((prv) => [...prv, notifs[0].id]);
  }, [notifs]);

  return (
    <div id="notifs-container" className={styles.notifsContainer}>
      {notifs.map(({ message, color, id }) => (
        <div
          key={id}
          className={`${styles.container} ${id.split(/-/g).pop()} ${
            !dismissQueue.includes(id) ? styles.shrink : ""
          }`}
        >
          <div
            className={`${styles.notif} ${styles[color]} ${
              styles[dismissQueue.includes(id) ? "roll-out" : "roll-up"]
            }`}
          >
            <p>{message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setDismissQueue((prv) => [...prv, id])}
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
