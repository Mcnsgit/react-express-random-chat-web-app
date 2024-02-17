import React, {createContext, useState} from "react";

export const VideoChatContext = createContext({});

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
}
return (
    <VideoChatContext.Provider value={{localStrea, userVideo, otherUser}}></VideoChatContext.Provider> 

    
