const express = require('express');
const { getUser,Updateuser ,getMongoDbUser,GetSearchedUsers,getfollowingUsers,getfollowersUsers, getUnfollowedUsers} = require('../controllers/user.js');
const router = express.Router();

router.route("/search").get(GetSearchedUsers);
router.route('/following').get(getfollowingUsers);
router.route('/followers').get(getfollowersUsers);
router.route("/").put(Updateuser);
router.route("/Suggested/:userId").get(getUnfollowedUsers);
router.route("/find/:userId").get(getUser);
router.route("/:userId").get(getMongoDbUser);




module.exports = router;