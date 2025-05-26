import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import socket from "../../socket";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [roomText, setRoomText] = useState("");
  const [name, setName] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("file", (msg) => {
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
      socket.off("file");
      socket.off("notification");
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { name, message: inputMessage };
      socket.emit("messageRoom", { room: roomId, message: newMessage });
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

  const handleFileSelect = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setSelectedFile({
          name: file.name,
          type: fileType,
          content: base64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendFile = () => {
    if (selectedFile) {
      const fileMessage = {
        name,
        file: selectedFile,
      };
      socket.emit("file", { room: roomId, message: fileMessage });
      setSelectedFile(null);
      setShowAttachmentMenu(false);
    }
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
        <header>
          <h1>Chat Room</h1>
        </header>
      </div>

      <div className="help-container">
        {!roomId ? (
          <div className="room-container">
            <h3>Unisciti alla stanza</h3>
            <input
              className="help-chat-input-field"
              type="text"
              placeholder="Il tuo nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="help-chat-input-field"
              type="text"
              placeholder="ID stanza"
              value={roomText}
              onChange={(e) => setRoomText(e.target.value)}
            />
            <button className="help-chat-button" onClick={handleRoomJoin}>
              Unisciti
            </button>
          </div>
        ) : (
          <>
            <div className="help-chat-box">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-message ${
                    msg.name === name ? "user" : "bot"
                  }`}
                >
                  <div className="message-bubble">
                    <strong>{msg.name}:</strong>{" "}
                    {msg.file ? (
                      msg.file.type === "image" ? (
                        <img
                          src={msg.file.content}
                          alt={msg.file.name}
                          className="chat-image"
                          style={{ maxWidth: "200px", borderRadius: "12px" }}
                        />
                      ) : (
                        <a
                          href={msg.file.content}
                          download={msg.file.name}
                          className="chat-file-link"
                        >
                          📎 {msg.file.name}
                        </a>
                      )
                    ) : (
                      msg.message
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="help-chat-input">
              <input
                type="text"
                placeholder="Scrivi qui..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="help-chat-button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                type="button"
              >
                +
              </button>
              <button
                className="help-chat-button"
                onClick={handleSendMessage}
                type="button"
              >
                Invia
              </button>
            </div>

            {showAttachmentMenu && (
              <div className="attach-options">
                <label>
                  📷 Foto
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileSelect(e, "image")}
                  />
                </label>
                <label>
                  📄 Documento
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                    hidden
                    onChange={(e) => handleFileSelect(e, "document")}
                  />
                </label>
              </div>
            )}

            {selectedFile && (
              <div className="file-preview">
                <h4>Anteprima allegato:</h4>
                {selectedFile.type === "image" ? (
                  <img
                    src={selectedFile.content}
                    alt={selectedFile.name}
                    className="chat-image"
                    style={{ maxWidth: "200px", marginBottom: "10px" }}
                  />
                ) : (
                  <p>📎 {selectedFile.name}</p>
                )}
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button className="help-chat-button" onClick={handleSendFile}>
                    Invia allegato
                  </button>
                  <button className="help-chat-button" onClick={handleCancelFile}>
                    Annulla
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Chat;
