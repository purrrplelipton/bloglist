import { Router } from "express";
import pkg from "jsonwebtoken";
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";
import { SECRET } from "../utils/config.js";

const { verify } = pkg;

const BlogsRouter = Router();

BlogsRouter.get("/", async function (_req, res) {
  const blogs = await Blog.find({}).populate("author", {
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

const getToken = (req) => {
  const token = req.headers.authorization;
  if (token && /^Bearer\s/.test(token)) return token.replace(/^Bearer\s/, "");
  return null;
};

BlogsRouter.post("/", async function (req, res) {
  const { id } = verify(getToken(req), SECRET);
  if (id) {
    const user = await User.findById(id);

    const blog = new Blog({ ...req.body, author: user._id });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return res.json(savedBlog);
  }

  return res.status(401).json({ error: "token invalid" });
});

BlogsRouter.put("/:id", async function (req, res) {
  const updatedFields = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: updatedFields },
    { new: true, runValidators: true, context: "query" }
  );
  res.json(updatedBlog);
});

BlogsRouter.delete("/:id", async function (req, res) {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default BlogsRouter;
