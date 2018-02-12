var express  = require('express');
var session = require('express-session')
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
// var cookieParser = require('cookie-parser');

var databaseConfig = require('./config/database');
var router = require('./app/routes');

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

mongoose.connect(databaseConfig.url);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, application/json, Accept, X-Auth-Token, client-security-token, Authorization');
    next();
}

app.use(allowCrossDomain);
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' })); // Parses urlencoded bodies
app.use(bodyParser.json({limit: '10mb'})); // Send JSON responses
app.use(session({ secret: 'keyboard cat' }));
// app.use(cookieParser());
// app.use(session({ secret: 'session secret key' }));
app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

router(app);
