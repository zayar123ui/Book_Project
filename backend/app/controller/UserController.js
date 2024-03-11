const { login_service, register_service } = require("../service/login_service");
let users = [];
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const { Role } = require("../helper/enum");
//for user login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (!user)
//       return res.status(401).json({ message: "Invalid email or password" });

//     const token = jwt.sign(
//       { user_id: user.id, email: user.email, role: user.role },
//       "secretKey"
//     );
//     return res.json({ token });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Internal Server Error");
//   }
// };
// //for user register
// const register = async (req, res) => {
//   try {
//     const user_id = helper.id_generate();
//     const { email, password } = req.body;
//     const user = users.find((u) => u.email === email);
//     if (user)
//       return res.status(409).json({ message: "Email already registered" });
//     users.push({ id: user_id, email, password, role: Role.USER });
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Internal Server Error");
//   }
// };
// const getAllUser = async (req, res) => {
//   try {
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json("Internal Server Error");
//   }
// };

//for user login
const login = async (req, res) => {
  try {
    const data = await login_service(req.body);
    !data.token
      ? res.status(401).json({ message: "Invalid email or password" })
      : res.json({ token: data.token });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
//for user register
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
  register,
};
