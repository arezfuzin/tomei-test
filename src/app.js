require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routers');
const log = require('./utils/logger');
const db = require('./database');

(async () => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    try {
        await db.sequelize.authenticate();
        log.info('Connection has been established successfully.');
    } catch (error) {
        log.info(`Unable to connect to the database: ${JSON.stringify(error)}`);
    }
    
    app.use('/', router);
    
    const port = process.env.PORT || 3000;
    
    app.listen(port);
    log.info(`listening on http://localhost:${port}`);
})();

module.exports = app;

