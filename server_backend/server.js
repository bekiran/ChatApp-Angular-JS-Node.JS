//require the http server
const http = require('http');
//require socket IO
var socketIO = require('socket.io');
//require express
const express = require('express')
var chatController = require('./controller/chatController')
const app = express();
const server = http.createServer(app);
var io = socketIO(server);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const route = require('../server_backend/routes/routes');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
var expressValidator = require('express-validator')
app.use(expressValidator());

// listing the connection from clients
io.on('connection', (socket) => {
    console.log("New user connected");
    //for listening the event
    socket.on('createMessage', (message) => {
        // console.log("message: in server is ", message);
        //for saving the message to database
        chatController.message(message, (err, data) => {
            if (err) {
                console.log('error---server.js 92', err);
            }
            else {
                //for sending message back to client
                io.emit('newMessageSingle', message);
            }

        })
        socket.on('disconnect', () => {
            console.log("User was disconnected");
        });
    });
});


app.use('/', route);
app.use(express.static('../client_frontend'));
//connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() =>{
    console.log("successfully connected to database");
}).catch(err => {
    console.log("could not connect to the database");
    process.exit();
});
server.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});