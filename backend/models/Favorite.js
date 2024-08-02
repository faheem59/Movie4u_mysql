const pool = require('../db/conn');

const createFavoriteTable = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS user_favorites (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                imdbID VARCHAR(20) NOT NULL,
                CONSTRAINT fk_userId FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_movieId FOREIGN KEY (imdbID) REFERENCES movies(imdbID),
                INDEX idx_user_id (user_id),
                INDEX idx_imdbID (imdbID)
            );
        `);
    } finally {
        connection.release();
    }
};



const addFavorite = async (userId, imdbID) => {
    const connection = await pool.getConnection();
    try {
        await connection.query(
            'INSERT INTO user_favorites (user_id, imdbID) VALUES (?, ?)',
            [userId, imdbID]
        );
    } finally {
        connection.release();
    }
};

// Remove a favorite movie for a user
const removeFavorite = async (userId, imdbID) => {
    const connection = await pool.getConnection();
    try {
        await connection.query(
            'DELETE FROM user_favorites WHERE user_id = ? AND imdbID = ?',
            [userId, imdbID]
        );
    } finally {
        connection.release();
    }
};

const getFavoritesByUserId = async (userId) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(`
            SELECT m.*
            FROM user_favorites uf
            JOIN movies m ON uf.imdbID = m.imdbID
            WHERE uf.user_id = ?
        `, [userId]);
        return rows;
    } finally {
        connection.release();
    }
};

const initfav = async () => {
    await createFavoriteTable();
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavoritesByUserId,
    initfav
};