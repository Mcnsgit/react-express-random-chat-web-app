import { createContext, useContext, useState } from 'react';

const VideoChatContext = createContext();

export const useVideoChat = () => useContext(VideoChatContext);

export const VideoChatProvider = ({ children }) => {
    const [videoStreams, setVideoStreams] = useState({
        localStream: null,
        remoteStream: null,
    });

    const joinVideoChat = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setVideoStreams((prevState) => ({ ...prevState, localStream: stream }));
        } catch (error) {
            console.error("Error joining video chat", error);
        }
    };

    const leaveVideoChat = () => {
        setVideoStreams((prevState) => ({ ...prevState, localStream: null }));
        if (videoStreams.remoteStream) {
            videoStreams.remoteStream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <VideoChatContext.Provider value={{ ...videoStreams, joinVideoChat, leaveVideoChat, setVideoStreams }}>
            {children}
        </VideoChatContext.Provider>
    );
};

