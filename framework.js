require('./api/data/db.js');
let express = require('express');
const https = require('https');
const fs = require('fs');
let forceSsl = require('express-force-ssl');

const options = {
    key: fs.readFileSync('credentials/key.pem'),
    cert: fs.readFileSync('credentials/cert.pem')
};

let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let routes = require('./api/routes');

app.use(function(req, res, next) {
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',routes);

app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(forceSsl);

https.createServer(options, app).listen(443);