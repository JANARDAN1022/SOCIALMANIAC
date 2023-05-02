const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MongoUserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    unqiue:true,
  },
  email:{
     type:String,
     required:true,
     unqiue:true,
  },
  password:{
   type:String,
   required:true
  },
  name:{
    type:String,
    required:true,
  },
  userId:{
  type:Number,
  },
  coverpicture:{
    type:String,
    default:"",
  },
  profilepicture:{
  type:String,
  default:"",
  },
  location:{
    type:String,
  },
  website:{
    type:String,
  }
},
{
    timestamps:true,
});
MongoUserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});
const MongoUserModel = mongoose.model("Users",MongoUserSchema);
module.exports = MongoUserModel