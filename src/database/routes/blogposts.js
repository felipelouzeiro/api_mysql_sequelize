const express = require('express');
const { createBlogPost, getBlogPosts, deleteBlogPost } = require('../controllers/blogPosts');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', authMiddlware, createBlogPost);
router.get('/', authMiddlware, getBlogPosts);
router.delete('/', authMiddlware, deleteBlogPost);

module.exports = router;