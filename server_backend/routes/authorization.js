// importing express
var express = require('express');

var router = express.Router();
var users = require('../controller/controller');
var chatController = require("../controller/chatController");
var auth = require('../authantication/auth');

try{

    router.get('/getAllUser', auth, users.getAllUser);
    router.get('/getUserMsg', auth, chatController.getUSerMsg);
}
catch(err)
{
    console.log("err found while sending token");
}

module.exports =router