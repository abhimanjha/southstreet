const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

// Optional protect middleware - works for both authenticated and guest users
const optionalProtect = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            await protect(req, res, next);
        } else {
            next();
        }
    } catch (error) {
        next();
    }
};

router.get('/', optionalProtect, getCart);
router.post('/items', optionalProtect, addToCart);
router.put('/items/:id', optionalProtect, updateCartItem);
router.delete('/items/:id', optionalProtect, removeFromCart);
router.delete('/', optionalProtect, clearCart);

module.exports = router;
