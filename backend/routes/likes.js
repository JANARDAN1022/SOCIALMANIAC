const express = require('express');
const {getLikes,addLike,deleteLike} = require('../controllers/like.js');
const router = express.Router();

router.route("/").get(getLikes).post(addLike).delete(deleteLike);

module.exports = router;