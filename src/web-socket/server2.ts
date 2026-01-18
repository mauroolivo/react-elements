import http from "http";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { v4 as uuidv4 } from "uuid";

const server = http.createServer();
const wsServer = new WebSocketServer({ server });

const port = 8000;

type User = { username: string; state: { [key: string]: string | number } };

const connections = new Map<string, WebSocket>();
const users = new Map<string, User>();

const handleMessage = (data: RawData, uuid: string) => {
  let text = "";
  if (typeof data === "string") text = data;
  else if (data instanceof Buffer) text = data.toString();
  else if (Array.isArray(data)) text = Buffer.concat(data).toString();
  else if (data instanceof ArrayBuffer) text = new TextDecoder().decode(data);
  else text = String(data);

  try {
    const message = JSON.parse(text);
    const user = users.get(uuid);
    if (user) {
      user.state = message;
      broadcast();
      console.log(
        `${user.username} updated their state: ${JSON.stringify(user.state)}`
      );
    }
  } catch (err) {
    console.error("Invalid message JSON:", err);
  }
};

const handleClose = (uuid: string) => {
  const user = users.get(uuid);
  if (user) console.log(`${user.username} disconnected`);
  connections.delete(uuid);
  users.delete(uuid);
  broadcast();
};

const broadcast = () => {
  const payload = JSON.stringify(Object.fromEntries(users));
  connections.forEach((conn) => {
    try {
      conn.send(payload);
    } catch (e) {
      console.error("Error broadcasting to a connection:", e);
    }
  });
};

wsServer.on("connection", (connection: WebSocket, request) => {
  const username =
    new URL(request.url ?? "", "http://localhost").searchParams.get(
      "username"
    ) || "anonymous";
  console.log(`${username} connected`);
  const uuid = uuidv4();
  connections.set(uuid, connection);
  users.set(uuid, { username, state: {} });
  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
