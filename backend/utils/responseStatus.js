const respondWithStatus = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message,
        ...data
    });
};

module.exports = respondWithStatus;