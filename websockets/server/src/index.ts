import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.end("hi there");
});
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data, isBinary) => {
    if (wss.clients.size <= 1) {
      console.log("No other clients connected");
    } else {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary });
        }
      });
    }
  });

  console.log("New client connected. Total clients: ", wss.clients.size);

  ws.send("ws client connected on " + new Date());
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
