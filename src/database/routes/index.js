const express = require('express');
const userRoute = require('./users');
const categoryRoute = require('./categories');

const router = express.Router({ mergeParams: true });
router.use('/user', userRoute);
router.use('/categories', categoryRoute);

module.exports = router;