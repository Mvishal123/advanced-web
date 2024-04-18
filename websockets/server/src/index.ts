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
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(client);

        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send("ws client connected on " + new Date());
});

server.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});
