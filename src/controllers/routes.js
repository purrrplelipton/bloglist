const express = require("express");
const BlogsRouter = express.Router();
const Blog = require("../models/schemas");

BlogsRouter.get("/", async (_req, res) => {
  const notes = await Blog.find({});
  res.json(notes);
});

BlogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

BlogsRouter.post("/", async (req, res) => {
  const body = req.body;
  const checkStart = /(^http:\/\/|^https:\/\/)/.test(body.url),
    moddedUrl = !checkStart ? "https://" + body.url : body.url;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: moddedUrl,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

BlogsRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  res.json(updatedBlog);
});

BlogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = BlogsRouter;
