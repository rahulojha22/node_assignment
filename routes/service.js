const express = require('express');
const {
  createService,
  getServices,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/category/:categoryId/service', authMiddleware, createService);
router.get('/category/:categoryId/services', authMiddleware, getServices);
router.put('/category/:categoryId/service/:serviceId', authMiddleware, updateService);
router.delete('/category/:categoryId/service/:serviceId', authMiddleware, deleteService);

module.exports = router;