import { Router } from "express";
import pkg from "jsonwebtoken";
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";
import { SECRET } from "../utils/config.js";

const { verify } = pkg;

const BlogsRouter = Router();

const getToken = (req) => {
  const token = req.headers.authorization;
  if (token && /^Bearer\s/.test(token)) return token.replace(/^Bearer\s/, "");
  return null;
};

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

BlogsRouter.patch("/:id", async function (req, res) {
  const blogId = req.params.id,
    { userId, updatedProps } = req.body,
    { id } = verify(getToken(req), SECRET);

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

BlogsRouter.delete("/:id", async function (req, res) {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default BlogsRouter;
