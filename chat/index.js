const express = require("express");
const app = express();
const socket = require("socket.io");

// Imposta il server per ascoltare sulla porta 3000
const io = socket(
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  }),
  {
    cors: {
      origin: "http://localhost:5173", // Porta del frontend (Vite)
      methods: ["GET", "POST"],
    },
  }
);

// Gestione della connessione socket
io.on("connection", (socket) => {
  console.log("Nuova connessione", socket.id);

  // Gestione della disconnessione
  socket.on("disconnect", () => {
    console.log("Utente disconnesso", socket.id);
  });

  // Gestione dell'entrata in una stanza
  socket.on("join", ({ room, name }) => {
    console.log(`${name} si è unito alla stanza ${room}`);
    socket.join(room); // Unisce l'utente alla stanza
    io.to(room).emit("notification", `${name} ha joined la stanza`); // Invia notifica a tutti gli altri utenti nella stanza
  });

  // Gestione dell'invio di un messaggio in una stanza
  socket.on("messageRoom", ({ room, message }) => {
    console.log(`Messaggio ricevuto in ${room}:`, message);
    io.to(room).emit("message", message); // Invia il messaggio a tutti gli utenti nella stanza
  });
});
