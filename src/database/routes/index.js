const express = require('express');
const { createUser } = require('../controllers/users');

const router = express.Router({ mergeParams: true });
router.post('/', createUser);

module.exports = router;