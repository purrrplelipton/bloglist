import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import BlogsRouter from "./controllers/blog.js";
import SignInsRouter from "./controllers/sign-in.js";
import UsersRouter from "./controllers/user.js";
import { MONGODB_URI } from "./utils/config.js";
import {
  ErrHandler,
  tokenExtractor,
  UnknownEndpoint,
  userExtractor,
} from "./utils/middleware.js";

(async function connect() {
  console.log("connecting to MongoDB...");
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB");
  } catch (exception) {
    console.error("error connecting to MongoDB:", exception);
  }
})();

mongoose.set("strictQuery", true);
mongoose.set("runValidators", true);

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use(tokenExtractor);

app.use("/api/blogs", userExtractor, BlogsRouter);
app.use("/api/users", UsersRouter);
app.use("/api/sign-in", SignInsRouter);

app.use(UnknownEndpoint);
app.use(ErrHandler);

export default app;
