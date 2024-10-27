import React from "react";
import "./Chat.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import ChatBox from "../../components/ChatBox/ChatBox";

export default function Chat() {
  return (
    <div className="chat">
      <div className="overly">
        <div className="chat-container">
          <LeftSideBar />
          <ChatBox />
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}
