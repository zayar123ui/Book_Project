const router = require("express").Router();
const controller = require("../controller/BookController");
const { validateBody } = require("../middleware/validator");
const { Schema } = require("../validator/vschema");

router.post("/", [validateBody(Schema.book_post_request), controller.bookPost]);
router.get("/", [controller.get_all_books]);
router.post("/borrow", [controller.borrowBook]);
router.get("/borrowed", [controller.getAllBorrowedBooks]);
module.exports = router;
