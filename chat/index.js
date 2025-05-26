const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // Cambia con l'URL del tuo frontend in produzione
    methods: ["GET", "POST"],
  },
});

// Socket.IO - gestione degli eventi
io.on("connection", (socket) => {
  console.log("🔌 Nuova connessione:", socket.id);

  // Utente si unisce a una stanza
  socket.on("join", ({ room, name }) => {
    socket.join(room);
    console.log(`👤 ${name} si è unito alla stanza: ${room}`);
    io.to(room).emit("notification", `${name} ha joined la stanza`);
  });

  // Messaggio testuale nella stanza
  socket.on("messageRoom", ({ room, message }) => {
    console.log(`💬 Messaggio nella stanza ${room}:`, message);
    io.to(room).emit("message", message);
  });

  // Invio file (immagine o documento)
  socket.on("file", ({ room, message }) => {
    const file = message?.file;
    if (file?.content && file?.name && file?.type) {
      console.log(
        `📎 File ricevuto da ${message.name} nella stanza ${room}: ${file.name}`
      );
      io.to(room).emit("file", message);
    } else {
      console.warn("⚠️ File non valido ricevuto:", file);
    }
  });

  // Disconnessione
  socket.on("disconnect", () => {
    console.log("❌ Disconnesso:", socket.id);
  });
});

// Avvio server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su http://localhost:${PORT}`);
});
