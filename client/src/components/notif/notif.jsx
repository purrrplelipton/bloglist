import { IconX } from "@tabler/icons-react";
import { removeNotification } from "@store/reducers/global";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import styles from "./notif.module.css";

const Notif = ({ notifications }) => {
  const dispatch = useDispatch();
  const [dismissQueue, setDismissQueue] = useState([]);

  useEffect(() => {
    if (dismissQueue.length > 0) {
      const timeoutId = setTimeout(() => {
        const dismissedId = dismissQueue[0];
        setDismissQueue((prevQueue) => prevQueue.slice(1));
        dispatch(removeNotification(dismissedId));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [dismissQueue, dispatch, removeNotification]);

  useEffect(() => {
    if (notifications.length && !dismissQueue.length) {
      const timeoutId = setTimeout(() => {
        setDismissQueue([notifications[0].id]);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [notifications, dismissQueue]);

  const handleDismiss = (id) => {
    setDismissQueue((prevQueue) => [...prevQueue, id]);
  };

  return (
    notifications.length && (
      <div
        id="notifs-container"
        className="fixed left-0 right-0 z-50 max-w-xs px-2 pt-2 mx-auto overflow-auto rounded-lg bottom-4 backdrop-blur-sm max-h-28"
      >
        {notifications.map(({ message, color, id }) => (
          <div key={id} className="overflow-hidden text-white max-h-52">
            <div
              className={`max-w-xs max-h-52 py-2 px-3 rounded-md overflow-hidden relative z-50 right-0 left-0 mx-auto flex items-center ${styles[color]}`}
            >
              <p>{message}</p>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => handleDismiss(id)}
                className="absolute top-0 bottom-0 right-0 p-2 rounded-lg opacity-40 hover:opacity-90 focus:opacity-90"
              >
                <IconX />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  notifications: state.global.notifications,
});

export default connect(mapStateToProps)(Notif);
