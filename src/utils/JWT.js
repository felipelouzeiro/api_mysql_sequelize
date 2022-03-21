const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG);

module.exports = {
  genToken,
};
