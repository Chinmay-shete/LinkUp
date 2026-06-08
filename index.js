const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);

// Configure socket.io with robust ping timeouts to avoid false disconnects
// during camera/mic permission prompt interruptions, and support CORS.
const io = socketIo(server, {
  pingTimeout: 60000,   // 60 seconds
  pingInterval: 25000,  // 25 seconds
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Initialize socket handler module
require("./sockets/chatSocket")(io);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
