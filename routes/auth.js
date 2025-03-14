import { Router } from "express";
import { randomUUID } from "crypto";
import User from "../models/User.js";
import { generateJwtToken } from "../services/token.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ message: "Invalid password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    };

    const user = await User.create(newUser);

    const token = generateJwtToken(user.id, user.email);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateJwtToken(existUser.id, existUser.email);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: existUser.id,
        email: existUser.email,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        phoneNumber: existUser.phoneNumber,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;
