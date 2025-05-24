import React, { useState } from "react";
import Layout from "../../components/Layout";
import profile from "../../assets/profile-icon.png";
import botAvatar from "../../assets/assistenza2.png";
import './Gemini.css'

const Gemini = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Ciao! Come posso aiutarti oggi?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD84smsoBH83XZ4YAY3U6qtG-Xsy8M5SIw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input }]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botText || "Risposta non disponibile."
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Errore nel recupero della risposta." }
      ]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="chat-container">
        <h1> 🤖 Chiedi a Gemini</h1>
        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <img
                src={msg.sender === "user" ? profile : botAvatar}
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
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Attendi..." : "Invia"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Gemini;
