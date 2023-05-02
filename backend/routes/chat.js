const router = require('express').Router();
const {sendMessage,getConversations,getConversation} = require('../controllers/chat');



router.route('/').post(sendMessage);
router.route('/:userId').get(getConversations);
router.route('/find/:firstId/:secondId').get(getConversation);




module.exports = router;