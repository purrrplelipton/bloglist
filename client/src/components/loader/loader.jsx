import { element, node, number, oneOfType, string } from "prop-types";

import styles from "./loader.module.css";

const Loader = (props) => {
  const { children, width } = props;

  return (
    <>
      <span
        style={{ width }}
        className={`${styles["l-root"]} block mx-auto`}
        role="progressbar"
      >
        <svg className="block" viewBox="22 22 44 44">
          <circle
            className={`${styles["l-circle"]} stroke-current`}
            cx={44}
            cy={44}
            r={20.2}
            fill={"none"}
            strokeWidth={3.6}
          ></circle>
        </svg>
      </span>
      {children && <div className="text-center">{children}</div>}
    </>
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
