const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Role } = require("../helper/enum");

const librarianSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, max: 128 },
    password: { type: String, required: true },
    role: { type: String, default: Role.LIBRARIAN },
  },
  {
    timestamps: true,
  }
);

const Librarian = mongoose.model("librarian", librarianSchema);

const login_auth = async (email, password) => {
  try {
    const data = await Librarian.findOne({ email: email, password: password });
    return data;
  } catch (error) {
    return { error: "login model error" };
  }
};
const register = async (email, password) => {
  try {
    const data = await new Librarian({
      email: email,
      password: password,
    }).save();
    return data;
  } catch (error) {
    return { error: "register model error" };
  }
};
module.exports = {
  login_auth,
  register,
};
