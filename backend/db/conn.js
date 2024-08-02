// const mysql = require('mysql2/promise');
// const serverConfig = require('../config/server-config');

// const connectToDB = async () => {
//     try {
//         const connection = await mysql.createConnection({
//             host: serverConfig.DB_HOST,
//             user: serverConfig.DB_USER,
//             password: serverConfig.DB_PASSWORD,
//             database: serverConfig.DB_NAME
//         });

//         console.log('Connected to MySQL');
//         return connection;
//     } catch (error) {
//         console.error('Error connecting to MySQL:', error);
//         throw error;
//     }
// };

// module.exports = connectToDB;
// db.js
const mysql = require('mysql2/promise');
const serverConfig = require('../config/server-config');

const pool = mysql.createPool({
    host: serverConfig.DB_HOST,
    user: serverConfig.DB_USER,
    password: serverConfig.DB_PASSWORD,
    database: serverConfig.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
