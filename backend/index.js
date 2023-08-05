require("dotenv").config();
const express = require("express");
const http = require("http"); // Import the http module
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { Server } = require("socket.io");

// Create an http server using the existing Express app
const server = http.createServer(app);

// Initialize Socket.IO by passing the http server instance
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Change this to your React app's URL
      methods: ["GET", "POST"]
    }
  });
  
  io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Handle Socket.IO events for this connected user
    socket.on("send_message", (data) => {
      // Handle the event here
      console.log("Received message:", data);
      io.emit("receive_message", { message: data.message });
    });
  
    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Socket.IO events and logic can be added here

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});