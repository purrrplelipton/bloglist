import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import blog from "./controllers/blog.js";
import signIn from "./controllers/sign-in.js";
import user from "./controllers/user.js";
import { MONGODB_URI } from "./utils/config.js";
import {
  ErrHandler,
  tokenExtractor,
  UnknownEndpoint,
  userExtractor,
} from "./utils/middleware.js";

console.log("connecting to MongoDB...");
try {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected to MongoDB");
} catch (error) {
  console.error("error connecting to MongoDB:", error.message);
}

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection:", error.message);
});

mongoose.set("strictQuery", true);
mongoose.set("runValidators", true);

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use("/hotcakes", express.static("hotcakes"));
app.use(express.json({ limit: "16MB" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(tokenExtractor);

app.use("/api/blogs", userExtractor, blog);
app.use("/api/users", user);
app.use("/api/sign-in", signIn);

app.use(UnknownEndpoint);
app.use(ErrHandler);

export default app;
