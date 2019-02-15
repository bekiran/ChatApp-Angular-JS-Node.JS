'use strict'
// To include the HTTP module
const http = require('http');
// createServer() method to create an HTTP server

// To include the File System module
const fs = require('fs');

const url = require('url')

var socketIO = require('socket.io');

const express = require('express');
const cors = require('cors');

const nodemailer = require('nodemailer')
const app = express();
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


// chatapp = express();
// port = process.env.PORT || 3000;

// jsonwebtoken =require("jsonwebtoken")

app.use('/', route);
app.use(express.static('../client_frontend'));

//connection to the mongo database
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

