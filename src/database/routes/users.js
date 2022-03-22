const express = require('express');
const { createUser, login, getUsers } = require('../controllers/users');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', createUser);
router.post('/login', login);
router.get('/', authMiddlware,getUsers);

module.exports = router;