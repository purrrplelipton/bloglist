import pkg from "jsonwebtoken";
import { SECRET } from "./config.js";
import { User } from "../models/user.js";

const { verify } = pkg;

export function ReqLog({ method, path, body }, _res, nxt) {
  const now = new Date();

  console.log("MEHTOD:", method);
  console.log("PATH:", path);
  console.log("BODY:", body);
  console.log("----");
  console.log("TIME:", now.toLocaleTimeString());

  nxt();
}

export const UnknownEndpoint = (_req, res) =>
  res.status(404).send({ error: "Unknown Endpoint" });

export const tokenExtractor = (req, _res, nxt) => {
  const token = req.headers.authorization;
  if (token && /^Bearer\s/.test(token))
    req.token = token.replace(/^Bearer\s/, "");

  nxt();
};

export const userExtractor = async (req, _res, nxt) => {
  console.log("headers:", req.headers);
  const token = req.headers.authorization;
  console.log("token:", token);
  if (token && /^Bearer\s/.test(token)) {
    const { id } = verify(token, SECRET);
    console.log("id:", id);
    const user = await User.findById(id);
    console.log("user:", user);
  }
  nxt();
};

export function ErrHandler(err, _req, res, nxt) {
  if (err.name === "CastError")
    return res.status(400).send({ error: "malformatted id" });
  else if (err.name === "ValidationError")
    return res.status(400).json({ error: err.message });
  else if (err.name === "JsonWebTokenError")
    return res.status(401).json({ error: "invalid token" });
  else if (err.name === "TokenExpiredError")
    return res.status(401).json({ error: "token expired" });

  nxt(err);
}
