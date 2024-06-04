const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/category', authMiddleware, createCategory);
router.get('/categories', authMiddleware, getCategories);
router.put('/category/:categoryId', authMiddleware, updateCategory);
router.delete('/category/:categoryId', authMiddleware, deleteCategory);

module.exports = router;