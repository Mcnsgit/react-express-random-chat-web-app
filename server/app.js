const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const router = express.Router();
const verifyToken = require('./middleware/authmiddleware.js');
const mongoose = require('mongoose');
// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: "Access to protected data" });
});
dotenv.config( { path: './.env' } );

module.exports = router;


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

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

module.exports = app;
// Path: server/db.js
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
  } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
  }
};

module.exports = connectDB;
