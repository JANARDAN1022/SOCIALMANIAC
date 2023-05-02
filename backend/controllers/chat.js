/*const db = require('../connect.js');
const jwt = require('jsonwebtoken');*/
const ChatModel = require('../Model/ChatModel');



//Send Messages
exports.sendMessage = async(req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId]
  });

  try {
    const result= await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

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


  
