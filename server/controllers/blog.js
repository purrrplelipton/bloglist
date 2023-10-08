import { Router } from "express";
import { Blog as blg } from "../models/blog.js";
import { User as usr } from "../models/user.js";

const blog = Router();

blog.get("/", async function (req, res) {
  const user = await usr.findById(req.user);
  if (user) {
    const { search } = req.query;
    let query = {};
    if (search) query.title = { $regex: new RegExp(search, "i") };
    const blogs = await blg.find(query).sort({ createdAt: -1 });

    res.json(blogs);
  }
});

blog.get("/:id", async function (req, res) {
  const user = await usr.findById(req.user);
  if (user) {
    const blog = await blg.findById(req.params.id);
    res.json(blog);
  }
});

blog.post("/", async function (req, res) {
  const user = await usr.findById(req.user);
  if (user) {
    const blog = new blg({ ...req.body, author: user._id });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    return res.json(savedBlog);
  }
});

blog.patch("/:id", async function (req, res) {
  const user = await usr.findById(req.user);
  if (user) {
    const blog = await blg.findById(req.params.id);
    if (blog) {
      const updatedBlog = await blg.findByIdAndUpdate(
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

blog.delete("/:id", async function (req, res) {
  const user = await usr.findById(req.user);
  if (user) {
    const blog = await blg.findById(req.params.id);
    if (blog) {
      if (String(user._id) === String(blog.author)) {
        await blg.findByIdAndDelete(blog.id);
        res.status(204).end();
      }
    }
  }
});

export default blog;
