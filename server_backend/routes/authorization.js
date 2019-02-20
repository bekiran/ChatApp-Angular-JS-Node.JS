// importing express
var express = require('express');

var router = express.Router();
var users = require('../controller/controller');
var chatController = require("../controller/chatController");
var auth = require('../authantication');

try{

    router.get('/getAllUser', auth, users.getAllUser);
    router.get('/getUserMsg', auth, chatController.getUSerMsg);
}
catch(err)
{
    console.log("err found while receving token - authorization.js");
}

module.exports =router