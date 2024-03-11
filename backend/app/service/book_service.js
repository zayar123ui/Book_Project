const { add_new_book, all_books,find_book_by_id,delete_book_by_id } = require("../model/MBook");
const {
  book_borrow,
  borrowed_books_by_userid,
  all_borrowed_books_by_user,
} = require("../model/MBorrowed");
const helper = require("../helper/helper");

const add_book = async (body) => {
  try {
    const { title, author, librarian_id } = body;

    const data = await add_new_book(title, author, librarian_id);

    return data;
  } catch (error) {
    return { error: error };
  }
};
const get_books = async () => {
  try {
    const data = await all_books();

    return data;
  } catch (error) {
    return { error: error };
  }
};
const borrow_book = async (book_id, user_id) => {
  try {
   
    const book_data = await find_book_by_id(book_id.book_id);
    
    const data = await book_borrow(book_id,book_data.author,book_data.title, user_id);
    return data;
  } catch (error) {
    return { error: error };
  }
};

const find_book = async (book_id) => {
  try {
    const data = await find_book_by_id(book_id);
    return data;
  } catch (error) {
    return { error: error };
  }
};

const delete_book = async (book_id) => {
  try {
    const data = await delete_book_by_id(book_id);
    return data;
  } catch (error) {
    return { error: error };
  }
};

const check_before_borrow = async (user_id) => {
  try {
    const data = await borrowed_books_by_userid(user_id);
    return data;
  } catch (error) {
    return { error: error };
  }
};
const get_all_borrowed_books = async (user_id) => {
  try {
    const data = await all_borrowed_books_by_user(user_id);
    return data;
  } catch (error) {
    return { error: error };
  }
};
module.exports = {
  add_book,
  get_books,
  borrow_book,
  find_book,
  delete_book,
  check_before_borrow,
  get_all_borrowed_books,
};
