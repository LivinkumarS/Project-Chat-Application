import React, { useState, useRef } from "react";
import "./ProfileUpdate.css";
import { assets } from "../../assets/assets.js";

export default function ProfileUpdate() {
  const [image, setImage] = useState(null);
  const fileRef = useRef();

  return (
    <div className="profile">
      <div className="overlay">
        <div className="profile-container">
          <form>
            <h2>Profile Update</h2>
            <label htmlFor="avatar">
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                accept=".png, .jpg, .jpeg"
                hidden
                ref={fileRef}
              />
              <img
                src={image ? URL.createObjectURL(image) : assets.chatperson2}
                className="profilePicture"
                alt="profilePhoto"
                onClick={()=>{
                  fileRef.current.click()
                }}
              />
            </label>
            <input type="text" placeholder="Your name" required />
            <textarea placeholder="Profile bio" required></textarea>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
