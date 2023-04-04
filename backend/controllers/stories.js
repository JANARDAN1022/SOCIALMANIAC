const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');


exports.getStories = (req,res)=>{
    const userId= req.query.userId;
   const token = req.cookies.accessToken;
   if(!token){
      //return res.redirect("http://localhost:3000/Login");
   return res.status(401).json('Login Required');
}

   jwt.verify(token,process.env.SEC_KEY, (err,userInfo)=>{   
      if(err) return res.status(403).json("invalid Token");

      const q = `SELECT s.* FROM stories AS s 
                 INNER JOIN relationships AS r ON s.userId = r.followeduserId  WHERE s.userId = ? OR r.followeruserId = ?
                 ORDER BY s.createdAt DESC LIMIT 100`;

      db.query(q,[userInfo.id,userInfo.id],(err,data)=>{
        if(err) return res.status(500).json(err);
        const currentTime = moment().unix();
       
        const filteredData = data.filter((story) => {
          const storyCreatedAt = moment(story.createdAt, "X").unix();
          return (currentTime - storyCreatedAt) <= (24 * 60 * 60);
        
      })
      
      return res.status(200).json(filteredData);
     });
   })
}