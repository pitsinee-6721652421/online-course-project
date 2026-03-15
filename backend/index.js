const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// connect database
const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root",
    database: "weddb"
});

db.connect((err)=>{
    if(err){
        console.log("Database Error",err);
    }else{
        console.log("MySQL Connected");
    }
});


// LOGIN API
app.post("/login",(req,res)=>{

const {email,password} = req.body;

const sql = "SELECT * FROM users WHERE email=? AND password=?";

db.query(sql,[email,password],(err,result)=>{

if(err){
    res.status(500).send(err);
}
else if(result.length > 0){
    res.json({
        message:"Login success",
        user:result[0]
    });
}
else{
    res.status(401).json({
        message:"Email or Password incorrect"
    });
}

});

});


// API สมัครเรียน
app.post("/register",(req,res)=>{

const {name,email,course} = req.body;

const sql = "INSERT INTO students (name,email,course) VALUES (?,?,?)";

db.query(sql,[name,email,course],(err,result)=>{

if(err){
res.status(500).send(err);
}
else{
res.json({
message:"Register Success",
id:result.insertId
});
}

});

});


// API ดูรายชื่อ
app.get("/students",(req,res)=>{

db.query("SELECT * FROM students",(err,result)=>{

if(err){
res.status(500).send(err);
}
else{
res.json(result);
}

});

});


app.listen(3000,()=>{
console.log("Server running on port 3000");
});