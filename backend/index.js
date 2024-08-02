const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require('body-parser');
const connectToDB = require("./db/conn")
const user = require("./routes/user");
const cookieParser = require('cookie-parser')
const favorite = require('./routes/favorite')
const comment = require('./routes/comment');
const serverConfig = require('./config/server-config');
const pool = require('./db/conn');
const { init} = require('./models/Users'); 
const { initfav } = require('./models/Favorite');
const { initComment } = require('./models/Comments');

(async () => {
    try {
        await init();
        await initfav();
        await initComment();
        console.log('Database tables initialized');
    } catch (error) {
        console.error('Error initializing tables:', error);
    }
})();

pool.getConnection()

    




app.use(bodyParser.json());
app.use(cors({
    origin: true, // Accepts any origin (for testing purposes)
    credentials: true 
}));
app.use(cookieParser());
app.use('/api', user);
app.use('/api', favorite)
app.use('/api', comment)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(serverConfig.PORT, () => {
    console.log(`Server is runnig ${serverConfig.PORT}`);
})




