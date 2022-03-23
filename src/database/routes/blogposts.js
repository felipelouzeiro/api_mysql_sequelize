const express = require('express');
const { createBlogPost } = require('../controllers/blogPosts');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', authMiddlware, createBlogPost);

module.exports = router;