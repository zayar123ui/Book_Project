const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Role } = require("../helper/enum");

const bookSchema = new Schema(
  {
    author: { type: String, required: true, max: 128 },
    title: { type: String, required: true },
    librarian_id: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("books", bookSchema);

const add_new_book = async (title, author, librarian_id) => {
  try {
    const data = await new Book({
      title: title,
      author: author,
      librarian_id: librarian_id,
    }).save();
    return data;
  } catch (error) {
    return { error: "book add model error" };
  }
};
const all_books = async (email, password) => {
  try {
    const data = await Book.find();
    return data;
  } catch (error) {
    return { error: "user register model error" };
  }
};
const delete_book_by_id = async (book_id) => {
  try {
    const book = await Book.findByIdAndDelete(book_id);
    return book;
  } catch (error) {
    console.log(error);
    return { error: "book delete model error" };
  }
};

const find_book_by_id = async (book_id) => {
  try {
    const book = await Book.findById(book_id);
    return book;
  } catch (error) {
    console.log(error);
    return { error: "book find model error" };
  }
};
module.exports = {
  add_new_book,
  all_books,
  delete_book_by_id,
  find_book_by_id,
};
