const db = require('../connect.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/MongoUser.js');


//register
exports.register = async(req, res) => {
 
 //MONGO-DB
  const{username,email,password,name}=req.body;
  // check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json("user already exists, Login");
  }
   const user = await UserModel.create({
    username,email,password,name
});

  //MYSQL
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) {
      // user already exists
      return res.status(409).json({message:"User already exists.Login"});
    } else {
      // create user
      //Hashed Password
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(req.body.password, salt);

      const Q = "INSERT INTO users (`username`,`email`,`password`,`name`,`mongoDbId`) VALUE (?, ?, ?, ?, ?)";
      db.query(Q, [req.body.username, req.body.email, hashedpassword, req.body.name,user._id.toString()], async(err, data) => {
        if (err) return res.status(500).json(err);
         // retrieve the inserted user's id
  const insertedUserId = data.insertId;

  // update the user in MongoDB
  await UserModel.findByIdAndUpdate(user._id, { $set: { userId: insertedUserId } });

        return res.status(200).json({message:"User created successfully.",user});
      });
    }
  });
  
 
};



//login
exports.login = (req,res)=>{
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length===0) return res.status(404).json("User Not Found");

        const checkpassword = bcrypt.compareSync(req.body.password,data[0].password);

        if(!checkpassword) return res.status(400).json("invalid UserName Or Password");

        const token = jwt.sign({id:data[0].id},process.env.SEC_KEY);

        const {password, ...others} =data[0];
          
        res.cookie("accessToken",token,{
            httpOnly: true,
           // expires: new Date(Date.now() + 10 * 1000) // Set to expire after 10 seconds
        }).status(200).json({userId:data[0].id,...others});
    })
}

//logout
exports.logout = (req,res)=>{
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User Logged Out Succesfully");
}