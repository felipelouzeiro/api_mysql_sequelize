const handlingError = require('../../utils/Helpers/handlingError');
const { validateToken } = require('../../utils/Helpers/JWT');
const { Unauthorized } = require('../../utils/Helpers/status-http-library');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) { throw handlingError(Unauthorized, 'Token not found'); }

    const validate = validateToken(authorization);

    if (!validate) { throw handlingError(Unauthorized, 'Expired or invalid token'); }

    const user = await User.findOne({ where: { email: validate } });
    req.user = user;
  } catch (error) {
    next(error);
  }
  next();
};