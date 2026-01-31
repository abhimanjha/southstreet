const { Cart, CartItem, Product } = require('../models');
const { v4: uuidv4 } = require('uuid');

// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res, next) => {
    try {
        let cart;

        if (req.user) {
            // Authenticated user
            cart = await Cart.findOne({
                where: { userId: req.user.id },
                include: [{
                    model: CartItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product'
                    }]
                }]
            });

            if (!cart) {
                cart = await Cart.create({ userId: req.user.id });
                cart.items = [];
            }
        } else {
            // Guest user - use session ID from header
            const sessionId = req.headers['x-session-id'];

            if (!sessionId) {
                return res.json({
                    success: true,
                    data: { cart: null, items: [] }
                });
            }

            cart = await Cart.findOne({
                where: { sessionId },
                include: [{
                    model: CartItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product'
                    }]
                }]
            });
        }

        res.json({
            success: true,
            data: { cart: cart || null }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Public
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1, size, color } = req.body;

        // Verify product exists
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        let cart;

        if (req.user) {
            // Authenticated user
            cart = await Cart.findOne({ where: { userId: req.user.id } });

            if (!cart) {
                cart = await Cart.create({ userId: req.user.id });
            }
        } else {
            // Guest user
            let sessionId = req.headers['x-session-id'];

            if (!sessionId) {
                sessionId = uuidv4();
                res.setHeader('X-Session-Id', sessionId);
            }

            cart = await Cart.findOne({ where: { sessionId } });

            if (!cart) {
                cart = await Cart.create({ sessionId });
            }
        }

        // Check if item already exists in cart
        const existingItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId,
                size: size || null,
                color: color || null
            }
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            await CartItem.create({
                cartId: cart.id,
                productId,
                quantity,
                size,
                color
            });
        }

        // Fetch updated cart
        const updatedCart = await Cart.findByPk(cart.id, {
            include: [{
                model: CartItem,
                as: 'items',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        });

        res.json({
            success: true,
            message: 'Item added to cart',
            data: { cart: updatedCart }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:id
// @access  Public
const updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(req.params.id, {
            include: [{
                model: Product,
                as: 'product'
            }]
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        if (cartItem.product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({
            success: true,
            message: 'Cart item updated',
            data: { cartItem }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:id
// @access  Public
const removeFromCart = async (req, res, next) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        await cartItem.destroy();

        res.json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = async (req, res, next) => {
    try {
        let cart;

        if (req.user) {
            cart = await Cart.findOne({ where: { userId: req.user.id } });
        } else {
            const sessionId = req.headers['x-session-id'];
            if (sessionId) {
                cart = await Cart.findOne({ where: { sessionId } });
            }
        }

        if (cart) {
            await CartItem.destroy({ where: { cartId: cart.id } });
        }

        res.json({
            success: true,
            message: 'Cart cleared'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
