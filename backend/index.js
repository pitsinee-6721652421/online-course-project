const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const e = require('express');
const port = 8888;

app.use(bodyParser.json());
app.use(cors());

let users = []; 
let counter = 1;
let conn = null;

// เชื่อมฐานข้อมูล
const initDBConnection = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'weddb',
        port: 3307
    });
}
// ================= GET USERS =================
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM user');
    res.json(results[0]);
});

const VALIDATE_USER = (username, password) => {
    let error =[];
    if (!username ) {
        error.push("กรุณากรอกอีเมล");
    }
    if (!password ) {
        error.push("กรุณากรอกรหัสผ่าน");
    }
    return error;
}
app.post('/register', async (req, res) => {
    const { email, password } = req.body;  // รับข้อมูลจาก ผู้ใช้
    const errors = VALIDATE_USER(email, password);
    await conn.query(
        'INSERT INTO user (email, password) VALUES (?, ?)',
        [email, password]
    );
    res.json({
        message: "Register success"
    });
});

app.post("/login", async (req,res)=>{
    const { username, password } = req.body;
    const [rows] = await conn.query(
        "SELECT * FROM user WHERE email=? AND password=?",
        [username, password]
    );
    if(rows.length > 0){
        res.json({ message:"Login success" });
    }else{
        res.json({ message:"Login fail" });
    }

});
app.post('/check-user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [results] = await conn.query(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );

        if (results.length > 0) {
            res.json({ message: "User found" });
        } else {
            res.status(401).json({ message: "User not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});


// DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const [results] = await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error.message);

        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
});
    

 const startServer = async () => {
    try {
        await initDBConnection();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error('Error starting server:', error);

    }
};
startServer();      
/*
// ================= LOGIN =================//
app.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;

        const results = await conn.query(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [username, password]
        );

        if (results[0].length === 0) {
            return res.status(401).json({
                message: "Email or Password incorrect"
            });
        }

        res.json({
            message: "Login success",
            user: results[0][0]
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });

    }
});



// ================= CREATE USER =================
app.post('/users', async (req, res) => {
    try {

        let user = req.body;

        const results = await conn.query(
            'INSERT INTO users SET ?',
            user
        );

        res.json({
            message: 'User created successfully',
            data: results[0]
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error creating user'
        });

    }
});  
 */
// ================= START SERVER =================
