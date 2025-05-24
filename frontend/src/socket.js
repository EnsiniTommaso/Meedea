import { io } from "socket.io-client";

// URL del backend (Express)
const SOCKET_URL = "http://10.13.0.3:3000";

// Connessione al server socket
const socket = io(SOCKET_URL, {
  autoConnect: true, // Questo assicura che la connessione avvenga automaticamente al momento dell'importazione
});

export default socket; // Esporta la connessione come default
