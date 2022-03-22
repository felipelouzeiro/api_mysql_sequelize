const express = require('express');
const { createUser, login, getUsers, findById, deleleMyUser } = require('../controllers/users');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', createUser);
router.post('/login', login);
router.get('/', authMiddlware, getUsers);
router.get('/:id', authMiddlware, findById);
router.delete('/:id', authMiddlware, deleleMyUser);

module.exports = router;