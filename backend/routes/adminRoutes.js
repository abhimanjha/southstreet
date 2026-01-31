const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const { Order, Product, User, sequelize } = require('../models');
const { Op } = require('sequelize');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);

        // Today's revenue
        const todayOrders = await Order.findAll({
            where: {
                createdAt: { [Op.gte]: today },
                status: { [Op.in]: ['delivered', 'shipped', 'processing'] }
            }
        });
        const todayRevenue = todayOrders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);

        // This month's revenue
        const monthOrders = await Order.findAll({
            where: {
                createdAt: { [Op.gte]: thisMonth },
                status: { [Op.in]: ['delivered', 'shipped', 'processing'] }
            }
        });
        const monthRevenue = monthOrders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);

        // Active orders
        const activeOrders = await Order.count({
            where: { status: { [Op.in]: ['pending', 'processing'] } }
        });

        // Low stock items
        const lowStockItems = await Product.count({
            where: { stock: { [Op.lte]: 20 }, isActive: true }
        });

        res.json({
            success: true,
            data: {
                todayRevenue: todayRevenue.toFixed(2),
                monthRevenue: monthRevenue.toFixed(2),
                activeOrders,
                lowStockItems
            }
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Get analytics data for charts
// @route   GET /api/admin/analytics
// @access  Private/Admin
router.get('/analytics', protect, authorize('admin'), async (req, res, next) => {
    try {
        const { days = 7 } = req.query;
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(days));

        const orders = await Order.findAll({
            where: {
                createdAt: { [Op.gte]: daysAgo }
            },
            attributes: ['createdAt', 'totalAmount', 'status'],
            order: [['createdAt', 'ASC']]
        });

        // Group by day
        const analytics = {};
        orders.forEach(order => {
            const date = new Date(order.createdAt).toLocaleDateString();
            if (!analytics[date]) {
                analytics[date] = { sales: 0, orders: 0 };
            }
            if (['delivered', 'shipped', 'processing'].includes(order.status)) {
                analytics[date].sales += parseFloat(order.totalAmount);
            }
            analytics[date].orders += 1;
        });

        const data = Object.keys(analytics).map(date => ({
            name: date,
            sales: analytics[date].sales,
            orders: analytics[date].orders
        }));

        res.json({
            success: true,
            data
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
