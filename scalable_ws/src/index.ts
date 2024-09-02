import { WebSocketServer } from "ws";
import { UserManager } from "./userManager";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (userSocket) => {
  UserManager.getInstance().addUser(userSocket);

  userSocket.on("message", (message) => {
    const data = JSON.parse(message as unknown as string);
    UserManager.getInstance().handleMessage(data);
  });
});

console.log("ws server running...");
