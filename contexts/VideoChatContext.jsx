jsx
import React, { useState, useRef, useContext } from "react";
import "./chat.css";

const VideoChatContext = React.createContext();

export const useVideoChat = () => useContext(VideoChatContext);

export const VideoChatProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const peer = useRef(null);
  const socket = useRef(null);
  const userVideo = useRef(null);
  const otherUserVideo = useRef(null);
  const user = useRef(null);
  const peerConnection = useRef(null);
  const otherPeerConnection = useRef(null);
  const offer = useRef(null);
  const answer = useRef(null);
  const candidate = useRef(null);
  const userVideoStream = useRef(null);
  const otherUserVideoStream = useRef(null);
  const otherUser = useRef(null);
  const userStream = useRef(null);
  const otherUserStream = useRef(null);

  const value = {
    localStream,
    remoteStream,
    peer,
    socket,
    userVideo,
    otherUserVideo,
    user,
    peerConnection,
    otherPeerConnection,
    offer,
    answer,
    candidate,
    userVideoStream,
    otherUserVideoStream,
    otherUser,
    userStream,
    otherUserStream,
    setLocalStream,
    setRemoteStream,
    createPeerConnection,
  };

  return <VideoChatContext.Provider value={value}>{children}</VideoChatContext.Provider>;

};

  const createPeerConnection = () => {
    try {
      peer.current = new RTCPeerConnection();
      peer.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("candidate", event.candidate);
        }
      };
      peer.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };
    } catch (error) {
      // Handle error
    }
  };

  const createOffer = () => {
    try {
      peer.current
        .createOffer()
        .then((offer) => {
          peer.current.setLocalDescription(offer);
          socket.current.emit("offer", offer);
        })
        .catch((error) => {
          // Handle error
        });
    } catch (error) {
      // Handle error
    }
  };

  const createAnswer = () => {
    try {
      peer.current
        .createAnswer()
        .then((answer) => {
          peer.current.setLocalDescription(answer);
          socket.current.emit("answer", answer);
        })
        .catch((error) => {
          // Handle error
        });
    } catch (error) {
      // Handle error
    }
  };

  const handleAnswer = (answer) => {
    try {
      peer.current.setRemoteDescription(answer);
    } catch (error) {
      // Handle error
    }
  };

  const handleCandidate = (candidate) => {
    try {
      peer.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      // Handle error
    }
  };

  const handleOffer = (offer) => {
    try {
      peer.current.setRemoteDescription(offer);
      createAnswer();
    } catch (error) {
      // Handle error
    }
  }
  

const configuration = {
  iceServers: [
    {
      urls: "stun:stun.stunprotocol.org",
    },
  ],
};

export { VideoChatProvider };