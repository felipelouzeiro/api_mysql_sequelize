const express = require('express');

const app = express();
app.use(express.json());
const db = require("./database/models");
db.sequelize.sync();

app.get('/', (_req, res) => {
  res.send("Funcionando")
});

module.exports = app;