const handlingError = require('../../utils/Helpers/handlingError');
const { BadRequest, Conflit } = require('../../utils/Helpers/status-http-library');
const { User } = require('../models');

const create = async ({ displayName, email, password }) => {
  const { error } = userSchema.validate({ displayName, email, password });
  if (error) { throw handlingError(BadRequest, error.details[0].message); }

  const alreadyUser = await User.findOne({ where: { email } });
  // console.log('retorno: ', alreadyUser);

  if (alreadyUser) { throw handlingError(Conflit, 'User already registered'); }

  const response = await User.create({ displayName, email, password });
  return response.dataValues;
};

module.exports = {
  create,
}