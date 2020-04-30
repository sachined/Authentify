// VALIDATION functions
const Joi = require('@hapi/joi');
// NOTE TO SELF: @hapi/joi was updated recently 2/3/20

// Registeration VALIDATION
const registerValidation = (data) => {
  // This schema will check the validity of input
  const schema = Joi.object({
      name: Joi.string()
          .min(6)
          .required(),
      email: Joi.string()
          .min(6)
          .required()
          .email(),
      password: Joi.string()
          .min(6)
          .required()
  });
  // LETs VALIDATE THE DATA BEFORE WE MAKE A User
  return schema.validate(data);
};

// Login VALIDATION
const loginValidation = data => {
  // This schema will check the validity of login attempt
  const schema = Joi.object({
      email: Joi.string()
          .min(6)
          .required()
          .email(),
      password: Joi.string()
          .min(6)
          .required()
  });
  // LETs VALIDATE THE DATA BEFORE WE MAKE A User
  return schema.validate(data);
};

// These statements allows the above functions to be used in other files
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
