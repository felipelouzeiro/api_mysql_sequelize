const handlingError = require('../../utils/Helpers/handlingError');
const { BadRequest, Conflit } = require('../../utils/Helpers/status-http-library');
const { User } = require('../models');
const { userSchema } = require("../../utils/Schemas/schemas")

const create = async ({ displayName, email, password }) => {
  try {
    await userSchema.validate({ displayName, email, password })
  } catch (error) {
    if (error) { throw handlingError(BadRequest, error.errors[0]); }
  }

  const alreadyUser = await User.findOne({ where: { email } });
  console.log("🚀 ~ file: users.js ~ line 14 ~ create ~ alreadyUser", alreadyUser)

  if (alreadyUser) { throw handlingError(Conflit, 'User already registered'); }

  const response = await User.create({ displayName, email, password });
  return response.dataValues;
};

module.exports = {
  create,
}