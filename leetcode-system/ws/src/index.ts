import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";

const httpServer = createServer();
const io = new Server(httpServer);
const client = createClient();

io.on("connection", async (socket) => {
  await client.connect();
  console.log("A user connected: ID", socket.id);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    client.quit();
  });

  socket.on("submission", async (data) => {
    // if (!data.userId) {
    //   socket.emit("error", { message: "Invalid user ID" });
    //   return;
    // }
    // console.log("[WS]: Submission received", data.userId);
    

    // await client.subscribe(data.userId, (res: string) => {
    //   const data = JSON.parse(res);
    //   console.log("[WS]: Submission result", data);

    //   socket.emit("result", { ...data });
    // });
    console.log("Submission received", data);
    const parsedData = JSON.parse(data);
    console.log("Parsed data", parsedData.userId);
    
  });
});

httpServer.listen(8080, () => {
  console.log("Server is running on port 8080");
});
