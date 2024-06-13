import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const VideoChat = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [roomId, setRoomId] = useState('');
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    socket.on('user-joined', (userId) => {
      console.log('User joined', userId);
      startCall();
    });

    socket.on('signal', (data) => {
      handleSignal(data);
    });
    

    return () => {
      socket.disconnect();
    };
  }, [handleSignal]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    const pc = new RTCPeerConnection();
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('signal', { room: roomId, candidate: event.candidate });
      }
    };
    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('signal', { room: roomId, offer });

    setPeerConnection(pc);
  };

  const handleSignal = async (data) => {
    if (data.offer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('signal', { room: roomId, answer });
    } else if (data.answer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  const joinRoom = () => {
    socket.emit('join', roomId);
  };

  return (
    <div>
      <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
      <button onClick={joinRoom}>Join Room</button>
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoChat;