import { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { FaComments, FaTimes } from "react-icons/fa";
import "../../styles/ChatBox.css";

const ChatBox = ({ bookingId }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit("send-message", { bookingId, message: msg });
    setMsg("");
  };

  useEffect(() => {
    socket.on("receive-message", (m) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => socket.off("receive-message");
  }, []);

  return (
    <>
    
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        <FaComments size={20} />
      </button>

      {open && (
        <div className="chat-overlay">
          <div className="chat-modal animate-slideUp">

         
            <div className="chat-header">
              <h3>Chat</h3>
              <FaTimes className="close-icon" onClick={() => setOpen(false)} />
            </div>

            <div className="chat-body">
              {messages.length === 0 && (
                <p className="empty">Start conversation...</p>
              )}

              {messages.map((m, i) => (
                <div key={i} className="chat-bubble">
                  {m}
                </div>
              ))}
            </div>

            <div className="chat-footer">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={send}>Send</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;