const express = require('express');
const router = express.Router();
const db = require('../db'); // Assume a database connection module

// Get cart items for a user (hardcoded user ID for simplicity)
router.get('/', async (req, res) => {
    const userId = 1; // Replace with actual user authentication
    try {
        const cartItems = await db.query(
            'SELECT * FROM OrderItems WHERE order_id = (SELECT id FROM Orders WHERE user_id = $1 AND status = $2)',
            [userId, 'pending']
        );
        res.json(cartItems.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});

// Add an item to the cart
router.post('/add/:productId', async (req, res) => {
    const userId = 1; // Replace with actual user authentication
    const { productId } = req.params;
    try {
        const order = await db.query(
            'SELECT id FROM Orders WHERE user_id = $1 AND status = $2',
            [userId, 'pending']
        );

        const orderId = order.rows[0]?.id || null;

        if (!orderId) {
            const newOrder = await db.query(
                'INSERT INTO Orders (user_id, status) VALUES ($1, $2) RETURNING id',
                [userId, 'pending']
            );
            orderId = newOrder.rows[0].id;
        }

        await db.query(
            'INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES ($1, $2, $3, (SELECT price FROM Products WHERE id = $2))',
            [orderId, productId, 1]
        );
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

// Remove an item from the cart
router.delete('/remove/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM OrderItems WHERE id = $1', [id]);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});

module.exports = router;