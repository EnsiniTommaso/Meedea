import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./Help.css";
import profile from "../../assets/profile-icon.png";
import botAvatar from "../../assets/assistenza2.png";

const faqOptions = [
  "Non riesci ad accedere?",
  "Come posso cambiare la mia password?",
  "Come contattare l'assistenza?",
  "Come cancellare il mio account?",
  "Come aggiornare i miei dati personali?"
];

const faqResponses = {
  1: "Se non riesci ad accedere, prova a reimpostare la password tramite il link 'Password dimenticata'. Se il problema persiste, contattaci via email.",
  2: "Per cambiare la tua password, vai su Impostazioni > Sicurezza > Cambia password.",
  3: "Puoi contattare l'assistenza scrivendo a supporto@example.com o tramite il modulo nella pagina 'Contatti'.",
  4: "Per cancellare il tuo account, vai su Impostazioni > Account > Elimina account. Segui le istruzioni.",
  5: "Per aggiornare i tuoi dati personali, accedi al tuo profilo e clicca su 'Modifica dati'."
};

const Help = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const initialMessage = {
      sender: "bot",
      text: `Hai bisogno di aiuto?\n\n${faqOptions
        .map((q, i) => `${i + 1}. ${q}`)
        .join("\n")}\n\nDigita il numero corrispondente o scrivi la tua domanda.`
    };
    setMessages([initialMessage]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage = { sender: "user", text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const numberChoice = parseInt(userText);
    if (!isNaN(numberChoice) && faqResponses[numberChoice]) {
      const botMessage = { sender: "bot", text: faqResponses[numberChoice] };
      setMessages((prev) => [...prev, botMessage]);
      return;
    }

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD84smsoBH83XZ4YAY3U6qtG-Xsy8M5SIw",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }]
          })
        }
      );

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Risposta non disponibile.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Errore nel recupero della risposta." }]);
    }
  };

  return (
    <Layout>
      <div className="help-container">
        <h1>Assistenza Clienti</h1>
        <div className="help-chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <img
                src={msg.sender === "user" ? profile : botAvatar}
                alt="avatar"
                className="avatar"
              />
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="help-chat-input">
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

export default Help;
