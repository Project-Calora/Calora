require('dotenv').config();

const express = require('express');
const cors = require('cors');
const User = require('./UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); // Allows JSON requests

// Sample API routes
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const minLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        if (!minLength || !hasNumber || !hasSpecialChar) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain a number and a special character.' });
        }

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassoword = await bcrypt.hash(password, salt);
        user = new User({ username, email, password: hashedPassoword });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.json({ message: "Login successful", token, user: { name: user.name, email: user.email } });
        console.log("username: ", user.name);
    } catch (error) { 
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
});