import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./ChatBox.css";
import botAvatar from "../../assets/assistenza2.png"; 


const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Ciao! Come posso aiutarti oggi?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://api.example.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage = {
        sender: "bot",
        text: data.reply || "Risposta non disponibile."
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Errore nel recupero della risposta." }
      ]);
    }
  };

  return (
    <Layout>
      <div className="chat-container">
        <h1>Assistenza Clienti</h1>
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <img
                src={
                  msg.sender === "user"
                    ? "/user-avatar.jpg" 
                    : botAvatar
                }
                alt={`${msg.sender} avatar`}
                className="avatar"
              />
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Scrivi qui..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Invia</button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatBox;
