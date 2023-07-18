import PropTypes from "prop-types";
import styles from "./blog.module.css";

const Blog = ({ blog }) => {
  return (
    <article className={`${styles.blog} blog-${blog.id}`}>
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={`thumbnail for blog titled: ${blog.title}`}
        />
      )}
      <p className={styles.blogTitle}>{blog.title}</p>
    </article>
  );
};

Blog.propTypes = { blog: PropTypes.object.isRequired };

export default Blog;
