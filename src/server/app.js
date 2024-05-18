import { createServer } from 'http';
import express from 'express';
import { PORT } from '../config';
import socket from './lib/socket.js';

const app = express();
const server = createServer(app);

app.use('/'(`${__dirname}/../src/`));

server.listen(PORT, () => {
  socket(server);
  console.log('Server is listening at :', PORT);
});