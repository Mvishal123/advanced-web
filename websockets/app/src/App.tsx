import { useEffect, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to socket server");
      setSocket(ws);
    };

    ws.onmessage = (data) => {
      setMessages((prev) => [...prev, data.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected from socket server");
    };

    ws.onerror = (error) => {
      console.log("Error connecting to socket server", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }

  const handleMessage = () => {
    if (message && socket) {
      socket.send(message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div>
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleMessage}>Send</button>
        </div>
        <div style={{ marginTop: "12px" }}>
          <h1 style={{ margin: "6px 0" }}>Messages</h1>
          <div>
            {messages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
