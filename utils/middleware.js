const { info, error } = require("./logger");

function requestLogger(req, res, nxt) {
  info("METHOD", req.method);
  info("PATH", req.path);
  info("BODY", req.body);
  info("---");
  nxt();
}

function unknownEndpoint(req, res) {
  res.status(404).send({ error: "unknown endpoint" });
}

function errorHandler(err, req, res, nxt) {
  error(err);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(400).json({ error: Object.entries(err.keyValue) });
  }

  nxt(err);
}

module.exports = { requestLogger, unknownEndpoint, errorHandler };
