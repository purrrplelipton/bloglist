import { Router } from "express";
import multer from "multer";
import fs from "node:fs";
import { v4 } from "uuid";
import { Blog as blg } from "../models/blog.js";
import { User as usr } from "../models/user.js";

const blog = Router();
const multerConfig = multer({
  storage: multer.diskStorage({
    filename: function (_, file, cb) {
      const originalname = file.originalname;
      const extension = originalname.slice(originalname.lastIndexOf("."));
      cb(null, `${v4()}${extension}`);
    },
    destination: (req, _, cb) => {
      const userDirectory = `hotcakes/${req.user}`;
      fs.mkdirSync(userDirectory, { recursive: true });
      cb(null, userDirectory);
    },
  }),
  fileFilter: function (_, file, cb) {
    if (!file.mimetype.match(/image\/.*/)) {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

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

blog.post("/", multerConfig.single("thumbnail"), async function (req, res) {
  const user = await usr.findById(req.user);
  if (user) {
    const blog = new blg({
      ...req.body,
      thumbnail: req.file.filename,
      author: user._id,
    });
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
