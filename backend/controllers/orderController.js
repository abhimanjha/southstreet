const { Order, OrderItem, Product, User } = require('../models');
const crypto = require('crypto');
const { Op } = require('sequelize');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const offset = (page - 1) * limit;

        const where = {};

        // If not admin, only show user's own orders
        // OR if scope='me' is requested (for admins viewing their own dashboard)
        if (req.user.role !== 'admin' || req.query.scope === 'me') {
            where.userId = req.user.id;
        }

        // Filter by status
        if (status) {
            where.status = status;
        }

        const { count, rows } = await Order.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'images']
                    }]
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                pages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product'
                    }]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }


        // Debug logs for authorization issue
        console.log('GetOrder Debug:', {
            reqUserId: req.user.id,
            reqUserRole: req.user.role,
            orderId: order.id,
            orderUserId: order.userId,
            match: order.userId === req.user.id
        });

        // Check if user owns this order (unless admin)
        const orderUserId = String(order.userId || '').trim();
        const requestUserId = String(req.user.id || '').trim();

        if (req.user.role !== 'admin' && orderUserId !== requestUserId) {
            console.log('Authorization Failed: User ID mismatch');
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this order',
                debug: {
                    reqUserId: requestUserId,
                    orderUserId: orderUserId
                }
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        const { items, shippingAddress, paymentMethod, notes, paymentResult } = req.body;

        // Calculate total amount
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found`
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            const price = product.discountPrice || product.price;
            totalAmount += price * item.quantity;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: price,
                size: item.size,
                color: item.color
            });

            // Reduce stock - MOVED to after successful order creation
            // product.stock -= item.quantity;
            // await product.save();
        }

        // Determine Payment Status and Verify Razorpay
        let paymentStatus = 'pending'; // Default for COD
        if (paymentMethod === 'Razorpay') {
            console.log('Verifying Razorpay Payment...');
            if (!paymentResult || !paymentResult.razorpay_payment_id || !paymentResult.razorpay_order_id || !paymentResult.razorpay_signature) {
                console.error('Missing Razorpay payment details');
                return res.status(400).json({
                    success: false,
                    message: 'Payment verification failed: Missing payment details'
                });
            }

            // Verify Signature
            const body = paymentResult.razorpay_order_id + "|" + paymentResult.razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_SECRET)
                .update(body.toString())
                .digest('hex');

            console.log('Signatures:', { expected: expectedSignature, received: paymentResult.razorpay_signature });

            if (expectedSignature === paymentResult.razorpay_signature) {
                paymentStatus = 'paid';
                console.log('Payment Verified Successfully');
            } else {
                console.error('Invalid Razorpay Signature');
                return res.status(400).json({
                    success: false,
                    message: 'Payment verification failed: Invalid signature'
                });
            }
        }

        // Create order
        const orderData = {
            userId: req.user.id,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus,
            notes: notes || ''
        };
        console.log('Creating Order with data:', JSON.stringify(orderData, null, 2));

        let order;
        try {
            order = await Order.create(orderData);
        } catch (createError) {
            console.error('Sequelize Create Error:', createError);
            if (createError.name === 'SequelizeValidationError') {
                const messages = createError.errors.map(e => `${e.path}: ${e.message}`).join(', ');
                return res.status(400).json({
                    success: false,
                    message: `Validation Error: ${messages}`
                });
            }
            throw createError;
        }

        // Create order items
        for (const item of orderItems) {
            await OrderItem.create({
                orderId: order.id,
                ...item
            });

            // Reduce stock (Moved here to ensure integrity)
            const product = await Product.findByPk(item.productId);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        console.log('Order created successfully:', order.id);

        // Fetch complete order with items
        const completeOrder = await Order.findByPk(order.id, {
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: completeOrder
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status, otp } = req.body;

        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // OTP Generation logic
        if (status === 'out_for_delivery' && !order.deliveryOTP) {
            // Generate 6 digit OTP
            const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            order.deliveryOTP = generatedOTP;
        }

        // OTP Verification logic
        if (status === 'delivered') {
            // If we have an OTP set, verification is required
            if (order.deliveryOTP) {
                if (!otp) {
                    return res.status(400).json({
                        success: false,
                        message: 'Delivery OTP is required to complete this order'
                    });
                }

                if (otp !== order.deliveryOTP) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid Delivery OTP'
                    });
                }
            }
        }

        order.status = status;

        // If order is delivered and payment method is COD, mark as paid
        if (status === 'delivered' && order.paymentMethod === 'COD' && order.paymentStatus === 'pending') {
            order.paymentStatus = 'paid';
        }

        await order.save();

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: { order }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel order
// @route   DELETE /api/orders/:id
// @access  Private
const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                model: OrderItem,
                as: 'items'
            }]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Check if user owns this order (unless admin)
        if (req.user.role !== 'admin' && order.userId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this order'
            });
        }

        // Can only cancel pending or processing orders
        if (!['pending', 'processing'].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel order with current status'
            });
        }

        // Restore stock
        for (const item of order.items) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.status = 'cancelled';
        await order.save();

        res.json({
            success: true,
            message: 'Order cancelled successfully',
            data: { order }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private/Admin
const getOrderStats = async (req, res, next) => {
    try {
        const totalOrders = await Order.count();
        const pendingOrders = await Order.count({ where: { status: 'pending' } });
        const processingOrders = await Order.count({ where: { status: 'processing' } });
        const shippedOrders = await Order.count({ where: { status: 'shipped' } });
        const deliveredOrders = await Order.count({ where: { status: 'delivered' } });

        // Calculate total revenue
        const orders = await Order.findAll({
            where: { status: { [Op.in]: ['delivered', 'shipped', 'processing'] } },
            attributes: ['totalAmount']
        });

        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);

        res.json({
            success: true,
            data: {
                totalOrders,
                pendingOrders,
                processingOrders,
                shippedOrders,
                deliveredOrders,
                totalRevenue
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getOrderStats
};
