const jwt = require("jsonwebtoken");
const { Role } = require("../helper/enum");

let librarians = [
  {
    email: "librarian1@gmail.com",
    password: "asdfasdf",
    role: Role.LIBRARIAN,
  },
];
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const librarian = librarians.find(
      (librarian) =>
        librarian.email === email && librarian.password === password
    );
    if (!librarian)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { email: librarian.email, role: librarian.role },
      "secretKey"
    );
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const bookPost = async (req, res) => {
//   try {
//     if (req.user.role !== Role.LIBRARIAN)
//       return res.status(403).json({ message: "Access forbidden" });

//     const { title, author } = req.body;
//     books.push({ title, author });
//     res.status(201).json({ message: "Book added successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
module.exports = {
  login,

};
