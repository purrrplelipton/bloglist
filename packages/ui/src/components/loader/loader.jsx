import { element, node, number, oneOfType, string } from "prop-types";
import styles from "./loader.module.css";

const Loader = (props) => {
  const { children, width } = props;

  return (
    <div className="absolute flex flex-col items-stretch justify-center text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <span
        style={{ width }}
        className={`${styles["l-root"]} mx-auto`}
        role="progressbar"
        title="Please wait while a request is being processed."
      >
        <svg viewBox="22 22 44 44">
          <circle
            className={`${styles["l-circle"]} stroke-current`}
            cx={44}
            cy={44}
            r={20.2}
            fill={"none"}
            strokeWidth={3.6}
          />
        </svg>
      </span>
      {children && <div>{children}</div>}
    </div>
  );
};

Loader.defaultProps = {
  width: 48,
  children: null,
};

Loader.propTypes = {
  width: number,
  text: oneOfType([string, node, element]),
};

export default Loader;
