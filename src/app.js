const { URI } = require("./utils/config");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");

const express = require("express");
const app = express();

const cors = require("cors");
const BlogsRouter = require("./controllers/routes");
const { info, error } = require("./utils/logger");
const mongoose = require("mongoose");

info("connecting to MongoDB...");

mongoose
  .set("strictQuery", false)
  .connect(URI)
  .then(() => info("connected to MongoDB."))
  .catch((err) => error("failed to connect to MongoDB.", err.message));

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

app.use("/api/blogs", BlogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
