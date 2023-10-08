import pkg from "jsonwebtoken";
import { SECRET } from "./config.js";

const { verify } = pkg;

export const UnknownEndpoint = (_, res) =>
  res.status(404).send({ message: "Unknown Endpoint" });

export function ErrHandler(err, _, res, nxt) {
  console.log(err.message);

  if (err.name === "CastError" && err.kind === "ObjectId")
    return res.status(400).send({ message: "malformatted id" });
  else if (err.name === "ValidationError")
    return res.status(400).json({ message: err.message });
  else if (err.name === "JsonWebTokenError")
    return res.status(401).json({ message: "invalid token" });
  else if (err.name === "TokenExpiredError")
    return res.status(401).json({ message: "token expired" });

  nxt(err);
}

export const tokenExtractor = (req, _, nxt) => {
  const authToken = req.headers["authorization"];
  if (authToken && authToken.startsWith("Bearer "))
    req.token = authToken.slice(7);

  nxt();
};

export const userExtractor = (req, _, nxt) => {
  const token = req.token;
  if (token) {
    const decodedToken = verify(token, SECRET);
    req.user = decodedToken.id;
  }

  nxt();
};
