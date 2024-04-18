import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected at:", new Date());
  console.log("Number of users: ", io.engine.clientsCount);

  socket.on("chat", (payload) => {
    console.log("PAYLOAD RECEIVED:", payload);
    io.emit("chat", payload);
  });

  socket.on("error", (err) => {
    console.log("ERROR: ", err);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
