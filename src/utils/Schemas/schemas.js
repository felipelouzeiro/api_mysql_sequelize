const yup = require('yup');

const userSchema = yup.object({
  displayName: yup.string()
  .min(8, 'DisplayName must be 8 or more characters.')
  .required('DisplayName is required.'),
  email: yup.string()
  .email('Invalid e-mail.')
  .required('E-mail is required.'),
  password: yup.string()
  .min(6, 'Password must be 6 or more characters.')
  .required('Password is required.')
});

const loginSchema = yup.object({
  email: yup.string()
  .email('Invalid e-mail.')
  .required('E-mail is required.'),

  password: yup.string()
  .min(6, 'Password must be 6 or more characters.')
  .required('Password is required.'),
});

module.exports = {
  userSchema,
  loginSchema,
}