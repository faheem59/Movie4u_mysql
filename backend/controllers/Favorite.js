const Movie = require('../models/Movies');
const UserFavorites = require('../models/Favorite'); 
const message = require('../utils/message');
const respondWithStatus = require('../utils/responseStatus');

exports.addFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query;
        const userId = req.user.id;
        console.log(userId)
        const movie = await Movie.getMovieByImdbID(imdbID);
        if (!movie) {
            return respondWithStatus(res, 404, message.error.movieNotFound);
        }
        const existingFavorite = await UserFavorites.getFavoritesByUserId(userId);
        const isAlreadyFavorite = existingFavorite.some(favorite => favorite.imdbID === imdbID);

        if (isAlreadyFavorite) {
            return respondWithStatus(res, 400, message.error.movieFavExits);
        }

        await UserFavorites.addFavorite(userId, imdbID);

        respondWithStatus(res, 200, message.success.movieCreated);
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query;
        const userId = req.user.id;

        await UserFavorites.removeFavorite(userId, imdbID);

        respondWithStatus(res, 200, message.success.movieRemove);
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.getAllFavorites = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return respondWithStatus(res, 401, message.error.unauthorizedUser);
        }

        const userId = req.user.id;
        const favoriteMovies = await UserFavorites.getFavoritesByUserId(userId);

        if (!favoriteMovies || favoriteMovies.length === 0) {
            return respondWithStatus(res, 200, message.error.movieNotFound, { favorites: [] });
        }

        respondWithStatus(res, 200, message.success.fetchFavMovie, { favorites: favoriteMovies });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAllMovies();
        respondWithStatus(res, 200, message.success.fetchMovies, { movies });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};
