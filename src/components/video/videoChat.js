import React, { useContext, useEffect, useState, useRef } from "react";
import VideoContext from "../contexts/VideoContext.js";
import "./Video.css";
import {  Modal, Button, Input, notification, Avatar } from "antd";
import VideoIcon from "../assets/video.svg";
import { io } from "socket.io-client";
import VideoOff from "../assets/video-off.svg";
// import Profile from "../assets/profile.svg";
import Msg_Illus from "../assets/msg_illus.svg";
import Msg from "../assets/msg.svg";
import ScreenShare from '../assets/share_screen.svg';
import { UserOutlined, MessageOutlined } from "@ant-design/icons";
import { socket } from '../contexts/videoState.js';
const { SocketLogic } = require('../../server/socketLogic.js');

const { Search } = Input;

const VideoChat = () => {
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    callEnded,
    sendMsg: sendMsgFunc,
    msgRcv,
    chat,
    setChat,
    userName,
    myVdoStatus,
    fullScreen,
    handleScreenSharing,
    userVdoStatus,
    updateVideo,
    myMicStatus,
    userMicStatus,
    updateMic,
  } = useContext(VideoContext);

  const [sendMsg, setSendMsg] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dummy = useRef(null);


  
  useEffect(() => {
    socket.on("msgRcv", (data) => {
      if (data && data.msg) {
        let msg = {
          msg: data.msg,
          type: "rcv",
          sender: data.sender,
          timestamp: Date.now(),
        };
        setChat(prevChat => [...prevChat, msg]);
      }
    });

    return () => socket.off("msgRcv");
  }, [setChat]);

  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  useEffect(() => {
    if (msgRcv && msgRcv.value && !isModalVisible) {
      notification.open({
        message: "New Message",
        description: `${msgRcv.sender}: ${msgRcv.value}`,
        icon: <MessageOutlined style={{ color: "#108ee9" }} />,
      });
    }
  }, [msgRcv, isModalVisible]);
useEffect(() => {
  SocketLogic(io);
  socket.emit("login", name);
  socket.on("userJoined", () => {
  })
  socket.on("userLeft", () => {
    ;
  })
  socket.on("callEnded", () => {
    ;
  })  
  socket.on("msgRcv", (data) => {
    if (data && data.msg) {
      let msg = {
        msg: data.msg,
        type: "rcv",
        sender: data.sender,
        timestamp: Date.now(),
      };
      setChat(prevChat => [...prevChat, msg]);
    }
  })
})
  const showModal = (showVal) => setIsModalVisible(showVal);

  const onSearch = (value) => {
    if (value && value.length) {
      sendMsgFunc(value);
      setSendMsg("");
    }
  };

  return (
    <div className="grid">
    {stream ? (
      <div
        style={{ textAlign: "center" }}
        className="card"
        id={callAccepted && !callEnded ? "video1" : "video3"}
      >
        <div style={{ height: "2rem" }}>
          <h3>{myVdoStatus && name}</h3>
        </div>
        <div className="video-avatar-container">
          <video
            playsInline
            muted
            onClick={fullScreen}
            ref={myVideo}
            autoPlay
            className="video-active"
            style={{
              opacity: `${myVdoStatus ? "1" : "0"}`,
            }}
          />
              <Avatar
                style={{ backgroundColor: "#116", position: "absolute" }}
                size={98}
                icon={<UserOutlined />}
              >
                {name}
              </Avatar>
            </div>   <div className="iconsDiv">
            <div
              className="icons"
              onClick={() => {
                updateMic();
              }}
              tabIndex="0"
            >
              <i
                className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
                style={{ transform: "scaleX(-1)" }}
                aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
                aria-hidden="true"
              ></i>
            </div>

            {callAccepted && !callEnded && (
              <div
                className="icons"
                onClick={() => {
                  setIsModalVisible(!isModalVisible);
                }}
                tabIndex="0"
              >
                <img src={Msg} alt="chat icon" />
              </div>
            )}
          <Modal
            title="Chat"
            footer={null}
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={() => showModal(false)}
            style={{ maxHeight: "100px" }}
          >
            {chat.length ? (
              <div className="msg_flex">
                {chat.map((msg, index) => (
                  <div key={index} className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}>
                    {msg.msg}
                  </div>
                ))}
                <div ref={dummy} id="no_border"></div>
              </div>
            ) : (
              <div className="chat_img_div">
                <img src={Msg_Illus} alt="message illustration" className="img_illus" />
              </div>
            )}
            <Search
              placeholder="your message"
              allowClear
              className="input_msg"
              />
              <Button className="send_btn" enterButton="Send 🚀"
              onChange={(e) => setSendMsg(e.target.value)}
              value={sendMsg}
              size="large"
              onSearch={onSearch}>Search</Button>
            </Modal>
            {callAccepted && !callEnded && (
              <div
                className="icons"
                onClick={() => handleScreenSharing()} 
                tabIndex="0"
              >
                <img src={ScreenShare} alt="ScreenShare" />
              </div>
            )}

            <div className="icons" onClick={() => updateVideo()} tabIndex="0">
              {myVdoStatus ? (
                <img src={VideoIcon} alt="video on icon" />
              ) : (
                <img src={VideoOff} alt="video off icon" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    {callAccepted && !callEnded && userVideo && (
        <div className="card2" style={{ textAlign: "center" }} id="video2">
          <div style={{ height: "2rem" }}>
            <h3>{userVdoStatus && (call.name || userName)}</h3>
          </div>

          <div className="video-avatar-container">
            <video
              playsInline
              ref={userVideo}             
              onClick={fullScreen}
              autoPlay
              className="video-active"
              style={{
                opacity: `${userVdoStatus ? "1" : "0"}`,
              }}
            />

            <Avatar
              style={{
                backgroundColor: "#116",
                position: "absolute",
                opacity: `${userVdoStatus ? "-1" : "2"}`,
              }}
              size={98}
              icon={!(userName || call.name) && <UserOutlined />}
            >
              {userName || call.name}
            </Avatar>
            {!userMicStatus && (
              <i
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  padding: "0.3rem",
                  backgroundColor: "#fefefebf",
                }}
                className="fad fa-volume-mute fa-2x"
                aria-hidden="true"
                aria-label="microphone muted"
              ></i>
            )}
          </div>
        </div>
      )}
    </div>
  );
  
}
export default VideoChat;



