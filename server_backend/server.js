// 'use strict'
// To include the HTTP module
const http = require('http');
// To include the File System module
const fs = require('fs');
const url = require('url')
var express = require('express');
const app = express();

var socketIO = require('socket.io');
var chatController = require('./controller/chatController');
const server = http.createServer(app);
var io = socketIO(server);

//port number
const port = 3000
const database = require('./config/database.config')
const mongoose = require('mongoose');
const route = require('../server_backend/routes/routes');
/*body-parser parses your request and converts it into a 
format from which you can easily extract relevant information that you may need.*/
const bodyParser = require('body-parser');

/*Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
and exposes the resulting object (containing the keys and values) on req.body.*/
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as JSON and exposes the resulting object on req.body.
app.use(bodyParser.json());
var expressValidator = require('express-validator')
app.use(expressValidator());
io.on('connection', (socket) => {
    console.log("New user connected");

    so.on('createMessage', (message) => {
        chatController.message(message, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(message + " in server")
                io.emit('newMessageSingle', message);
            }
        })
        socket.on('disconnect', () => {
            console.log("User is Disconnected")
        });
    });
});

app.use('/', route);

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

const cors = require('cors');
app.use(cors())

// const server = http.createServer(app);
var io = socketIO(server);


const dbConfig = require('./config/database.config');
const mongo = require('mongodb');

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

const nodemailer = require('nodemailer')

app.get('/forgotPassword', function (req, res) {
    res.send('<form action="/passwordreset" method="POST">' +
        '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
        '<input type="submit" value="Reset Password" />' +
        '</form>');
});
