const { ObjectId } = require("mongodb");

module.exports = {
  joi_error: (errors) => {
    const errs = {};
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].path[1] != null) {
        errs[errors[i].path[1]] = errs[errors[i].path[1]]
          ? Object.assign(errs[errors[i].path[1]], {
              [errors[i].path[2]]: errors[i].message,
            })
          : { [errors[i].path[2]]: errors[i].message };
      } else {
        errs[errors[i].context.label] = errors[i].message;
      }
    }
    return errs;
  },
  id_generate: () => {
    return Math.floor(100000 + Math.random() * 900000);
  },
  object_id_to_string: (id) => {
   
    return id.toString();
  
  },
};
