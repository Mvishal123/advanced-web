import express from "express";
import { Server } from "socket.io";
import http from "http";
import { Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = Socket(server);

io.on("connection", (socket) => {
  console.log("SOCKET: ", socket);
  console.log("A user connected at:", new Date());
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
