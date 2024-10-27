import React, { useState } from "react";
import "./LeftSideBar.css";
import { assets } from "../../assets/assets.js";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LeftSideBar() {
  const [subMenu, setSubMenu] = useState(false);

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.Logo} alt="" className="logo" />
          <h5>Chat App</h5>
          <div className="menu" onClick={() => setSubMenu((prev) => !prev)}>
            <BsThreeDotsVertical />
            {subMenu && (
              <div className="sub-menu">
                <Link to={`/profile`}>Profile</Link>
                <hr />
                <p>SignOut</p>
              </div>
            )}
          </div>
        </div>
        <div className="ls-search">
          <CiSearch />
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="ls-list">
        <div className="friends">
          <img src={assets.chatperson1} alt="" />
          <div>
            <p>Anshiya</p>
            <span>Hello, How are you?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson2} alt="" />
          <div>
            <p>Ben</p>
            <span>Hello...!</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson3} alt="" />
          <div>
            <p>Kamal</p>
            <span>Did you complete it?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson4} alt="" />
          <div>
            <p>Rose</p>
            <span>Had Lunch?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson1} alt="" />
          <div>
            <p>Anshiya</p>
            <span>Hello, How are you?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson2} alt="" />
          <div>
            <p>Ben</p>
            <span>Hello...!</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson3} alt="" />
          <div>
            <p>Kamal</p>
            <span>Did you complete it?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson4} alt="" />
          <div>
            <p>Rose</p>
            <span>Had Lunch?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson1} alt="" />
          <div>
            <p>Anshiya</p>
            <span>Hello, How are you?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson2} alt="" />
          <div>
            <p>Ben</p>
            <span>Hello...!</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson3} alt="" />
          <div>
            <p>Kamal</p>
            <span>Did you complete it?</span>
          </div>
        </div>
        <div className="friends">
          <img src={assets.chatperson4} alt="" />
          <div>
            <p>Rose</p>
            <span>Had Lunch?</span>
          </div>
        </div>
      </div>
    </div>
  );
}
