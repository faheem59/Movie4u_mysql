const Comment = require('../models/Comments');
const User = require('../models/Users');
const Movie = require('../models/Movies');
const respondWithStatus = require('../utils/responseStatus');
const message = require('../utils/message');

exports.addComment = async (req, res) => {
    try {
        const { imdbID } = req.query;
        const { comment, rating } = req.body;
        const userId = req.user.id;

        const movie = await Movie.getMovieByImdbID(imdbID);


        if (!movie) {
            return respondWithStatus(res, 404, message.error.movieNotFound);
        }

        const user = await User.getUserById(userId);
        if (!user) {
            return respondWithStatus(res, 404, message.error.userNotFound);
        }

        await Comment.addComment(imdbID, userId, comment, rating);

        respondWithStatus(res, 201, message.success.commnetAddSuccess);
    } catch (error) {
        console.error(error);
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.getAllComments();

        if (comments.length === 0) {
            return respondWithStatus(res, 404, message.error.noCommentsFound);
        }

        respondWithStatus(res, 200, message.success.getAllcommnet, { comments });
    } catch (error) {
        console.error(error);
        respondWithStatus(res, 500, message.error.internalError);
    }
};
