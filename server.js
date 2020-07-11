require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./helper/logger');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true}));

// connect the database
require('./config/database');

// CORS setting
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

    
app.use('/api/v1/', require('./routes/v1'));

app.listen(process.env.PORT, () => {
    logger.info("Server is listening on port 3000");
})