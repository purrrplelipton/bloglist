import { Router } from "express";
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";

const BlogsRouter = Router();

BlogsRouter.get("/", async function (req, res) {
  const user = await User.findById(req.user);
  if (user) {
    const { search } = req.query;
    let query = {};
    if (search) query.title = { $regex: new RegExp(search, "i") };
    const blogs = await Blog.find(query).populate("author", {
      name: 1,
      alias: 1,
      email: 1,
    });
    res.json(blogs);
  }
});

BlogsRouter.get("/:id", async function (req, res) {
  const user = await User.findById(req.user);
  if (user) {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  }
});

BlogsRouter.post("/", async function (req, res) {
  const user = await User.findById(req.user);
  if (user) {
    const blog = new Blog({ ...req.body, author: user._id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return res.json(savedBlog);
  }
});

BlogsRouter.patch("/:id", async function (req, res) {
  const user = await User.findById(req.user);
  if (user) {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      );
      if (updatedBlog) return res.json(updatedBlog);
    }
  }
});

BlogsRouter.delete("/:id", async function (req, res) {
  const user = await User.findById(req.user);
  if (user) {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      if (String(user._id) === String(blog.author)) {
        await Blog.findByIdAndDelete(blog.id);
        res.status(204).end();
      }
    }
  }
});

export default BlogsRouter;
