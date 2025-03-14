import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/api/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

export default router;
