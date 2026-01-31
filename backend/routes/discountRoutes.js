const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const {
    getDiscounts,
    validateDiscount,
    createDiscount,
    updateDiscount,
    deleteDiscount
} = require('../controllers/discountController');
const { discountValidation } = require('../utils/validators');

router.get('/', protect, authorize('admin'), getDiscounts);
router.get('/validate/:code', validateDiscount);
router.post('/', protect, authorize('admin'), discountValidation, createDiscount);
router.put('/:id', protect, authorize('admin'), updateDiscount);
router.delete('/:id', protect, authorize('admin'), deleteDiscount);

module.exports = router;
