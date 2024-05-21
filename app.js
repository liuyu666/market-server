require('dotenv').config();
// 引入必要的模块  
const express = require('express');
const mysql = require('mysql2');

// 创建Express应用  
const app = express();

// 创建MySQL连接  
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 连接到MySQL  
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');

    // 确保数据库中存在users表，此处仅作为示例，你可能需要根据实际情况创建表  
    db.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))', (err, results) => {
        if (err) throw err;
        console.log('Users table exists.');
    });
});

// 定义路由 - 显示用户列表  
app.get('/admin/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

// 启动服务器  
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
