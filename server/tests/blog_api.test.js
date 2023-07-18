import { connection, set } from "mongoose";
import supertest from "supertest";
import app from "../app";

set("bufferTimeoutMS", 30000);

const api = supertest(app);

test(
  "should return blogs as JSON",
  async () =>
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/),
  100000
);

test("should return 2 blogs", async () => {
  const { body } = await api.get("/api/blogs");
  expect(body).toHaveLength(2);
});

afterAll(async () => await connection.close());
