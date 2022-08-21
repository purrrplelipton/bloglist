const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const API = supertest(app);

test("should return blogs as JSON", async () => {
  await API.get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

afterAll(() => mongoose.connection.close());
