const express = require('express');
const dotenv = require('dotenv');
const relationshiproutes = require('./routes/relationship.js');
const userroutes = require('./routes/users.js');
const Postroutes = require('./routes/posts.js');
const likesroutes = require('./routes/likes.js');
const commentsroutes = require('./routes/comments.js');
const storiesroutes = require('./routes/stories.js');
const authroutes = require('./routes/auth.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');



dotenv.config({path:"C:/Users/janar/OneDrive/Desktop/SocialManiac/backend/Config/config.env"});

const app = express();

// middlewares




app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    
}));

app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/api/upload', upload.single("file"), (req,res)=>{
   const file = req.file;
    res.status(200).json(file.filename)

})

app.use('/api/users',userroutes);
app.use('/api/posts',Postroutes);
app.use('/api/likes',likesroutes);
app.use('/api/comments',commentsroutes);
app.use('/api/auth',authroutes);
app.use('/api/relationships',relationshiproutes);
app.use('/api/stories',storiesroutes);

const Port = process.env.PORT||4000;
const Hostname = "localhost";



app.listen(Port,Hostname,(err)=>{
    if(err)throw err;
    console.log(`Server is running At http://${Hostname}:${Port}`);
})