const express = require('express');
const { createBlogPost, getBlogPosts } = require('../controllers/blogPosts');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', authMiddlware, createBlogPost);
router.get('/', authMiddlware, getBlogPosts);

module.exports = router;