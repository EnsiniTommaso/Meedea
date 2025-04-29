import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import socket from "../../socket";
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [roomText, setRoomText] = useState("");
  const [name, setName] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Creiamo il messaggio da inviare
      const newMessage = { name, message: inputMessage };
      
      // Emettiamo il messaggio al server senza aggiungerlo ancora localmente
      socket.emit("messageRoom", { room: roomId, message: newMessage });

      // Pulisci il campo di input
      setInputMessage("");
    }
  };

  const handleRoomJoin = () => {
    if (!roomText || !name) {
      alert("Inserisci nome e ID della stanza");
      return;
    }

    socket.emit("join", { room: roomText, name });
    setRoomId(roomText);
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("💬 Messaggio ricevuto:", msg);
      
      // Aggiungiamo solo i messaggi ricevuti dal server
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("connect", () => {
      console.log("Socket connesso:", socket.id);
    });

    socket.on("notification", (msg) => {
      alert(msg);
    });

    return () => {
      socket.off("message");
      socket.off("notification");
    };
  }, []);

  return (
    <Layout>
      <header>
        Chat
      </header>
      <div className="App">
        {roomId ? (
          <div className="chat-header">
           <h2>  Welcome, {name}!</h2> 
            
          </div>
        ) : null}

        {roomId === "" ? (
          <div className="room-container">
            <h1>Join Chat Room</h1>
            <div className="room-options">
              <input
                className="room-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="room-input"
                type="text"
                placeholder="Enter Room ID"
                value={roomText}
                onChange={(e) => setRoomText(e.target.value)}
              />
              <button onClick={handleRoomJoin} className="room-button">
                Join Room
              </button>
            </div>
          </div>
        ) : (
          <div className="message-area">
            <div className="message-list-container">
              <ul className="message-list">
                {messages.map((msg, idx) => (
                  <li
                    key={idx}
                    className={`message-item ${msg.name === name ? "self" : "other"}`}
                  >
                    <span className="message-author">{msg.name}:</span>
                    <span className="message-content">{msg.message}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="message-input-container">
              <input
                className="message-input"
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button onClick={handleSendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Chat;
