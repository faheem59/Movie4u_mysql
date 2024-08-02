const pool = require('../db/conn');

// Get a movie by IMDb ID
const getMovieByImdbID = async (imdbID) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(
            'SELECT * FROM movies WHERE imdbID = ?',
            [imdbID]
        );
        return rows[0]; 
    } finally {
        connection.release();
    }
};

// Get all movies
const getAllMovies = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM movies');
        return rows; // Return an array of movie objects
    } finally {
        connection.release();
    }
};

module.exports = {
    getMovieByImdbID,
    getAllMovies
};
