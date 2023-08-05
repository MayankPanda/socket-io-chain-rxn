import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const TestSocket = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io("http://localhost:8080"); // Change to your server's URL

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    return () => {
      // Clean up: Disconnect when the component unmounts
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("send_message", { message }); // Replace 'event_name' with your event name
    }
  };

  useEffect(() => {
    // Listen for incoming messages from the server
    if (socket) {
      socket.on("receive_message", (data) => {
        console.log("Received a message");
        setReceivedMessage(data.message);
      });
    }
  }, [socket]);

  return (
    <div>
      <h1>Socket.IO Test</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a message"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <h2>Received Message:</h2>
        <p>{receivedMessage}</p>
      </div>
    </div>
  );
};

export default TestSocket;
