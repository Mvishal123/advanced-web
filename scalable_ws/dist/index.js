"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const userManager_1 = require("./userManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (userSocket) => {
    userManager_1.UserManager.getInstance().addUser(userSocket);
    userSocket.on("message", (message) => {
        const data = JSON.parse(message);
        userManager_1.UserManager.getInstance().handleMessage(data);
    });
});
console.log("ws server running...");
