const ctr1User = require('../controller/controller')
const express = require('express');

const router = express.Router();
router.post('/login',ctr1User.login);
router.post('/register', ctr1User.register);
router.post('/forgotPassword', ctr1User.forgotPassword);

module.exports = router;