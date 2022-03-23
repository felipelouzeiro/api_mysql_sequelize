const express = require('express');
const { createBlogPost, getBlogPosts, deletePost } = require('../controllers/blogPosts');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', authMiddlware, createBlogPost);
router.get('/', authMiddlware, getBlogPosts);
router.delete('/', authMiddlware, deletePost);

module.exports = router;