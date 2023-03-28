const express = require('express');
const {getComments,postComments} = require('../controllers/comment.js');
const router = express.Router();

router.route(`/`).get(getComments).post(postComments);

module.exports = router;