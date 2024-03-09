const express = require("express");
const { authenticateToken } = require("./app/middleware/validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();


app.use(cors());

app.use(bodyParser.json());

app.use("/users", require("./app/router/user_route"));

app.use("/librarian", require("./app/router/librarian_route"));

app.use(authenticateToken);
app.use("/book", require("./app/router/book_route"));

// Start the server on port 3000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
