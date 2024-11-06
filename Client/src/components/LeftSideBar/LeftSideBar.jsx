import React, { useContext, useState } from "react";
import "./LeftSideBar.css";
import { assets } from "../../assets/assets.js";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  getDocs,
  query,
  collection,
  where,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { AppContext } from "../../context/appContext";
import { toast } from "react-toastify";

export default function LeftSideBar() {
  const [subMenu, setSubMenu] = useState(false);
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    messagesId,
    setMessagesId,
  } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      setInputValue(input);
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", ">=", input.toLowerCase()), where("username", "<=", input.toLowerCase() + "\uf8ff"));
        const querySnap = await getDocs(q);

        const userResults = querySnap.docs.map((doc) => doc.data()).filter((user) => user.id !== userData.id);
        const userDomain = userData.email.split("@")[1];
        const filteredUsers = userResults.filter((user) => user.email.split("@")[1] === userDomain);
        setUsers(filteredUsers);
      } else {
        setShowSearch(false);
        setUsers([]);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const addChat = async (user) => {
    try {
      const isUserInChat = chatData.some(chat => chat.rId === user.id);

      if (isUserInChat) {
        toast.error("User is already in your chat list.");
        return;
      }

      const messagesRef = collection(db, "messages");
      const chatsRef = collection(db, "chats");
      const newMessageRef = doc(messagesRef);

      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(chatsRef, user.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      setShowSearch(false);
      setInputValue("");
      toast.success("User added to your chat list");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const setChat = async (item) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item);
      const userChatsRef = doc(db, "chats", userData.id);
      const userChatsSnapshot = await getDoc(userChatsRef);
      const userChatsData = userChatsSnapshot.data();
      const chatIndex = userChatsData.chatData.findIndex(
        (c) => c.messageId === item.messageId
      );
      userChatsData.chatData[chatIndex].messageSeen = true;
      await updateDoc(userChatsRef, {
        chatData: userChatsData.chatData,
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

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
          <input
            onChange={inputHandler}
            value={inputValue}
            type="text"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && users.length > 0 ? (
          users.map((user) => (
            <div className="friends" key={user.id} onClick={() => addChat(user)}>
              <img src={user.avatar} alt="" />
              <div>
                <p>{user.name}</p>
                <span>last seen: {new Date(user.lastSeen).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          chatData.map((item, index) => (
            <div
              onClick={() => setChat(item)}
              className={`friends ${item.messageSeen || item.messageId === messagesId ? "" : "border"}`}
              key={index}
            >
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
