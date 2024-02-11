const socket = io(); // Connect to the server

function sendMessage() {
    const input = document.getElementById('messageInput');
    socket.emit('sendMessage', { message: input.value, roomId: 'room1' }); // Example roomId
    input.value = '';
}

socket.on('newMessage', (message) => {
    const messagesList = document.getElementById('messages');
    const msgElement = document.createElement('li');
    msgElement.textContent = message.message;
    messagesList.appendChild(msgElement);
});

// Join a predefined room on connection
socket.emit('joinRoom', { roomId: 'room1', userId: 'user123' });
