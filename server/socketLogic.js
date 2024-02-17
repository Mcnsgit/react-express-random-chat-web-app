const io = require('socket.io');

const socketLogic = (server);{
    const io = socketIo(server);
    
    io.on(connection'// module.exports = function socketManager(io) {
//     io.on('connection', (socket) => {
//         socket.on('joinRoom', ({ roomId, userId }) => {
//             socket.join(roomId);
//             io.to(roomId).emit('userJoined', { userId, roomId });
//         });

//         socket.on('sendMessage', (message) => {
//             io.to(message.roomId).emit('newMessage', message);
//         });

//         socket.on('disconnect', () => {
//             if (socket.roomId !== undefined) {
//                 socket.leave(socket.roomId);
//                 io.to(socket.roomId).emit('userLeft', socket.id);
//             } else {
//                 for (const roomId of Object.keys(socket.rooms)) {
//                     socket.leave(roomId);
//                 }
//             }

//             io.emit('userDisconnected', socket.id);
//         });
//     });
// };

// // Path: server/db.js
// // 
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
