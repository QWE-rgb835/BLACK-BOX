const express = require('express');
const router = express.Router();
const db = require('../db'); // Assume a database connection module

// Fetch orders for admin
router.get('/orders', async (req, res) => {
    try {
        const orders = await db.query(
            'SELECT Orders.id, Users.username, Orders.order_date, Orders.total_amount FROM Orders JOIN Users ON Orders.user_id = Users.id'
        );
        res.json(orders.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Update stock of a product
router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    try {
        await db.query('UPDATE Products SET stock = $1 WHERE id = $2', [stock, id]);
        res.json({ message: 'Stock updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update stock' });
    }
});

module.exports = router;