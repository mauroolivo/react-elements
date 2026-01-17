// server1.ts
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const broadcast = (data: WebSocket.RawData) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.send("Welcome! You are connected to the WebSocket server.");

  ws.on("message", (message: WebSocket.RawData) => {
    console.log(`Received: ${message}`);
    broadcast(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
