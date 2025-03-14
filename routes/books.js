import { Router } from "express";
import Books from "../models/Books.js";

const router = Router();

router.post("/api/books-create", async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      description,
      image,
      rating,
      price,
      language,
      year,
    } = req.body;

    if (
      !title ||
      !author ||
      !genre ||
      !description ||
      !image ||
      !rating ||
      !price ||
      !language ||
      !year
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = {
      title: title,
      author: author,
      genre: genre,
      description: description,
      image: image,
      rating: rating,
      price: price,
      language: language,
      year: year,
    };

    const createdBook = await Books.create(newBook);

    res.status(201).json({
      message: "Book created successfully",
      book: createdBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Server error during book creation" });
  }
});

router.get("/api/books", async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error during book fetching" });
  }
});

router.get("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Server error during book fetching" });
  }
});

router.post("api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error during book deletion" });
  }
});

router.post("/api/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      genre,
      description,
      image,
      rating,
      price,
      language,
      year,
    } = req.body;

    const updatedBook = await Books.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        description,
        image,
        rating,
        price,
        language,
        year,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error during book update" });
  }
});

export default router;
