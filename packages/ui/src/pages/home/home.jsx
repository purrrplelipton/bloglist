import Loader from "components/loader"
import { array, bool } from "prop-types"
import React, { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { settoken } from "services/auth"
import { appendNotification, setUser } from "store/reducers/global"
import { initializeBlogs } from "store/reducers/home"
import { initializeUserInfo } from "store/reducers/user"
import { Blog } from "./blog"
import { BlogForm } from "./blog-form"
import { Drawer } from "./drawer"
import { Footer } from "./footer"
import Header from "./header"

const Home = ({ blogs, loading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const dgtoken = localStorage.getItem("dgtoken")
    if (dgtoken) {
      const { id, token } = JSON.parse(dgtoken)
      dispatch(setUser(id))
      settoken(token)
      return
    }
    navigate("/sign-in")
  }, [dispatch, navigate])

  useEffect(() => {
    async function fetchDetails() {
      try {
        await dispatch(initializeUserInfo())
        await dispatch(initializeBlogs())
      } catch (error) {
        setError(error)
        dispatch(
          appendNotification({
            message: error.message,
            color: "error",
          }),
        )
      }
    }
    fetchDetails()
  }, [dispatch])

  return (
    <div role="main">
      <Header />
      <Drawer />
      <section
        className="flex flex-col items-stretch min-h-screen px-3"
        aria-live="polite"
      >
        {loading && <Loader />}
        {error && <div>{error.message}</div>}
        {!loading && !error && blogs.length === 0 && (
          <h1 className="m-auto text-2xl text-center text-slate-300">
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
  )
}

Home.propTypes = {
  blogs: array.isRequired,
  loading: bool.isRequired,
}

const mapStateToProps = (state) => ({
  blogs: state.home.blogs,
  loading: state.home.loading,
})

export default connect(mapStateToProps)(Home)
