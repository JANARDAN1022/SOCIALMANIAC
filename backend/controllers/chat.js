/*const db = require('../connect.js');
const jwt = require('jsonwebtoken');*/
const ChatModel = require('../Model/ChatModel');



//Send Messages
exports.sendMessage = async(req, res) => {
  try {
    // Check if chat already exists
    const chat = await ChatModel.findOne({
      members: {
        $all: [req.body.senderId, req.body.receiverId]
      }
    });
    
    if (chat) {
      // Chat already exists, return chat id
      res.status(200).json(chat._id);
    } else {
      // Create new chat document
      const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
      });
      const result = await newChat.save();
      // Return new chat id
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


/*exports.sendMessage = async(req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId]
  });

  try {
    const result= await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};*/

exports.getConversations = async(req, res) => {
try {
  const chat = await ChatModel.find({
    members:{$in :[req.params.userId]}
  })
  res.status(200).json(chat);
} catch (error) {
  res.status(500).json(error);
}
};

exports.getConversation = async(req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: {$all: [req.params.firstId, req.params.secondId]}
    })
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.DeleteConversation = async(req,res)=>{
  try{
    await ChatModel.deleteOne({
      _id: req.params.chatId,
      members: { $in: [req.params.userId] }
    });
    res.status(200).json('Conversation Deleted');
  }catch(error){
    res.status(500).json(error);
  }
}


  
