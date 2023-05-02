const mongoose = require('mongoose');
const db = process.env.db;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true   
}).then(()=>{
    console.log("MongoDB Connection Succesfull");
})