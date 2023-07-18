import { hash } from "bcrypt";
import { Router } from "express";
import { User } from "../models/user.js";

const UsersRouter = Router();

UsersRouter.get("/", async (_req, res) => {
  const user = await User.find({}).populate("blogs", {
    title: 1,
    content: 1,
    thumbnail: 1,
    likes: 1,
    dislikes: 1,
  });
  res.json(user);
});

UsersRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

UsersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password: await hash(password, 10) });
  const savedUser = await user.save();
  res.json(savedUser);
});

UsersRouter.put("/:id", async (req, res) => {
  const updatedFields = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: updatedFields },
    { new: true, runValidators: true, context: "query" }
  );
  res.json(updatedUser);
});

UsersRouter.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default UsersRouter;
