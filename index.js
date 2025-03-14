import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

// Routes
import AuthRotes from "./routes/auth.js";
import Users from "./routes/users.js";
import Books from "./routes/books.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(AuthRotes);
app.use(Users);
app.use(Books);

const startApp = async () => {
  try {
    mongoose.set("strictQuery", false);

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully!");

    const PORT = process.env.PORT || 4100;

    app.listen(PORT, () => {
      console.log(`✈ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

startApp();
