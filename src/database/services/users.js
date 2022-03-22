const handlingError = require('../../utils/Helpers/handlingError');
const { BadRequest, Conflit } = require('../../utils/Helpers/status-http-library');
const { User } = require('../models');
const { userSchema, loginSchema } = require("../../utils/Schemas/schemas");
const { genToken } = require('../../utils/Helpers/JWT');

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

const login = async (email, password) => {
  try {
    await loginSchema.validate({ email, password })
  } catch (error) {
    if (error) { throw handlingError(BadRequest, error.errors[0]); }
  }
  
  const userFound = await User.findOne({ where: { email } });
  
  if (!userFound || userFound.password !== password) {
    throw handlingError(BadRequest, 'Invalid fields');
  } 
  
  const { password: pass, ...userWithoutPassword } = userFound.dataValues;
  
  const token = genToken(userWithoutPassword);
  console.log('token: ', token);

  return { token };
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: 'password' }, // traz as informaçoes dos usuarios sem o password;
  });
  
  return users;
};


module.exports = {
  create,
  login,
  getUsers,
}