const express = require('express');
const { createUser, login } = require('../controllers/users');

const router = express.Router({ mergeParams: true });
router.post('/register', createUser);
router.post('/login', login);

module.exports = router;