const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');



exports.getComments =(req,res)=>{
    
    const q = `SELECT c.*, u.id AS userId, name, profilepicture FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postid = ? ORDER BY c.createdat DESC`;


    db.query(q,[req.query.postid],(err,data)=>{
     if(err) return res.status(500).json(err);
     return res.status(200).json(data);
    })
}

exports.postComments = (req,res)=>{

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('Login Required');
 
    jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
       if(err) return res.status(403).json("invalid Token");
 
 
    const q = `INSERT INTO comments (description, createdAt, userId, postid ) VALUES (?)`;

    const values = [
       req.body.description,
       moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),  
       userInfo.id,
       req.body.postid,
    ]
    
    db.query(q,[values],(err,data)=>{
     if(err) return res.status(500).json(err);
     return res.status(200).json("comment Created");
    })
})
}