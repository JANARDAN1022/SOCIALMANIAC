const express = require('express');
const {addRelationship,deleteRelationship,getFollowers,getFollowing} = require('../controllers/relationship.js');
const router = express.Router();

router.route("/").post(addRelationship).delete(deleteRelationship);
router.route('/followers').get(getFollowers);
router.route('/following').get(getFollowing);
module.exports = router;