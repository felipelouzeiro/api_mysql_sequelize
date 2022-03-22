const express = require('express');
const router = require('./database/routes');
const catcherError = require('./database/middlewares/catcherError');

const app = express();
app.use(express.json());
// inicializa sequelize
const db = require("./database/models");
db.sequelize.sync();

app.use('/user', router);

app.get('/', (_req, res) => {
  res.send("Funcionando")
});

app.use(catcherError);

module.exports = app;