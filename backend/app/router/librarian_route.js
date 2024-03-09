const router = require("express").Router();
const controller = require("../controller/LibrarianController");
const { validateBody } = require("../middleware/validator");
const { Schema } = require("../validator/vschema");

router.post("/login", [validateBody(Schema.login_request), controller.login]);



module.exports = router;
