import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import BlogsRouter from "./controllers/blogs.js";
import SignInsRouter from "./controllers/sign-ins.js";
import UsersRouter from "./controllers/users.js";
import { MONGODB_URI } from "./utils/config.js";
import {
  ErrHandler,
  ReqLog,
  UnknownEndpoint,
  tokenExtractor,
} from "./utils/middleware.js";

const app = express();

console.log("connecting to MongoDB...");

mongoose
  .set("strictQuery", true)
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch(({ message }) =>
    console.error("error connecting to MongoDB:", message)
  );

app.use(cors());
app.use(express.static("dist"));
const bodyParserOptions = {
  limit: "10MB",
};
app.use(express.json(bodyParserOptions));
app.use(express.urlencoded({ extended: false }));
app.use(ReqLog);
app.use(tokenExtractor);

app.use("/api/blogs", BlogsRouter);
app.use("/api/users", UsersRouter);
app.use("/api/sign-in", SignInsRouter);

app.use(UnknownEndpoint);
app.use(ErrHandler);

export default app;
