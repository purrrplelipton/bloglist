import { Plus } from "@assets/vectors/tabler-icons";
import PropTypes from "prop-types";
import { AddBlog } from "./add-blog";
import styles from "./bottom.module.css";

const Bottom = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <footer className={styles.toolbar}>
        <button
          aria-label="create blog"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Plus />
        </button>
      </footer>
      <AddBlog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

Bottom.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Bottom;
