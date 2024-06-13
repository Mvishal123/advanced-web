import express from "express";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const http = app.listen(8080);

const wss = new WebSocketServer({ server: http });

interface NewWebSocket extends WebSocket {
  username?: string;
}

type Message = {
  type: "register" | "message";
  username: string;
  to?: string;
  message?: string;
};

interface Client {
  [key: string]: NewWebSocket;
}

let clients: Client = {};
let count = 0;
wss.on("connection", (ws: NewWebSocket) => {
  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    switch (parsedMessage.type.toLowerCase()) {
      case "register": {
        clients[parsedMessage.username] = ws;
        ws.username = parsedMessage.username;
        ws.send(
          JSON.stringify({ message: "User registered successfully", username: parsedMessage.username })
        );
        break;
      }

      case "message": {
        const parsedMessage: Message = JSON.parse(message.toString());
        const to = parsedMessage.to;

        if (to && clients[to] && clients[to].readyState === WebSocket.OPEN) {
          clients[to].send(
            JSON.stringify({ message: parsedMessage.message, from: parsedMessage.username })
          );
        } else {
          ws.send(JSON.stringify({ message: "User not found", to: parsedMessage.to }));
        }

        break
      }
      default: {
        console.log("Unknown message type: " + parsedMessage.type);
        break;
      }
    }
  });

  count++;
  console.log("New client connected: " + count);
});
