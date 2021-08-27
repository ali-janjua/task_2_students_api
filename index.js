const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const config = require('config')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const StudentsRoutes = require('./students/routes.config')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
app.use(expressValidator());
StudentsRoutes.routesConfig(app);

// HTTPS configuration
var server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
.listen(config.port, function () {
    console.log(`Students app listening at https://localhost:${config.port}`)
})

module.exports = server