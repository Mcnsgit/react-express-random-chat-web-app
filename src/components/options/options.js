import React, { useState, useContext, useEffect, useRef } from "react";
import { Input, Button, Tooltip, Modal, message } from "antd";
import Phone from "../assets/phone.gif";
import Teams from "../assets/teams.mp3";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoContext from "../contexts/VideoContext.js";
import svgicon from "../assets/hang-black.svg";
import './options.css';

import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import {
  UserOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
// import { socket } from "../contexts/videoState.js";

const Options = () => {
  const [idToCall, setIdToCall] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = useContext(VideoContext);

useEffect(() => {
  if (userVideo.current.srcObject !== stream) {
    userVideo.current.srcObject = stream;
    myVideo.current.srcObject = stream;
  }
})

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (otherUser && call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.from, call.isReceivingCall, callAccepted, otherUser, setOtherUser]);

  return (
    <div className={Options}>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Account Info</h2>
        <Input
          size="large"
          placeholder="Your name"
          prefix={<UserOutlined />}
          maxLength={15}
          suffix={<small>{name.length}/15</small>}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            localStorage.setItem("name", e.target.value);
          }}
          className={Input}
        />

        <div className={Options.share_options}>
          <CopyToClipboard text={me}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              className={'btn'}
              tabIndex="0"
              onClick={() => message.success("Code copied successfully!")}
            >
              Copy code
            </Button>
          </CopyToClipboard>

          <div className={'share_social'}>
            <WhatsappShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              separator="Link: "
              className={'share_icon'}
            >
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              className={'share_icon'}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code  "${me}"\n`}
              className={'share_icon'}
            >
              <TwitterIcon size={26} round className={'share_border'} />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Make a call</h2>

        <Input
          placeholder="Enter code to call"
          size="large"
          className={'inputgroup'}
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          suffix={
            <Tooltip title="Enter code of the other user">
              <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />

        {callAccepted && !callEnded ? (
          <Button
            variant="contained"
            onClick={leaveCall}
            className={'hang'}
            tabIndex="0"
          >
            <img src={svgicon} alt="hang up" style={{ height: "15px" }} />
            &nbsp; Hang up
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            onClick={() => {
              if (name.length) callUser(idToCall);
              else message.error("Please enter your name to call!");
            }}
            className={'btn'}
            tabIndex="0"
          >
            Call
          </Button>
        )}
      </div>

      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  className={'phone'}
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div className={'btnDiv'}>
              <Button
                variant="contained"
                element className={'answer'}
                color="#29bb89"
                icon={<PhoneOutlined />}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Answer
              </Button>
              <Button
                variant="contained"
                className={ 'decline'}
                icon={<PhoneOutlined />}
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Decline
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Options;