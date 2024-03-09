const jwt = require("jsonwebtoken");
const helper = require("../helper/helper")
module.exports = {
  authenticateToken: async (req, res, next) => {
    let token = await req.headers["authorization"];

    if (!token)
      return res.status(401).json({ message: "Authentication token required" });

    token = token
      ? token.split(" ")[1]
      : next(new Error("Tokenization Error. Please login !"));
    token = token.replace(/^"(.*)"$/, "$1");

    jwt.verify(token, "secretKey", async (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
      next();
    });
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        return res.status(403).json({"Validation Error" : helper.joi_error(error.details)});
        // helper.fmsg(res, 400, helper.joi_error(error.details));
      } else {
        next();
      }
    };
  },
};
