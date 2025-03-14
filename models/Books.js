import { model, Schema } from "mongoose";


const BooksSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    language: { type: String, required: true },
    year: { type: Number, required: true },
},{
    timestamps: true
});

const Books = model("Books", BooksSchema);

export default Books;