const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  url: { type: String, unique: true, required: true },
  likes: Number
});

blogSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
