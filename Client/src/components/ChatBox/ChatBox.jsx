import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { assets } from "../../assets/assets";
import { GoDotFill } from "react-icons/go";
import { IoIosHelpCircleOutline, IoMdImage } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { IoIosAttach } from "react-icons/io";
import { AppContext } from "../../context/appContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import upload, { uploadFile } from "../../lib/upload.js";

export default function ChatBox() {
  const { chatUser, messages, messagesId, setMessages, userData } =
    useContext(AppContext);
  const [input, setInput] = useState("");
  const imageRef = useRef();
  const fileRef = useRef();

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        const userIDs = [chatUser.rId, userData.id];
        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            console.log(userChatData.chatData);

            const chatIndex = await userChatData.chatData.findIndex(
              (c) => c.messageId === messagesId
            );
            console.log(chatIndex);

            userChatData.chatData[chatIndex].lastMessage =
              input.length > 20 ? input.slice(0, 20) : input;
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
    setInput("");
  };

  const convertTimeStamp = (timeStamp) => {
    let date = timeStamp.toDate();
    const hours = date.getHours();
    const minute = date.getMinutes();
    if (hours > 12) {
      return hours - 12 + ":" + minute + " PM";
    } else {
      return hours + ":" + minute + " AM";
    }
  };

  const sendImage = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        const fileURL = await upload(image);
        if (fileURL && messagesId) {
          await updateDoc(doc(db, "messages", messagesId), {
            messages: arrayUnion({
              sId: userData.id,
              image: fileURL,
              createdAt: new Date(),
            }),
          });
          const userIDs = [chatUser.rId, userData.id];
          userIDs.forEach(async (id) => {
            const userChatsRef = doc(db, "chats", id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            if (userChatsSnapshot.exists()) {
              const userChatData = userChatsSnapshot.data();
              console.log(userChatData.chatData);

              const chatIndex = await userChatData.chatData.findIndex(
                (c) => c.messageId === messagesId
              );
              console.log(chatIndex);

              userChatData.chatData[chatIndex].lastMessage = "image";
              userChatData.chatData[chatIndex].updatedAt = Date.now();
              if (userChatData.chatData[chatIndex].rId === userData.id) {
                userChatData.chatData[chatIndex].messageSeen = false;
              }
              await updateDoc(userChatsRef, {
                chatData: userChatData.chatData,
              });
            }
          });
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  };

  const sendFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileURL = await uploadFile(file);
        if (fileURL && messagesId) {
          await updateDoc(doc(db, "messages", messagesId), {
            messages: arrayUnion({
              sId: userData.id,
              file: fileURL,
              fileName: file.name,
              createdAt: new Date(),
            }),
          });
          const userIDs = [chatUser.rId, userData.id];
          userIDs.forEach(async (id) => {
            const userChatsRef = doc(db, "chats", id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            if (userChatsSnapshot.exists()) {
              const userChatData = userChatsSnapshot.data();
              console.log(userChatData.chatData);

              const chatIndex = await userChatData.chatData.findIndex(
                (c) => c.messageId === messagesId
              );
              console.log(chatIndex);

              userChatData.chatData[chatIndex].lastMessage = "file";
              userChatData.chatData[chatIndex].updatedAt = Date.now();
              if (userChatData.chatData[chatIndex].rId === userData.id) {
                userChatData.chatData[chatIndex].messageSeen = false;
              }
              await updateDoc(userChatsRef, {
                chatData: userChatData.chatData,
              });
            }
          });
        }
      } catch (error) {
        toast.error("The file size exceeds the 25MB limit.");
        console.error(error);
      }
    }
  };

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <div className="user">
          <img src={chatUser.userData.avatar} alt="profile" />
          <p>{chatUser.userData.name} </p>
          {Date.now() - chatUser.userData.lastSeen <= 70000 && (
            <span>
              <GoDotFill />
            </span>
          )}
        </div>
        <div className="help">
          <IoIosHelpCircleOutline />
        </div>
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sId === userData.id ? "s-msg" : "r-msg"}
          >
            {msg["image"] ? (
              <img
                onClick={() => {
                  window.open(msg.image);
                }}
                className="msg-image"
                src={msg.image}
              />
            ) : msg["file"] ? (
              <div className="fileContainer">
                <a href={msg.file} download>
                  {msg.fileName}
                </a>
              </div>
            ) : (
              <p className="msg">{msg.text}</p>
            )}

            <div>
              <img
                src={
                  msg.sId === userData.id
                    ? userData.avatar
                    : chatUser.userData.avatar
                }
                alt="profile"
              />
              <p>{convertTimeStamp(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message..."
        />
        <input
          type="file"
          onChange={sendImage}
          ref={imageRef}
          accept="image/png, image/jpeg"
          hidden
        />
        <input type="file" onChange={sendFile} ref={fileRef} hidden />
        <div className="attach-file" onClick={() => imageRef.current.click()}>
          <IoMdImage />
        </div>
        <div className="attach-file" onClick={() => fileRef.current.click()}>
          <IoIosAttach />
        </div>
        <div onClick={sendMessage} className="send">
          <IoIosSend />
        </div>
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={"/logo.png"} alt="" />
      <p>Chat Anytime, Anywhere!</p>
    </div>
  );
}
