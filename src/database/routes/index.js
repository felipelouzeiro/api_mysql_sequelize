const express = require('express');
const userRoute = require('./users');
const categoryRoute = require('./categories');
const blogPostRoute = require('./blogposts');

const router = express.Router({ mergeParams: true });
router.use('/user', userRoute);
router.use('/categories', categoryRoute);
router.use('/blogpost', blogPostRoute);

module.exports = router;