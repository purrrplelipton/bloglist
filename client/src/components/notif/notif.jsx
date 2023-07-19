import { X } from "@assets/vectors/tabler-icons";
import { AppContext } from "@contexts/";
import React, { useContext } from "react";
import styles from "./notif.module.css";

const Notif = () => {
  const {
    state: { notifs },
    dispatch,
  } = useContext(AppContext);

  return (
    <div id="notifs-container" className={styles.notifsContainer}>
      {notifs.map(({ message, color, id }) => (
        <div key={id} className={[styles.Notif, styles[color]].join(" ")}>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() =>
              dispatch((prv) => ({
                ...prv,
                notifs: prv.notifs.filter((notif) => notif.id !== id),
              }))
            }
            className={styles.dismissBtn}
          >
            <X />
          </button>
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notif;
