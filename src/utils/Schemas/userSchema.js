import * as yup from 'yup';

const userSchema = yup.object().shape({
  displayName: yup.string().min(8).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});

module.exports = {
  userSchema,
}