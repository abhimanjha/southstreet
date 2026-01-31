const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getOrderStats
} = require('../controllers/orderController');
const { orderValidation } = require('../utils/validators');

router.get('/stats', protect, authorize('admin'), getOrderStats);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.post('/', protect, orderValidation, createOrder);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.delete('/:id', protect, cancelOrder);

module.exports = router;
