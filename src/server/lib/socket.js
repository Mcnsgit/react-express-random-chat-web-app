
import io from 'socket.io';
import { create, get, remove } from './users.js';

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
function initSocket(socket) {
  let id;
  socket
    .on('init', async () => {
      id = await create(socket);
      if (id) {
        socket.emit('init', { id });
      } else {
        socket.emit('error', { message: 'Failed to generating user id' });
      }
    })
    .on('request', (data) => {
      const receiver = get(data.to);
      if (receiver) {
        receiver.emit('request', { from: id });
      }
    })
    .on('call', (data) => {
      const receiver = get(data.to);
      if (receiver) {
        receiver.emit('call', { ...data, from: id });
      } else {
        socket.emit('failed');
      }
    })
    .on('end', (data) => {
      const receiver = get(data.to);
      if (receiver) {
        receiver.emit('end');
      }
    })
    .on('disconnect', () => {
      remove(id);
      console.log(id, 'disconnected');
    });
}
const initSocketServer = (server) => {
  const ioInstance = io(server, { path: '/bridge', serveClient: false });
  ioInstance.on('connection', initSocket);
  return ioInstance;
};

export default initSocketServer;

