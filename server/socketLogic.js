module.exports = function socketManager(io) {
    io.on('connection', (socket) => {
        socket.on('joinRoom', ({ roomId, userId }) => {
            socket.join(roomId);
            socket.to(roomId).emit('userJoined', { userId, roomId });
        });

        socket.on('sendMessage', (message) => {
            io.to(message.roomId).emit('newMessage', message);
        });

        socket.on('disconnect', () => {
            // Assuming you want to notify the room(s) the user was part of
            // Note: socket.rooms is a Set containing at least the socket ID
            for (const roomId of socket.rooms) {
                if (roomId !== socket.id) { // Skip the socket ID room
                    socket.to(roomId).emit('userLeft', { userId: socket.id, roomId });
                }
            }
            io.emit('userDisconnected', socket.id);
        });
    });
};
