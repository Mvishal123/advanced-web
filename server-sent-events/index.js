const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/events", (req, res) => {
  // Set headers to establish Server-Sent Events
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial data
  res.write(`data: Connection established\n\n`);

  // Send updates every second
  const intervalId = setInterval(() => {
    const message = JSON.stringify({
      message: "Hello from server",
      time: new Date(),
    });
    res.write(`data: ${message}\n\n`);
  }, 1000);

  // Clear interval on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
