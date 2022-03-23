const { genToken } = require('../../utils/Helpers/JWT');
const userService = require('../services/users');
const { Created, OK, NoContent } = require('../../utils/Helpers/status-http-library');

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

const getUsers = async (_req, res, next) => {
  try {
    const token = await userService.getUsers();

    return res.status(OK).json(token);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await userService.findById(id);

    res.status(OK).json(response);
  } catch (error) {
    next(error);
  }
};

const deleleMyUser = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    console.log(userId);

    await userService.deleteMyUser(userId);

    res.status(NoContent).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  findById,
  deleleMyUser,
}