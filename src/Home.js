import React, { useEffect } from 'react';
import io from 'socket.io-client'; // Ensure correct import of socket.io-client
import VideoChat from './components/video/videoChat.js';
import Options from './components/options/options.js';
import './index.css'

const Home = () => {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=; expires=Thu, 01 Jan 2050 00:00:00 GMT";
    });
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App" style={{ height: "100%", width: "100%" }}>
      <VideoChat />
      <Options />
    </div>
  );
};

export default Home;
