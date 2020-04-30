const Validator = require('validator');
const isEmpty = require('./is-empty.validation');

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 charecters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is Required!';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is Invalid!';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is Required!';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 charecter!';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is Required!';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm your password!';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password not matching!';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
