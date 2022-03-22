const express = require('express');
const userRoute = require('./users');

const router = express.Router({ mergeParams: true });
router.use('/user', userRoute);

module.exports = router;