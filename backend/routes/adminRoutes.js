const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Dashboard Stats
router.get('/stats', async (req, res) => {
    try {
        // These would be real queries in a production app
        // Example: SELECT SUM(total_amount) as total FROM orders WHERE date = CURDATE()
        res.json({
            todayRevenue: 3450,
            monthRevenue: 124500,
            activeOrders: 45,
            lowStockItems: 8,
            revenueChange: '+12.5%',
            ordersChange: '+5%'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Analytics Data (Charts)
router.get('/analytics', async (req, res) => {
    const { days } = req.query; // 7 or 30
    try {
        // Mock data for now, would query DB based on 'days'
        const data = days === '30' ? [
            { name: 'Week 1', sales: 15400, orders: 120 },
            { name: 'Week 2', sales: 12200, orders: 98 },
            { name: 'Week 3', sales: 18900, orders: 145 },
            { name: 'Week 4', sales: 21000, orders: 160 },
        ] : [
            { name: 'Mon', sales: 4000, orders: 24 },
            { name: 'Tue', sales: 3000, orders: 18 },
            { name: 'Wed', sales: 2000, orders: 29 },
            { name: 'Thu', sales: 2780, orders: 23 },
            { name: 'Fri', sales: 1890, orders: 15 },
            { name: 'Sat', sales: 2390, orders: 38 },
            { name: 'Sun', sales: 3490, orders: 43 },
        ];
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Orders Management
router.get('/orders', async (req, res) => {
    const { page = 1, status, search } = req.query;
    try {
        // Real logic would include LIMIT and OFFSET for pagination
        // and WHERE clauses for filtering and searching
        res.json({
            orders: [], // Array of orders
            total: 0,
            pages: 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Order Status Update
router.put('/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        // await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Low Stock Products
router.get('/low-stock', async (req, res) => {
    try {
        // SELECT * FROM products WHERE stock < threshold
        res.json([]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
