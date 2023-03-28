const db = require('../connect.js');
const jwt = require('jsonwebtoken');



exports.getLikes=(req,res)=>{
    const q = `SELECT userId FROM likes WHERE postId = ?`
 
   db.query(q,[req.query.postId],(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data.map(like=>like.userId));
   })
}

exports.addLike = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('Login Required');
 
    jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
       if(err) return res.status(403).json("invalid Token");
 
 
 
    const q = `INSERT INTO likes (userId,postId) VALUES (?)`;
 
    const values = [
       userInfo.id,
       req.body.postId   
    ]
    
    db.query(q,[values],(err,data)=>{
     if(err) return res.status(500).json(err);
     return res.status(200).json("Post liked");
    })
 })
 }



 exports.deleteLike = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('Login Required');
 
    jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
       if(err) return res.status(403).json("invalid Token");
 
 
 
    const q = `DELETE FROM likes WHERE userId = ? AND postId = ?`;
 

    
    db.query(q,[userInfo.id,req.query.postId],(err,data)=>{
     if(err) return res.status(500).json(err);
     return res.status(200).json("like Deleted");
    })
 })
 }