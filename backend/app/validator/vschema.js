const Joi = require("joi");
module.exports = {
  Schema: {
    login_request: Joi.object({
      email: Joi.string().required().max(30).email(),
      password: Joi.string().required().min(8).max(20),
    }),
    register_request: Joi.object({
      email: Joi.string().required().max(30).email(),
      password: Joi.string().required().min(8).max(20),
    }),
    book_post_request: Joi.object({
      title: Joi.string().required().min(1).max(40),
      author: Joi.string().required().min(1).max(30),
    }),
  },
};
