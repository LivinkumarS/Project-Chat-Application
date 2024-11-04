import React, { useContext, useEffect, useState } from "react";
import "./RightSideBar.css";
import { assets } from "../../assets/assets";
import { GoDotFill } from "react-icons/go";
import { signOut } from "firebase/auth";
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/appContext";
import { Link } from "react-router-dom";

export default function RightSideBar() {
  const { chatUser, messages } = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image);
      }
    });
    setMsgImages(tempVar);
  }, [messages]);

  return (
    <div className="rs">
      {chatUser ? (
        <div className="rs-profile">
          <img src={chatUser.userData.avatar} alt="" />
          <h3>
            {chatUser.userData.name}{" "}
            {Date.now() - chatUser.userData.lastSeen <= 70000 && (
            <span>
              <GoDotFill />
            </span>
          )}
          </h3>
          <p>{chatUser.userData.bio}</p>
        </div>
      ) : (
        <div className="rs-profile">
          <img src={assets.blankProfile} alt="" />
        </div>
      )}
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImages.length > 0 ? (
            msgImages.map((link, index) => (
              <img
                key={index}
                onClick={() => {
                  window.open(link);
                }}
                className="mediaImg"
                src={link}
              />
            ))
          ) : (
            <p className="empty">Empty</p>
          )}
        </div>
      </div>

      <button className="log-out" onClick={() => logout()}>
        LogOut
      </button>
    </div>
  );
}
