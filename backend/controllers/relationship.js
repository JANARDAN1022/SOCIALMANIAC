const db = require('../connect.js');
const jwt = require('jsonwebtoken');




//Get Followers of user
exports.getFollowers=(req,res)=>{
   const q = `SELECT followeruserId FROM relationships WHERE followeduserId = ?`

  db.query(q,[req.query.followeduserId],(err,data)=>{
   if(err) return res.status(500).json(err);
   return res.status(200).json(data.map(relationship=>relationship.followeruserId));
  })
}

//Get Following users
exports.getFollowing=(req,res)=>{
  const q = `SELECT followeduserId FROM relationships WHERE followeruserId = ?`

  db.query(q,[req.query.followeruserId],(err,data)=>{
   if(err) return res.status(500).json(err);
   return res.status(200).json(data.map(relationship=>relationship.followeduserId));
  })
}

//Add To Following
exports.addRelationship = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('Login Required');
 
    jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
       if(err) return res.status(403).json("invalid Token");
 
 
 
    const q = `INSERT INTO relationships (followeruserId,followeduserId) VALUES (?)`;
 
    const values = [
       userInfo.id,
       req.body.userId   
    ]
    
    db.query(q,[values],(err,data)=>{
     if(err) return res.status(500).json(err);
     return res.status(200).json("Following user");
    })
 })
 }


//Remove From Following
 exports.deleteRelationship = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('Login Required');
 
    jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{
       if(err) return res.status(403).json("invalid Token");
 
 
 
    const q = `DELETE FROM relationships WHERE followeruserId = ? AND followeduserId = ?`;
 

    
    db.query(q,[userInfo.id,req.query.userId],(err,data)=>{
     if(err) return res.status(500).json(err);
     return res.status(200).json("Unfollowed user");
    })
 })
 }

