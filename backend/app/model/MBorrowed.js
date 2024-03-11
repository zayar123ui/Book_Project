const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Role } = require("../helper/enum");
const ObjectId = mongoose.Types.ObjectId;
const borrowedBookSchema = new Schema(
  {
    id: { type: ObjectId },
    user_id: { type: ObjectId },
    author: { type: String, required: true, max: 128 },
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BorrowedBook = mongoose.model("borrowed_books", borrowedBookSchema);

const book_borrow = async (book_id, author, title, user_id) => {
  try {
    const object_book_id = ObjectId.createFromHexString(book_id.book_id);
    const object_user_id = ObjectId.createFromHexString(user_id);
    const data = await new BorrowedBook({
      id: object_book_id,
      user_id: object_user_id,
      author,
      title,
    }).save();

    return data;
  } catch (error) {
    console.log(error);
    return { error: "book borrow model error" };
  }
};

const borrowed_books_by_userid = async (user_id) => {
  try {
    const data = await BorrowedBook.find({ user_id: user_id });

    return data;
  } catch (error) {

    return { error: "book borrow model error" };
  }
};
const all_borrowed_books_by_user = async (user_id) => {
  try {
    const data = await BorrowedBook.find({ user_id: user_id });

    return data;
  } catch (error) {
    
    return { error: "book borrow model error" };
  }
};
module.exports = {
  book_borrow,
  borrowed_books_by_userid,
  all_borrowed_books_by_user,
};
