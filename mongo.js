const mongoose = require("mongoose");

const password = process.argv[2];

const URI = `mongodb+srv://db:${password}@db.qrfzcig.mongodb.net/blogs-test?retryWrites=true&w=majority`;

mongoose.connect(URI);

const Blog = new mongoose.model("Blog", {
  title: String,
  author: String,
  url: String,
});

const blog = new Blog({
  title: process.argv[3],
  author: process.argv[4],
  url: process.argv[5],
});

if (process.argv.length < 3) {
  console.log("give password as an arguement");
  process.end(1);
} else if (process.argv.length === 3) {
  Blog.find({}).then((blogs) => {
    blogs.forEach((b) => console.log(b));
    mongoose.connection.close();
  });
} else if (process.argv.length === 6) {
  blog.save().then(() => console.log("blog created"));
  mongoose.connection.close();
} else {
  console.log("unknown endpoint");
}
