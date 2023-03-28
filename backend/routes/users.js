const express = require('express');
const { getUser,Updateuser } = require('../controllers/user.js');
const router = express.Router();

router.route("/find/:userId").get(getUser);
router.route("/").put(Updateuser)

module.exports = router;