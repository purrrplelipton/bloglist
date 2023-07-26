import { Router } from "express";
import pkg from "jsonwebtoken";
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";
import { SECRET } from "../utils/config.js";
import { userExtractor } from "../utils/middleware.js";

const { verify } = pkg;

const BlogsRouter = Router();

BlogsRouter.get("/", async function (req, res) {
  const { search } = req.query;
  let query = {};
  if (search) query.title = { $regex: new RegExp(search, "i") };

  const blogs = await Blog.find(query).populate("author", {
    name: 1,
    alias: 1,
    email: 1,
  });
  res.json(blogs);
});

BlogsRouter.get("/:id", async function (req, res) {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

BlogsRouter.post("/", async function (req, res) {
  const { id } = verify(req.token, SECRET);
  if (id) {
    const user = await User.findById(id);

    const blog = new Blog({ ...req.body, author: user._id });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return res.json(savedBlog);
  }
});

BlogsRouter.patch("/:id", async function (req, res) {
  const blogId = req.params.id,
    { userId, updatedProps } = req.body,
    { id } = verify(req.token, SECRET);

  if (id && id === userId) {
    const user = await User.findById(id);

    if (user) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { ...updatedProps },
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      );

      if (updatedBlog) return res.json(updatedBlog);

      return res.status(404).json({ error: "blog doesn't exist" });
    }

    return res.status(404).json({ error: "user doesn't exist" });
  }

  return res.status(401).json({ error: "token and id mismatch" });
});

BlogsRouter.delete("/", userExtractor, async function (req, res) {
  console.log("body:", req.body);
  const blogToDelete = await Blog.findById(req.body.id);
  console.log("user:", req.user);
  // if (String(req.user._id) === String(blogToDelete.author._id)) {
  //   await Blog.findByIdAndDelete(req.body.id);
  //   res.status(204).end();
  // }
});

export default BlogsRouter;
