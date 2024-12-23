const express = require('express');
const app = express();
const PORT = process.env.GPSD_API_GATEWAY_PORT;

global.tokenBlacklist = new Set(); // Blacklist for revoked tokens
global.refreshTokens = new Map(); // Map to store valid tokens

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Basic route
app.get('/api/', (req, res) => {
    res.status(200).json({ message: 'API Gateway is running.' });
});

// Routes
app.use('/api/user/login', require('./routes/login'));
app.use('/api/user/register', require('./routes/register'));
app.use('/api/user/refresh', require('./routes/refresh'));
app.use('/api/user/logout', require('./routes/logout'));

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

