const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  // const blogObjects = helper.blogList.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blog) => blog.save());
  // await Promise.all(promiseArray);

  for (let blog of helper.blogList) {
    const blogObj = new Blog(blog);
    await blogObj.save();
  }
}, 9999);

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const res = await helper.blogsInDb();
  expect(res).toHaveLength(helper.blogList.length);
});

test("a specific blog is within the returned blogs", async () => {
  const res = await helper.blogsInDb();
  const titles = res.map((r) => r.title);
  expect(titles).toContain("First class tests");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Pseudo-Classes",
    author: "mozilla developer network",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const endingBlogs = await helper.blogsInDb();
  expect(endingBlogs).toHaveLength(helper.blogList.length + 1);

  const titles = endingBlogs.map((b) => b.title);
  expect(titles).toContain("Pseudo-Classes");
});

test("blog without url is not added", async () => {
  const newBlog = { title: "adventures of doo", author: "loopdeedoo" };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const endingBlogs = await helper.blogsInDb();
  expect(endingBlogs).toHaveLength(helper.blogList.length);
});

test("a specific blog can be viewed", async () => {
  const startingBlogs = await helper.blogsInDb();
  const blogToView = startingBlogs[3];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
  expect(resultBlog).toEqual(processedBlogToView);
});

test("a blog can be deleted", async () => {
  const startingBlogs = await helper.blogsInDb();
  const blogToDelete = startingBlogs[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const endingBlogs = await helper.blogsInDb();
  expect(endingBlogs.length).toEqual(helper.blogList.length - 1);

  const titles = endingBlogs.map((blog) => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(() => mongoose.connection.close());
