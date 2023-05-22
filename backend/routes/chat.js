const router = require('express').Router();
const {sendMessage,getConversations,getConversation,DeleteConversation} = require('../controllers/chat');



router.route('/').post(sendMessage);
router.route('/:userId').get(getConversations);
router.route('/find/:firstId/:secondId').get(getConversation);
router.route('/Delete/:chatId/:userId').delete(DeleteConversation);




module.exports = router;