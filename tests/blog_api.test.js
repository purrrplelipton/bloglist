const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogList.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 9999);

describe("get blogs info", () => {
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

  test("confirm presence of a blog", async () => {
    const res = await helper.blogsInDb();
    const titles = res.map((r) => r.title);
    expect(titles).toContain("First class tests");
  });

  test("all blogs should have the _id unique identifier", async () => {
    const blogs = await Blog.find({});

    function urng(r = blogs.length) {
      const max = Math.floor(2 ** 32 / r) * r;
      do var x = Math.floor(Math.random() * 2 ** 32);
      while (x >= max);
      return x % r;
    }

    const rngBlog = blogs[urng()];

    expect(rngBlog._id).toBeDefined();
  });
});

describe("blog addition", () => {
  test("with all fields is added", async () => {
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
    expect(titles).toContain(newBlog.title);
  });

  test("with missing field(s) fails", async () => {
    const newBlog = { title: "adventures of doo", author: "loopdeedoo" };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs).toHaveLength(helper.blogList.length);
  });

  test("with missing likes count defaults to 0", async () => {
    const newBlog = {
      title: "why pantheon is a chad champ",
      author: "skoochLOL",
      url: "skoochlol.pantheon.chad",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const x = await helper.blogsInDb();
    const y = x.find((x) => x.title === "why pantheon is a chad champ");
    expect(y.likes).toBe(0);
  });
});

test("updating blog likes", async () => {
  const blogs = await helper.blogsInDb();
  const rngBlog = blogs[blogs.length - 1];

  await api
    .put(`/api/blogs/${rngBlog.id}`)
    .send({ ...rngBlog, likes: rngBlog.likes + 1 })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const endingBlogs = await helper.blogsInDb();
  const updatedBlog = endingBlogs.find((blog) => blog.title === "Type wars");
  expect(updatedBlog.likes).toBe(3);
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

describe("blog deletion", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToDelete = startingBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const endingBlogs = await helper.blogsInDb();
    expect(endingBlogs.length).toEqual(helper.blogList.length - 1);

    const titles = endingBlogs.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => mongoose.connection.close());
