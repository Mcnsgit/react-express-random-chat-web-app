const http = require('http');
const { Server } = require('socket.io');
const app = require('./app'); // Adjust this path if your app.js is located elsewhere
const dotenv = require('dotenv');

const connectDB = require('./config/database');  
const socketManager = require('./socketLogic');
const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');

dotenv.config();

// server.js
const httpServer = createServer(app);

// Load environment variables from .env file
dotenv.config( { path: '../.env' } );
require('dotenv').config();


const server = http.createServer(app);
const io = new Server(server);



io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('signal', (data) => {
        io.emit('signal', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// Configure dotenv


// socketManager(io);

// httpServer.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// // Path: server/socketLogic.js
module.exports = function socketManager(io) {
    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ roomId, userId }) => {
            socket.join(roomId);
            io.to(roomId).emit('userJoined', { userId, roomId });
        });

        socket.on('sendMessage', (message) => {
            io.to(message.roomId).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            if (socket.roomId !== undefined) {
                socket.leave(socket.roomId);
                io.to(socket.roomId).emit('userLeft', socket.id);
            } else {
                for (const roomId of Object.keys(socket.rooms)) {
                    socket.leave(roomId);
                }
            }

            io.emit('userDisconnected', socket.id);
        });
    });
};

// Path: server/db.js
// path: server/in