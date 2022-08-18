const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res, nxt) => {
  Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((err) => nxt(err));
});

blogsRouter.post("/", (req, res, nxt) => {
  if (req.body) {
    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      date: new Date(),
      id: req.body.id
    });

    return blog
      .save()
      .then((rslt) => res.json(rslt))
      .catch((err) => nxt(err));
  }

  res.status(400).json({ error: "body is missing" });
});

module.exports = blogsRouter;
