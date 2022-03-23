const express = require('express');
const { createBlogPost, getBlogPosts, deleteBlogPost, getBlogPostById } = require('../controllers/blogPosts');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', authMiddlware, createBlogPost);
router.get('/', authMiddlware, getBlogPosts);
router.delete('/:id', authMiddlware, deleteBlogPost);
router.get('/:id', authMiddlware, getBlogPostById);

module.exports = router;