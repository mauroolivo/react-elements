// server.js
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Broadcast to all clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send welcome message
  ws.send("Welcome! You are connected to the WebSocket server.");

  // Listen for messages from clients
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the received message to all clients
    wss.broadcast(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
