import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const App = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [message, setMessage] = useState('');
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]); // Initialize messages state
  const socketRef = useRef(null); // Use ref for socket to persist the instance
  const peerConnectionRef = useRef(null); // Use ref for peerConnection to persist the instance

  useEffect(() => {
    const newSocket = io('https://localhost:3000');
    socketRef.current = newSocket;
    newSocket.on('connect', () => {
      newSocket.emit('joinRoom', { roomId: 'room1', userId: 'user123' });
    });
    newSocket.on('newMessage', (message) => {
      setMessages(messages => [...messages, message]);
    });

    const setupMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        peerConnectionRef.current = new RTCPeerConnection();
        stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
        peerConnectionRef.current.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            newSocket.emit('candidate', event.candidate);
          }
        };
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupMediaDevices();

    return () => {
      if (newSocket) {
        newSocket.close();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const createOffer = async () => {
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', offer);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const stopPeerConnection = () => {
    peerConnectionRef.current.close();
    peerConnectionRef.current = new RTCPeerConnection();
  };

  const sendMessage = () => {
    socketRef.current.emit('sendMessage', { message, roomId: 'room1' });
    setMessage('');
  };

  const addAsFriend = () => {
    setFriends(friends => [...friends, 'user456']);
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
      <div>
        <button onClick={createOffer}>Start</button>
        <button onClick={stopPeerConnection}>Stop</button>
        <button onClick={sendMessage}>Send</button>
        <button onClick={addAsFriend}>Add as friend</button>
      </div>
      <ul>
        {friends.map(friend => <li key={friend}>{friend}</li>)}
      </ul>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      {/* Add messages here */}
      <ul>
        {messages.map((msg, index) => <li key={index}>{msg}</li>)}
      </ul>
    </div>
  );
};

export default App;
