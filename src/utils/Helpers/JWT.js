const jwt = require('jsonwebtoken');
const handlingError = require('../../utils/Helpers/handlingError');
const { Unauthorized } = require('../../utils/Helpers/status-http-library');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG);

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.data.email;
  } catch (error) {
    throw handlingError(Unauthorized, 'Expired or invalid token');
  }
};

module.exports = {
  genToken,
  validateToken,
};
