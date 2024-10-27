import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets.js";

export default function Login() {
  const [currState, setCurrState] = useState("SignUp");

  function handleChangeState() {
    setCurrState((prev) => {
      if (prev === "SignUp") {
        return "LogIn";
      }
      return "SignUp";
    });
  }

  return (
    <div className="login">
      <div className="overlay">
        <img src={assets.Logo} alt="chat-logo" className="logo" />
        <form className="login-form">
          <h2>{currState}</h2>
          {currState === "SignUp" && (
            <input type="text" placeholder="User Name" className="form-input" />
          )}
          <input type="email" placeholder="Email" className="form-input" />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <button type="submit">Submit</button>
          <div className="login-forget">
            <p className="login-toggle">
              {currState==="SignUp"? "Already have an account?": "Don't have an account?"}{" "}
              <span onClick={handleChangeState}>Click here</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
