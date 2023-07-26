import { hash } from "bcrypt";
import { Router } from "express";
import pkg from "jsonwebtoken";
import { User } from "../models/user.js";
import { SECRET } from "../utils/config.js";
const { verify } = pkg;

const UsersRouter = Router();

UsersRouter.get("/", async (req, res) => {
  const { id } = verify(req.token, SECRET);
  if (id) {
    const user = await User.findById(id);
    if (user) res.json(user);
  }
});

UsersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password: await hash(password, 10) });
  const savedUser = await user.save();
  res.json(savedUser);
});

UsersRouter.patch("/", async (req, res) => {
  const { id } = verify(req.token, SECRET);
  if (id) {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { favorites: req.body.favorites },
      { new: true, runValidators: true, context: "query" }
    );
    if (updatedUser) res.json(updatedUser);
  }
});

UsersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default UsersRouter;
