const express = require('express');
const { getUser,Updateuser ,getMongoDbUser} = require('../controllers/user.js');
const router = express.Router();

router.route("/find/:userId").get(getUser);
router.route("/").put(Updateuser)
router.route("/:userId").get(getMongoDbUser);

module.exports = router;