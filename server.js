// Only need to require these once at the top of your file
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const dotenv = require('dotenv').config(); // Loads environment variables from .env file once
const connectDB = require('./server/config/database'); // Correct path to your database configuration
const socketManager = require('./server/socketLogic'); // Assuming socketLogic.js is correctly set up

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB(); 
// Correcting the path to your modules
const app = require('./server/app'); // Make sure this path is correct
const connectDB = require('./server/config/database'); // Assuming this is relative to the current file
const socketManager = require('./server/index'); 
const middleware = require('./server/middleware/authmiddleware.js');
const server = require('./server/index');

// Connect to MongoDB
connectDB();

const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 3001;
server.Listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Utilize the socketManager for handling Socket.IO logic
socketManager(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
