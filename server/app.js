const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/public')));

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// Catch-all handler for any other request that doesn't match.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

module.exports = app;
