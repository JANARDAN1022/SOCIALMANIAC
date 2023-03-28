const express = require('express');
const {getRelationship,addRelationship,deleteRelationship} = require('../controllers/relationship.js');
const router = express.Router();

router.route("/").get(getRelationship).post(addRelationship).delete(deleteRelationship);

module.exports = router;