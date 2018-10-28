/**
 * @required packages.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');


/**
 * Middleware functions for CORS and ACAO.
 */
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'Content-Type');
    next();
});

/**
 * route handlers
 */
const addUserRoute = require('./routes/adduser');

app.get('/health',(req, res)=>{
    res.send({
        statusCode : 200, 
        message : "application is running"
    })
})
app.use(config.version, addUserRoute);

app.listen(config.PORT, () => console.log('running on port 8000'));
