const {generateJwtToken} = require('../models/Users')
const sendToken = (user, statusCode, res) => {
    const token = generateJwtToken(user.id);
    // const options = {
    //     httpOnly: true,
    //     secure: false,   // Set to true if using HTTPS
    //     sameSite: 'None',
    //     path: '/',// Allows cross-origin cookies
    //     maxAge: 3600000
    // };
    
    return res.status(statusCode)
        .setHeader('token', token)
        .json({
            success: true,
            user,
            token
        });
};
module.exports = sendToken;