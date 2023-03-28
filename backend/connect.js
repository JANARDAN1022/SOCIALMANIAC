const mysql = require('mysql2');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"januanji10",
    database:"social"
});

db.connect((err)=>{
    if(err) throw err;
    console.log("connected to mysql database");
})

module.exports = db;