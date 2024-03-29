import { compare } from "bcrypt";
import { Router } from "express";
import pkg from "jsonwebtoken";
import { User as usr } from "../models/user.js";
import { SECRET } from "../utils/config.js";

const { sign } = pkg;

const signIn = Router();

signIn.post("/", async function (req, res) {
  const { email$alias, password, rememberMe } = req.body;

  const user = await usr.findOne({
    $or: [{ email: email$alias }, { alias: email$alias }],
  });

  if (user) {
    const passwordValid = await compare(password, user.password);
    if (passwordValid) {
      const token = sign({ id: user._id }, SECRET, {
        expiresIn: rememberMe ? "30d" : "1d",
      });
      return res.status(200).json({ id: user._id, token });
    }
  }

  return res
    .status(401)
    .json({ message: "Incorrect Email, Alias or Password." });
});

export default signIn;
