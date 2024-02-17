// import React, { useEffect, useRef } from "react";


// const VideoBox = ({ stream, isLocal }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);
//   return <video ref={videoRef} autoPlay muted={isLocal} playsInline />;
// };

// export const Video = ({ stream, isLocal }) => {
//   return <VideoBox stream={stream} isLocal={isLocal} />;
// };



// export const VideoBoxContainer = ({ children }) => {
//   return <div className="video-box-container">{children}</div>;
// };

// export const VideoBoxRow = ({ children }) => {
//   return <div className="video-box-row">{children}</div>;
// };

// export const VideoBoxColumn = ({ children }) => {
//   return <div className="video-box-column">{children}</div>;
// };

// export const VideoBoxContainerColumn = ({ children }) => {
//   return <div className="video-box-container-column">{children}</div>;
// };

// export const VideoBoxContainerRow = ({ children }) => {
//   return <div className="video-box-container-row">{children}</div>;
// };

// export const VideoBoxContainerColumnRow = ({ children }) => {
//   return <div className="video-box-container-column-row">{children}</div>;
// };


// export default VideoBox;
// import React, { useContext, useEffect, useRef } from 'react';
// import { VideoChatContext } from '../contexts/VideoChatContext';

const VideoBoxes = () => {
  const { localStream, remoteStream, callUser, answerCall, callAccepted } = useContext(VideoChatContext);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      localVideoRef.current.srcObject = localStream;
    }

    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <div className="video-container">
      {localStream && (
        <video playsInline muted ref={localVideoRef} autoPlay className="local-video" />
      )}
      {callAccepted && remoteStream && (
        <video playsInline ref={remoteVideoRef} autoPlay className="remote-video" />
      )}
    </div>
  );
};

export default VideoBoxes;
