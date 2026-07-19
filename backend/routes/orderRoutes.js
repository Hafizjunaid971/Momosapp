const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  trackGuestOrder,
  trackOrdersByPhone
} = require('../controllers/orderController');
const { protect, adminOnly, optionalAuth } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, createOrder);
router.post('/guest/track', trackGuestOrder);
router.post('/guest/track-by-phone', trackOrdersByPhone);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;