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

// Load environment variables
require('dotenv').config();

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};



// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Define routes
app.use('/api/auth', require('./routes/authRoutes')); // Adjust the path as necessary
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Connect to database
connectDB();

// Create HTTP server and configure Socket.IO
// const httpServer = http.createServer(app);
// const io = new Server(httpServer);

// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => console.log('User disconnected'));
//   // Additional Socket.IO event handling
// });

// Listen on port from environment variable or default
// const PORT = process.env.PORT || 3001;
// httpServer.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



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
