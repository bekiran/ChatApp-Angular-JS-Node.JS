const ctr1User = require('../controller/controller')
const express = require('express');
// const authroutes = require('../authantication/auth');
const router = express.Router();
router.post('/login',ctr1User.login);
router.post('/register', ctr1User.register);
// router.use('auth',authroutes);
module.exports = router;