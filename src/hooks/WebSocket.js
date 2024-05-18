import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocket = ({ serverPath, children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socketIo = io(serverPath, {
            reconnectionDelayMax: 10000,
            reconnectionAttempts: Infinity,
        });

        setSocket(socketIo);

        socketIo.on('connect', () => {
            setConnected(true);
        });

        socketIo.on('disconnect', () => {
            setConnected(false);
        });

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [serverPath, socket]);

    return connected ? children(socket) : null;
};

export default WebSocket;

