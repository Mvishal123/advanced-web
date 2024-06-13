"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const http = app.listen(8080);
const wss = new ws_1.WebSocketServer({ server: http });
let clients = {};
let count = 0;
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        switch (parsedMessage.type.toLowerCase()) {
            case "register": {
                clients[parsedMessage.username] = ws;
                ws.username = parsedMessage.username;
                ws.send(JSON.stringify({ message: "User registered successfully", username: parsedMessage.username }));
                break;
            }
            case "message": {
                const parsedMessage = JSON.parse(message.toString());
                const to = parsedMessage.to;
                if (to && clients[to] && clients[to].readyState === ws_1.WebSocket.OPEN) {
                    clients[to].send(JSON.stringify({ message: parsedMessage.message, from: parsedMessage.username }));
                }
                else {
                    ws.send(JSON.stringify({ message: "User not found", to: parsedMessage.to }));
                }
                break;
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
