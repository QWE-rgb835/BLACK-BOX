// Database Connection Module
const { Pool } = require('pg');

// Configure the database connection
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'ecommerce',
    password: 'your_password',
    port: 5432, // Default PostgreSQL port
});

// Query helper function
const query = async (text, params) => {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } finally {
        client.release();
    }
};

module.exports = {
    query,
};