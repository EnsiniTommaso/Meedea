import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./Gemini.css";

const Gemini = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse("Sto pensando...");

    try {
      const res = await fetch("/api/ask-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer || "Nessuna risposta trovata.");
    } catch (err) {
      setResponse("Si è verificato un errore. Riprova.");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="gemini-container">
        <header>
          <h1>🤖 Chiedi a Gemini</h1>
        </header>
        <p className="description">
          Fai qualsiasi domanda e lascia che l'intelligenza artificiale di Google Gemini ti risponda in modo chiaro, veloce e intelligente.
        </p>
        <div className="chatbox">
          <label htmlFor="question">Domanda:</label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Scrivi qui la tua domanda..."
            disabled={loading}
          />
          <button onClick={askGemini} disabled={loading}>
            {loading ? "Attendi..." : "Invia"}
          </button>
        </div>
        {response && <div className="response">{response}</div>}
      </div>
    </Layout>
  );
};

export default Gemini;
