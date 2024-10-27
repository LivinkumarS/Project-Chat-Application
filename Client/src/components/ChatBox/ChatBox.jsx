import React from "react";
import "./ChatBox.css";
import { assets } from "../../assets/assets";
import { GoDotFill } from "react-icons/go";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { IoIosAttach } from "react-icons/io";

export default function ChatBox() {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <div className="user">
          <img src={assets.chatperson1} alt="profile" />
          <p>Anshiya </p>
          <span>
            <GoDotFill />
          </span>
        </div>
        <div className="help">
          <IoIosHelpCircleOutline />
        </div>
      </div>

      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">
            Yeah, Tell me what's the purpose? 
          </p>
          <div>
            <img src={assets.chatperson2} alt="profile" />
            <p>7:03 AM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            Mmmm...
          </p>
          <div>
            <img src={assets.chatperson1} alt="profile" />
            <p>7:02 AM</p>
          </div>
        </div>
        <div className="s-msg">
          <p className="msg">
            Okok
          </p>
          <div>
            <img src={assets.chatperson2} alt="profile" />
            <p>7:02 AM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            Just woke up!
          </p>
          <div>
            <img src={assets.chatperson1} alt="profile" />
            <p>7:02 AM</p>
          </div>
        </div>
        <div className="s-msg">
          <p className="msg">
            Neenga?
          </p>
          <div>
            <img src={assets.chatperson2} alt="profile" />
            <p>7:01 AM</p>
          </div>
        </div>
        <div className="s-msg">
          <p className="msg">
            Summa Thaa
          </p>
          <div>
            <img src={assets.chatperson2} alt="profile" />
            <p>7:01 AM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            Good. What Are You Doing?
          </p>
          <div>
            <img src={assets.chatperson1} alt="profile" />
            <p>7:01 AM</p>
          </div>
        </div>
        <div className="s-msg">
          <p className="msg">
            Fine. What about You?
          </p>
          <div>
            <img src={assets.chatperson2} alt="profile" />
            <p>7:01 AM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            How Are You?
          </p>
          <div>
            <img src={assets.chatperson1} alt="profile" />
            <p>7:00 AM</p>
          </div>
        </div>
        <div className="s-msg">
          <p className="msg">
            Hi
          </p>
          <div>
            <img src={assets.chatperson2} alt="profile" />
            <p>4:30 AM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">
            Hello..!
          </p>
          <div>
            <img src={assets.chatperson1} alt="profile" />
            <p>1:30 AM</p>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Send a message..." />
        <input type="file" hidden />
        <div className="attach-file">
          <IoIosAttach />
        </div>
        <div className="send">
          <IoIosSend />
        </div>
      </div>
    </div>
  );
}
