import React from "react";
import "./RightSideBar.css";
import { assets } from "../../assets/assets";
import { GoDotFill } from "react-icons/go";

export default function RightSideBar() {
  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.chatperson1} alt="" />
        <h3>
          Anshiya{" "}
          <span>
            <GoDotFill />
          </span>
        </h3>
        <p>Hey there, I'm using chat app!</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.random1} alt="" />
          <img src={assets.random1} alt="" />
          <img src={assets.random1} alt="" />
          <img src={assets.random1} alt="" />
          <img src={assets.random1} alt="" />
        </div>
      </div>

      <button className="log-out">LogOut</button>
    </div>
  );
}
