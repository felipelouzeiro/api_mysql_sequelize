const express = require('express');
const { createCategory, getCategories } = require('../controllers/categories');
const authMiddlware = require('../middlewares/authMiddlware');

const router = express.Router({ mergeParams: true });
router.post('/', authMiddlware, createCategory);
router.get('/', authMiddlware, getCategories);

module.exports = router;