import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = 4000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello Tade!");
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    // Save to the database here
    socket.emit("message-from-server", data);
  });

  socket.on("disconnect", (data) => {
    console.log("User left!");
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
