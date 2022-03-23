const express = require('express');
const router = require('./api/routes');
const catcherError = require('./api/middlewares/catcherError');

const app = express();
app.use(express.json());
// inicializa sequelize
const db = require("./api/models");
db.sequelize.sync();

app.use(router);

app.get('/', (_req, res) => {
  res.send("Funcionando")
});

app.use(catcherError);

module.exports = app;