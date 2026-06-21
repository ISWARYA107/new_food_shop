const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Customer routes
router.post('/', protect, placeOrder);
router.get('/my', protect, getMyOrders);

// Admin routes
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

// Shared (owner or admin) - keep below /my and /:id/status so they don't collide
router.get('/:id', protect, getOrderById);

module.exports = router;
