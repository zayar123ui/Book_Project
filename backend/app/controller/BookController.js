const { Role } = require("../helper/enum");
const helper = require("../helper/helper");

const {
  add_book,
  get_books,
  borrow_book,
  find_book,
  delete_book,
  check_before_borrow,
  get_all_borrowed_books,
} = require("../service/book_service");
// let books = [
//   {
//     id: 806201,
//     title: "The New Beginning",
//     author: "Max Well",
//   },
//   {
//     id: 806202,
//     title: "The End of World",
//     author: "James",
//   },
//   {
//     id: 806203,
//     title: "The Endless loop",
//     author: "Theo",
//   },
//   {
//     id: 806204,
//     title: "For the love of god",
//     author: "Authur",
//   },
//   {
//     id: 806205,
//     title: "In the bleak mid winter",
//     author: "Tomus",
//   },
// ];
// let borrowedUsers = [];
// //to add a book
// const bookPost = async (req, res) => {
//   try {
//     //generate book id
//     const book_id = helper.id_generate();
//     //check if the user is librarian
//     if (req.user.role !== Role.LIBRARIAN)
//       return res.status(403).json({ message: "Access forbidden" });

//     const { title, author } = req.body;
//     books.push({ id: book_id, title, author });
//     res.status(201).json({ message: "Book added successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error });
//   }
// };

// //to get all books
// const getAllBook = async (req, res) => {
//   try {
//     return res.json(books);
//   } catch (error) {

//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error });
//   }
// };

// const getAllBorrowedBooks = async (req, res) => {
//   try {
//     const { user_id } = req.user;

//     const user = borrowedUsers.find((user) => user.user_id === user_id);

//     if (!user || user.borrowedBooks.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No books borrowed by this user." });
//     }

//     return res.status(200).json({
//       message: `Borrowed books for user id ${user_id}`,
//       Borrowed_Books: user.borrowedBooks,
//     });
//   } catch (error) {

//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error });
//   }
// };

// const borrowBook = async (req, res) => {
//   try {
//     const { user_id } = req.user;

//     const { book_id } = req.body;

//     //check if the book array is not empty
//     if (books.length === 0)
//       return res.status(404).json({ message: "No books available" });

//     //check if the book is available
//     const bookToBorrow = books.find((book) => book.id === book_id);
//     if (!bookToBorrow)
//       return res
//         .status(404)
//         .json({ message: "Book is currently not available" });

//     //find the user is already borrowed the book
//     let user = borrowedUsers.find((user) => user.user_id === user_id);
//     //if the user already borrowed the book
//     if (user) {
//       //if the user already borrowed 5 books, he can't borrow anymore
//       if (user.borrowedBooks.length >= 5)
//         return res
//           .status(400)
//           .json({ message: "User has exceeded the borrow limit" });
//       // user.borrowedBooks.push(book_id);
//       user.borrowedBooks.push({
//         id: book_id,
//         title: bookToBorrow.title,
//         author: bookToBorrow.author,
//       });
//   //     {
//   //   id: 806205,
//   //   title: "In the bleak mid winter",
//   //   author: "Tomus",

//   // }
//     } else {
//       //if the user is borrowing the book for the first time
//       borrowedUsers.push({
//         user_id: user_id,
//         borrowedBooks: [{ id: book_id, title: bookToBorrow.title, author: bookToBorrow.author }],
//       });
//     }
//     //remove the borrowed book from the books array
//     books = books.filter((book) => book.id !== book_id);

//     return res.status(200).json({
//       message: "Borrowed",
//       Borrowed_Books: borrowedUsers.find(
//         (borrowUser) => borrowUser.user_id === user_id
//       ),
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error });
//   }
// };

//to add a book
const bookPost = async (req, res) => {
  try {
    //check if the user is librarian
    if (req.user.role !== Role.LIBRARIAN)
      return res.status(403).json({ message: "Access forbidden" });

    const data = await add_book(req.body, req.user.user_id);

    res.status(201).json({ message: "Book added successfully", data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const get_all_books = async (req, res) => {
  try {
    const all_books = await get_books();

    if (all_books.length === 0)
      return res.status(404).json({ message: "No books available" });

    res.status(201).json(all_books);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const borrowBook = async (req, res) => {
  try {
    if (req.user.role !== Role.USER)
      return res.status(403).json({ message: "Access forbidden" });
    const book = await find_book(req.body.book_id);

    if (book === null)
      return res
        .status(404)
        .json({ message: "Book is currently not available" });

    const user_id = req.user.user_id;
    const borrowed = await check_before_borrow(user_id);

    if (borrowed.length >= 5)
      return res
        .status(400)
        .json({ message: "User has exceeded the borrow limit" });

    await borrow_book(req.body, user_id);

    await delete_book(req.body.book_id);

    res.status(201).json({ message: "Book borrowed successfully" });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const getAllBorrowedBooks = async (req, res) => {
  try {
    if (req.user.role !== Role.USER)
      return res.status(403).json({ message: "Access forbidden" });

    const user_id = req.user.user_id;
    const borrowed = await get_all_borrowed_books(user_id);
    if (borrowed.length === 0)
      res.status(200).json({ message: "No Book borrowed by this user." });

    res.status(200).json({
      message: `Book borrowed by user id : ${user_id}`,
      Borrowed_Books: borrowed,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
module.exports = {
  bookPost,
  get_all_books,
  // getAllBook,
  borrowBook,
  getAllBorrowedBooks,
};
