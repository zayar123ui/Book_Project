const { login_auth, register } = require("../model/MLibrarian");
const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");
const login_service = async (body) => {
  try {
    const { email, password } = body;

    const data = await login_auth(email, password);

    if (data == null) {
      return { message: "Email and password doesn't match." };
    }
    const string_id = helper.object_id_to_string(data._id);
    const token = jwt.sign(
      { user_id: string_id, email: data.email, role: data.role },
      "secretKey"
    );
    return { token: token };
  } catch (error) {
    return { error: error };
  }
};

const register_service = async (body) => {
  try {
    const { email, password } = body;

    const data = await register(email, password);
    return data;
  } catch (error) {
    return { error: error };
  }
};
module.exports = {
  login_service,
  register_service,
};
