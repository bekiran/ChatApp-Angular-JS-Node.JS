'use strict'
// To include the HTTP module
const http = require('http');
// createServer() method to create an HTTP server

// To include the File System module
const fs = require('fs');
const url = require('url')
var socketIO = require('socket.io');
const express = require('express');
var chatController = require ('./controller/chatController');
constserver = http.createServer(app);
var io = require('socket.io')
const cors = require('cors');
const nodemailer = require('nodemailer')
const app = express();


// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();


// creating a jwt token
// var jwt = require('jwt-simple');

// var payload = { userId: 1 };
// var secret = 'fe1a1915a379f3be5394b64d14794932';
// var token = jwt.encode(payload, secret);
// console.log(token);

// // decoding the generated jwt token
// var decode = jwt.decode(token, secret);
// console.log(decode);



app.use(cors())
const server = http.createServer(app);
var io = socketIO(server);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const route = require('../server_backend/routes/routes');
const dbConfig = require('./config/database.config');
const mongo = require('mongodb');
const mongoose = require('mongoose');
var expressValidator = require('express-validator')
app.use(expressValidator());


app.use('/', route);
app.use(express.static('../client_frontend'));

//connection to the mongo database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("successfully connected to database");
}).catch(err => {
    console.log("could not connect to the database");
    process.exit();
});
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

app.get('/forgotPassword', function (req, res) {
    res.send('<form action="/passwordreset" method="POST">' +
        '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
        '<input type="submit" value="Reset Password" />' +
        '</form>');
});
