import React, { useState, useEffect, useRef } from "react";

import music from './assets/lumia-950-ringtone-66659.mp3'

export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setcurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const notification = new Audio(music);

    const sendMessage = async () => {
        if (currentMessage !== "" && currentMessage !== " ") {
            const messageData = {
                id: Math.random(),
                room: room,
                author: username,
                message: currentMessage,
                time:
                    (new Date(Date.now()).getHours() % 12) +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setcurrentMessage("");
            notification.play();
        }
    };

    useEffect(() => {
        const handleReceiveMsg = (data) => {
            setMessageList((list) => [...list, data]);
        };
        socket.on("receive_message", handleReceiveMsg);

        return () => {
            socket.off("receive_message", handleReceiveMsg);
        };
    }, [socket]);

    const containRef = useRef(null)

    useEffect(() => {
        containRef.current.scrollTop = containRef.current.scrollHeight;
    }, [messageList])


    return (
        <>
            <div className="chat_container123">
  <div className="chat_header123">
    <h2>Welcome {username}</h2>
  </div>

  <div className="chat_box123" ref={containRef}>
    {messageList.map((data) => (
      <div
        key={data.id}
        className={`message_content123 ${username === data.author ? "me123" : "them123"}`}
      >
        <div className="msg_bubble123">
          <p className="text123">{data.message}</p>
          <div className="msg_meta123">
            <span>{data.author}</span>
            <span>{data.time}</span>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="chat_input123">
    <input
      value={currentMessage}
      type="text"
      placeholder="Type your message..."
      onChange={(e) => setcurrentMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button onClick={sendMessage}>
      <i className="fas fa-paper-plane"></i>
    </button>
  </div>
</div>

        </>
    );
};