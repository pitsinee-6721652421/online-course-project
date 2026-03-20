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
    console.log("DB connected ");
}
//get
app.get('/users', async (req, res) => {  // API ดึงข้อมูล user ทั้งหมด
    const results = await conn.query('SELECT * FROM user');   // ดึงข้อมูลจากตาราง user
    res.json(results[0]); // ส่งข้อมูลกลับเป็น JSON
});

const VALIDATE_USER = (username, password) => {  // ตรวจสอบข้อมูลที่ผู้ใช้กรอกมา ว่ามีค่าไหม ถ้าไม่มีจะเก็บ error ไว้ใน array แล้วส่งกลับไป
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
//post login
app.post("/login", async (req,res)=>{
    const { email, password } = req.body;
    const [rows] = await conn.query(
        "SELECT * FROM user WHERE email=? AND password=?",
        [email, password]
    );
    if(rows.length > 0){
        res.json({ message:"Login success" });
    }else{
        res.json({ message:"Login fail" });
    }

});
//post เช็คว่ามีผู้ใช้ในระบบมั้ย
app.post('/check-user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [results] = await conn.query(
            'SELECT * FROM `user` WHERE email = ? AND password = ?',
            [email, password]
        );

        if (results.length > 0) {
            res.json({ message: "User found" });
        } else {
            res.status(401).json({ message: "User not found" });
        }

    } catch (error) {
        console.error("CHECK USER ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

app.post('/user', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [results] = await conn.query(
            'INSERT INTO `user` (email, password) VALUES (?, ?)',
            [email, password]
        );

        res.json({
            message: 'User created successfully',
            id: results.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
})


//Put  แก้ไขข้อมูล user โดยใช้ id เป็นตัวระบุ
app.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { email, password } = req.body;

        const [results] = await conn.query(
            'UPDATE user SET email = ?, password = ? WHERE id = ?',
            [email, password, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.json({
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating user',
            error: error.message
        });
    }
});

// DELETE
app.delete('/user/:id', async (req, res) => {
    try {
        let id = req.params.id;

        const [results] = await conn.query(
            'DELETE FROM user WHERE id = ?',
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
        console.error(error);
        res.status(500).json({
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
