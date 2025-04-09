const express = require('express');
const router = express.Router();
const db = require('../db'); // Assume a database connection module

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await db.query('SELECT * FROM Products');
        res.json(products.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Add a new product
router.post('/', async (req, res) => {
    const { name, description, price, stock, image_url } = req.body;
    try {
        await db.query(
            'INSERT INTO Products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5)',
            [name, description, price, stock, image_url]
        );
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Products WHERE id = $1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;