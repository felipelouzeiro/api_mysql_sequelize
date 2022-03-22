const express = require('express');
const { createUser, login, getUsers } = require('../controllers/users');

const router = express.Router({ mergeParams: true });
router.post('/', createUser);
router.post('/login', login);
router.get('/', getUsers);

module.exports = router;