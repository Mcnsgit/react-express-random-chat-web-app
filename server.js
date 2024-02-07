import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from '/server/app.js'; // Adjust the path as necessary

dotenv.config();

const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('signal', (data) => {
    io.emit('signal', data);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
