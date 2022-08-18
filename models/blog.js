const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  url: { type: String, unique: true, required: true },
  likes: { type: Number },
  date: { type: Date, required: true },
  id: { type: Number, unique: true, required: true },
});

module.exports = mongoose.model("Blog", blogSchema);
