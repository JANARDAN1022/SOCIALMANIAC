const express = require('express');
const {getPosts,addPost,deletePost} = require('../controllers/post.js');
const router = express.Router();

router.route("/").get(getPosts).post(addPost);
router.route('/:id').delete(deletePost);

module.exports = router;
