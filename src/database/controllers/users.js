const { genToken } = require('../../utils/Helpers/JWT');
const userService = require('../services/users');
const { Created, OK } = require('../../utils/Helpers/status-http-library');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    const response = await userService.create({ displayName, email, password });

    const { password: pass, ...withoutPassword } = response; // removo o password antes de retornar as infomações;

    const codeToken = await genToken(withoutPassword);

    res.status(Created).json({ token: codeToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    return res.status(OK).json(token);
  } catch (err) {
    next(err);
  }
};

getUsers = async (_req, res, next) => {
  try {
    const token = await userService.getUsers();

    return res.status(OK).json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
}