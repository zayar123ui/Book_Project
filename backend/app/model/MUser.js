const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Role } = require("../helper/enum");


const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, max: 128 },
    password: { type: String, required: true },
    role: { type: String, default: Role.USER },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

const login_auth = async (email,password) => {
  try {
    const data = await User.findOne({ email: email, password:password });
    return data;
  } catch (error) {
    return { error: "user login model error" };
  }
};
const register = async (email,password) => {
  try {
    const data = await new User({ email: email, password: password }).save();
    return data;
  } catch (error) {
    return { error: "user register model error" };
  }
};
module.exports = {
  login_auth,
  register
};
