const db = require('../connect.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
exports.register = (req, res) => {
  // check if user already exists
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length) {
      // user already exists
      return res.status(409).json("User already exists.Login");
    } else {
      // create user
      // hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(req.body.password, salt);

      const Q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?, ?, ?, ?)";
      db.query(Q, [req.body.username, req.body.email, hashedpassword, req.body.name], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User created successfully.");
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
        }).status(200).json(others);
    })
}

//logout
exports.logout = (req,res)=>{
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User Logged Out Succesfully");
}