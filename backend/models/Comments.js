const pool = require('../db/conn');

// Function to create the comments table
const createCommentTable = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                movie_id VARCHAR(20) NOT NULL,
                user_id INT NOT NULL,
                comment TEXT NOT NULL,
                rating INT DEFAULT 0,
                CONSTRAINT fk_fk_userId FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_fk_movieID FOREIGN KEY (movie_id) REFERENCES movies(imdbID),
                INDEX idx_user_id (user_id),
                INDEX idx_movie_id (movie_id)
            );
        `);
    } finally {
        connection.release();
    }
};

const addComment = async (movieId, userId, commentText, rating) => {
    const connection = await pool.getConnection();
    try {
        await connection.query(
            'INSERT INTO comments (movie_id, user_id, comment, rating) VALUES (?, ?, ?, ?)',
            [movieId, userId, commentText, rating]
        );
    } finally {
        connection.release();
    }
};

const getAllComments = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(`
            SELECT c.id, c.movie_id, c.user_id, c.comment, c.rating, u.name AS user_name
            FROM comments c
            JOIN users u ON c.user_id = u.id
        `);
        return rows;
    } finally {
        connection.release();
    }
};

const initComment = async () => {
    await createCommentTable();
};

module.exports = {
    addComment,
    getAllComments,
    initComment
};
