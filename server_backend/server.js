/***
 * purpose: Server application starts from here
 * 
 * file: server.js
 * @overview : import all required packages here.
 * @author: bekiranabbi@gmail.com
 * @version : 1.0
 * @since : 07.02.2019
 * 
 */


 // To include the HTTP module
const http = require('http');

// to include all modules or all files
//which allows us to support HTTP protocol and socket.IO
const express = require('express');
const app = express();

// app.listen(3000, () => {
//     console.log('Server started!');
// });

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

//imporing socket io to get connection between client and server
var socketIO = require('socket.io');
var chatController = require('./controller/chatController');

// const server = http.createServer(app)

const mongoose = require('mongoose');
const route = require('../server_backend/routes/routes');

var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})


// const server = http.createServer(app);
const io = require('socket.io')(server);


//checking for events. connecton will be listening for incoming sockets.
io.on('connection', function (socket) {
    console.log("Connected socket!");
    //started listening events. socket.on waits for the event. whenever that event is triggered the callback
    //function is called.
    socket.on('createMessage', function (message) {
        //saving message to db
        chatController.message(message, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(message + " in server")
                //io.emmit is used to emit the message to all sockets connected to it.
                io.emit('newMessageSingle', message);
            }
        })
        // socket emmits disconnect event which will be called whenever client disconnected.
        socket.on('disconnect', function () {
            console.log("Socket Disconnected!")
        });
    });
});

app.use('/', route); // calling router

app.use(express.static('client_frontend'));



const cors = require('cors');
app.use(cors())


// const server= http.createServer(app);
// var io = socketIO(server);


const dbConfig = require('./config/database.config');

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

