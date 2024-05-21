// ... 之前的代码 ...  

// 获取所有用户  
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 获取单个用户  
app.get('/users/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('User not found');
        }
    });
});

// 创建新用户  
app.post('/users', (req, res) => {
    const name = req.body.name; // 假设请求体中包含用户的名字  
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User created successfully' });
    });
});

// 更新用户  
app.put('/users/:id', (req, res) => {
    const name = req.body.name; // 假设请求体中包含新的名字  
    const id = req.params.id;
    db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).send('User not found');
        }
    });
});

// 删除用户  
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).send('User not found');
        }
    });
});

// ... 之前的代码 ...