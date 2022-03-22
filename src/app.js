const express = require('express');
const router = require('./database/routes');

const app = express();
app.use(express.json());
const db = require("./database/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use('/user', router);

app.get('/', (_req, res) => {
  res.send("Funcionando")
});

module.exports = app;