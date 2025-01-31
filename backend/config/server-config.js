const dotenv = require("dotenv");

dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_HOST :process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME:process.env.DB_NAME,
    DB_PASSWORD:process.env.DB_PASSWORD,
}