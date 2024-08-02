// models/user.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/conn');
const serverConfig = require('../config/server-config');

const secret = serverConfig.JWT_SECRET;

const createUsersTable = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
    } finally {
        connection.release();
    }
};

const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    try {
        await connection.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
    } finally {
        connection.release();
    }
};

const getUserByEmail = async (email) => {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows.length > 0 ? rows[0] : null;
    } finally {
        connection.release();
    }
};
const getUserById = async (id) => {
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    } finally {
        connection.release();
    }
};

const comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};

const generateJwtToken = (userId) => {
    return jwt.sign({ id: userId }, secret, {
        algorithm: 'HS256',
        expiresIn: '2h',
    });
};

const init = async () => {
    await createUsersTable();
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    comparePassword,
    generateJwtToken,
    init
};
