const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let users = require('./users.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sign Up endpoint
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (users.some(user => user.email === email)) {
        return res.json({ success: false, message: 'Email already exists' });
    }

    users.push({ name, email, password, role: 'user' });
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.json({ success: true });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin' && password === 'admin') {
        return res.json({ success: true, role: 'admin' });
    }

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        return res.json({ success: true, role: user.role });
    } else {
        return res.json({ success: false, message: 'Invalid email or password' });
    }
});

// Get users endpoint for admin
app.get('/users', (req, res) => {
    res.json(users);
});

// Get delet users endpoint
app.delete('/delete/:email', (req, res) => {
    const emailToDelete = req.params.email;
    users = users.filter(user => user.email !== emailToDelete);
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.json({ success: true });
});

// Get users role endpoint
app.put('/updateRole/:email', (req, res) => {
    const emailToUpdate = req.params.email;
    const newRole = req.body.role;

    const user = users.find(user => user.email === emailToUpdate);
    if (user) {
        user.role = newRole;
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'User not found' });
    }
});

// Kullanıcı kaydı endpoint'i
app.post('/signup', (req, res) => {
    const { name, email, password, role } = req.body;

    if (users.find(user => user.email === email)) {
        return res.json({ success: false, message: 'User already exists' });
    }

    users.push({ name, email, password, role });
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    res.json({ success: true });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


