require('dotenv').config();

const express = require('express');
const cors = require('cors');

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