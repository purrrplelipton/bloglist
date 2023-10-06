import Loader from "@components/loader";
import { settoken } from "@services/auth";
import { initializeBlogs } from "@store/reducers/home";
import { appendNotification, setUser } from "@store/reducers/global";
import { initializeUserInfo } from "@store/reducers/user";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Blog } from "./blog";
import { BlogForm } from "./blog-form";
import { Drawer } from "./drawer";
import { Footer } from "./footer";
import { Header } from "./header";

const Home = ({ blogs, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const dgtoken = localStorage.getItem("dgtoken");
    if (dgtoken) {
      const { id, token } = JSON.parse(dgtoken);
      dispatch(setUser(id));
      settoken(token);
      return;
    }
    navigate("/sign-in");
  }, []);

  useEffect(() => {
    async function getPayload() {
      try {
        dispatch(initializeUserInfo());
        dispatch(initializeBlogs());
      } catch (error) {
        setError(error);
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
            id: uuidv4(),
          })
        );
      }
    }
    getPayload();
  }, []);

  return (
    <div role="main" className="">
      <Header />
      <Drawer />
      <section
        className="min-h-screen px-3 flex flex-col items-stretch"
        aria-live="polite"
      >
        {loading && <Loader />}
        {error && <div>{error.message}</div>}
        {!loading && !error && blogs.length === 0 && (
          <h1 className="text-2xl text-slate-300 text-center m-auto">
            No blogs right now.
          </h1>
        )}
        {!loading && !error && blogs.length > 0 && (
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
      <BlogForm />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.home.blogs,
  loading: state.home.loading,
});

export default connect(mapStateToProps)(Home);
