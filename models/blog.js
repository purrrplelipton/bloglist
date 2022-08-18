const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: { type: String },
  url: { type: String, unique: true },
  likes: { type: Number },
  date: { type: Date },
  id: { type: Number, unique: true },
});

module.exports = mongoose.model("Blog", blogSchema);
