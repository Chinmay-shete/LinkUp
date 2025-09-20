const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");

const http = require("http");
const socketIo = require("socket.io");
const srever = http.createServer(app);
const io = socketIo(srever);
let waitingusers = [];
let rooms = {};
io.on("connection", function (socket) {
  socket.on("joinroom", function () {
    if (waitingusers.length > 0) {
      let patner = waitingusers.shift();
      const roomname = `${socket.id}-${patner.id}`;
      socket.join(roomname);
      patner.join(roomname);

      io.to(roomname).emit("joined",roomname);
    } else {
      waitingusers.push(socket);
    }
  });
  socket.on("message",function(data){
    socket.broadcast.to(data.room).emit("message",data.message)
     
  })
  socket.on("disconnect", function () {
    let index = waitingusers.findIndex(
      (waitingUsers) => waitingUsers.id === socket.id
    );
    waitingusers.splice(index, 1);
  });
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
srever.listen("3000");
