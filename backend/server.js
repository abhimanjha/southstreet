const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('SouthStreet API is running...');
});

// Database Connection Check API
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1');
        res.json({ status: 'ok', message: 'Database connected', result: rows });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Database connection failed', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
