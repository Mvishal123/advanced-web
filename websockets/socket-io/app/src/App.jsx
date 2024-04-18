import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3000");
const userId = nanoid(5);

const App = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log({ message });
    if (socket) {
      socket.emit("chat", { message, userId });
      console.log("Message sent");
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("chat", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.close();
  }, []);

  return (
    <main
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <form
          style={{ display: "flex", gap: "10px", margin: "10px 0" }}
          onSubmit={(e) => sendMessage(e)}
        >
          <input
            type="text"
            placeholder="enter message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit">Send</button>
        </form>
        <div>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "baseline", gap: "10px" }}
            >
              <span style={{ color: "red" }}>{msg.userId}: </span>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
