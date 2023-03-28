const db = require('../connect.js');
const jwt = require('jsonwebtoken');
//const moment = require('moment/moment.js');
const moment = require('moment');


exports.getPosts = (req,res)=>{
   const userId= req.query.userId;
   const token = req.cookies.accessToken;
   if(!token) return res.status(401).json('Login Required');

   jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
      if(err) return res.status(403).json("invalid Token");



   const q = userId?`SELECT p.*, u.id AS userId, name, profilepicture FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ?`: `SELECT p.*, u.id AS userId, name, profilepicture FROM posts AS p JOIN users AS u ON (u.id = p.userId)
   LEFT JOIN relationships AS r ON (p.userId = r.followeduserId ) WHERE r.followeruserId=? OR p.userId=?
   ORDER BY p.createdat DESC`;
   
   db.query(q,[userId? userId:userInfo.id,userInfo.id],(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
   })
})
}

exports.addPost = (req,res)=>{
   const token = req.cookies.accessToken;
   if(!token) return res.status(401).json('Login Required');

   jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
      if(err) return res.status(403).json("invalid Token");



   const q = `INSERT INTO posts (description, img, userid, createdat) VALUES (?)`;

   const values = [
      req.body.description,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
   ]
   
   db.query(q,[values],(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json("Post Created");
   })
})
}

exports.deletePost = (req,res)=>{
   const token = req.cookies.accessToken;
   if(!token) return res.status(401).json('Login Required');

   jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
      if(err) return res.status(403).json("invalid Token");



   const q = `DELETE FROM posts WHERE id = ? AND userId = ?`;

 
   db.query(q,[req.params.id,userInfo.id],(err,data)=>{
     if(err) return res.status(500).json(err);
    if(data.affectedRows>0)return res.status(200).json("POST DELETED");
    return res.status(403).json("cannot delete this post only user can");
   })
})
}