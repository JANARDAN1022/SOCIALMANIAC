const express = require('express');
const {login, register, logout} = require('../controllers/auth.js');
//const {RegisterMongoUser}= require('../controllers/Mongoauth');
const router = express.Router();




router.route("/login").post(login);
router.route('/register').post(register);
router.route("/logout").post(logout);

module.exports = router;