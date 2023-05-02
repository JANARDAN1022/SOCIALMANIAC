const router = require('express').Router();
const {addMessage,getMessages}=require('../controllers/Message');


router.route('/').post(addMessage);
router.route('/:chatId').get(getMessages);


module.exports = router;