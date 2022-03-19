require('dotenv').config()
const Sequelize = require('sequelize');
console.log(process.env)


const USER_DB = process.env.USER_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;

const connection = new Sequelize('admissions_bank', USER_DB, PASSWORD_DB, {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = connection;