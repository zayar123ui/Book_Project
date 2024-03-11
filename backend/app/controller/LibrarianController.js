const jwt = require("jsonwebtoken");
const { Role } = require("../helper/enum");
const { login_service, register_service } = require("../service/librarian_login_service");
// let librarians = [
//   {
//     email: "librarian1@gmail.com",
//     password: "asdfasdf",
//     role: Role.LIBRARIAN,
//   },
// ];
const login = async (req, res) => {
  try {
     const data = await login_service(req.body);
     !data.token
       ? res.status(401).json(data)
       : res.json({ token: data.token });
    // const { email, password } = req.body;
    // const librarian = librarians.find(
    //   (librarian) =>
    //     librarian.email === email && librarian.password === password
    // );
    // if (!librarian)
    //   return res.status(401).json({ message: "Invalid email or password" });

    // const token = jwt.sign(
    //   { email: librarian.email, role: librarian.role },
    //   "secretKey"
    // );
    // return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const register = async (req, res) => {
  try {
    await register_service(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
module.exports = {
  login,
  register
};
