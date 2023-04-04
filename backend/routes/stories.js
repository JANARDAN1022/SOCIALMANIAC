const express = require('express');
const {getStories} = require('../controllers/stories.js');
const router = express.Router();

router.route("/").get(getStories);

module.exports = router;