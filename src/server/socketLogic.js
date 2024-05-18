const socketIO = require('socket.io');

const SocketLogic = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ roomId, userId }) => {
            socket.join(roomId);
            io.to(roomId).emit('userJoined', { userId, roomId });
        });

        socket.on('sendMessage', (message) => {
            io.to(message.roomId).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            for (const roomId of socket.rooms) {
                if (roomId !== socket.id) {
                    socket.to(roomId).emit('userLeft', { userId: socket.id, roomId });
                }
            }
            io.emit('userDisconnected', socket.id);
        });
    });
};

module.exports = SocketLogic;