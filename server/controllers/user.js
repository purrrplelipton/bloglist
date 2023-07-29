/* eslint-disable linebreak-style */
import { hash } from "bcrypt";
import { Router } from "express";
import { User as usr } from "../models/user.js";
import { userExtractor } from "../utils/middleware.js";

const user = Router();

user.get("/", userExtractor, async (req, res) => {
  const user = await usr.findById(req.user);
  if (user) res.json(user);
});

user.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new usr({ name, email, password: await hash(password, 10) });
  const savedUser = await user.save();
  res.json(savedUser);
});

user.patch("/", userExtractor, async (req, res) => {
  const user = await usr.findById(req.user);
  if (user) {
    const updatedUser = await usr.findByIdAndUpdate(
      req.user,
      { ...req.body },
      { new: true, runValidators: true, context: "query" }
    );
    if (updatedUser) res.json(updatedUser);
  }
});

user.delete("/:id", async (req, res) => {
  await usr.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default user;
