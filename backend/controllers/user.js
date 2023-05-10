const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const MongoUser = require('../Model/MongoUser.js');





//get users followed
exports.getfollowingUsers = async(req,res)=>{

  try {
    const q = `SELECT * FROM users
    INNER JOIN relationships
    ON users.id = relationships.followeduserId
    WHERE relationships.followeruserId = ?
    ;
    `
    db.query(q,[req.query.followeruserId],(err,data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json(data); 
    })
  } catch (error) {
    return res.status(500).json(error);
  }
}



//get followed by users
exports.getfollowersUsers = async(req,res)=>{

  try {
    const q = `SELECT * FROM users
    INNER JOIN relationships
    ON users.id = relationships.followeruserId
    WHERE relationships.followeduserId = ?
    ;
    `
    db.query(q,[req.query.followeduserId],(err,data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json(data); 
    })
  } catch (error) {
    return res.status(500).json(error);
  }
}






//Get user MongoDb
exports.getMongoDbUser = async(req,res)=>{
    const userId = req.params.userId;
    try {
        if(!userId){
            return res.status(404).json('Invalid Id');
        }
        const user = await MongoUser.findById(userId)
        if(!user){
            return res.status(404).json('No User Found');
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Search users
exports.GetSearchedUsers = async (req, res) => {
  try {
    const query = req.query.q;
   
    const users = await MongoUser.find({
      username: { $regex: query, $options: 'i' }
    }).limit(10);
    
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};






//get user mysql
exports.getUser = (req,res)=>{
const userId = req.params.userId;
const q = `SELECT * FROM users WHERE id=?`;

db.query(q,[userId],(err,data)=>{
    if(err) return res.status(500).json(err);
    const {...info} = data[0];
    return res.json(info);
})
}


exports.Updateuser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json('Login Required');
  
    jwt.verify(token, process.env.SEC_KEY, async (err, userInfo) => {
      if (err) return res.status(403).json("invalid Token");
  
      let q = `UPDATE users SET `;
      const queryParams = [];
  
      // Check if fields were changed
      if (req.body.name) {
        q += `name=?,`;
        queryParams.push(req.body.name);
      }
  
      if (req.body.coverpicture) {
        q += `coverpicture=?,`;
        queryParams.push(req.body.coverpicture);
      }
  
      if (req.body.profilepicture) {
        q += `profilepicture=?,`;
        queryParams.push(req.body.profilepicture);
      }
  
      if (req.body.location) {
        q += `location=?,`;
        queryParams.push(req.body.city);
      }
  
      if (req.body.website) {
        q += `website=?,`;
        queryParams.push(req.body.website);
      }
  
      // Remove trailing comma from query string
      q = q.slice(0, -1);
  
      // Add user ID to query parameters
      queryParams.push(userInfo.id);
  
      q += ` WHERE id=?`;
  
      db.query(q, queryParams, async (err, data) => {
        if (err) return res.status(500).json(err);
  
        if (data.affectedRows > 0) {
          // Update MongoDB document
          const updatedUser = await MongoUser.findOneAndUpdate({ userId: userInfo.id }, req.body, { new: true });
          return res.json(updatedUser);
        } else {
          return res.status(403).json("only user can update");
        }
      });
    });
  };
  
// get all users except those who the current user is following
exports.getUnfollowedUsers = async (req, res) => {
  try {
    const userId = req.params.userId;
    const q = `
      SELECT * 
      FROM users 
      WHERE id != ? 
        AND id NOT IN (
          SELECT followeduserId 
          FROM relationships 
          WHERE followeruserId = ?
        )
        AND id NOT IN (
          SELECT followeruserId 
          FROM relationships 
          WHERE followeduserId = ?
        )
        ORDER BY RAND()
    `;
  
    db.query(q, [userId, userId, userId], (err, data) => {
      if (err) throw err;
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
  
};
