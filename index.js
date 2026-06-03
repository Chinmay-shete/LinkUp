const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
let waitingusers = [];
let socketRooms = {};
io.on("connection", function (socket) {
  socket.on("joinroom", function () {
    if (socketRooms[socket.id]) {
      socket.leave(socketRooms[socket.id]);
      delete socketRooms[socket.id];
    }

    if (waitingusers.includes(socket)) {
      return;
    }

    if (waitingusers.length > 0) {
      let partner = waitingusers.shift();
      const roomname = `${socket.id}-${partner.id}`;
      socket.join(roomname);
      partner.join(roomname);
      socketRooms[socket.id] = roomname;
      socketRooms[partner.id] = roomname;
      io.to(roomname).emit("joined", roomname);
    } else {
      waitingusers.push(socket);
    }
  });

  socket.on("nextStranger", function () {
    const room = socketRooms[socket.id];
    if (room) {
      socket.broadcast.to(room).emit("partnerDisconnected");
      socket.leave(room);
      delete socketRooms[socket.id];
    } else {
      let index = waitingusers.findIndex((waitingUser) => waitingUser.id === socket.id);
      if (index !== -1) {
        waitingusers.splice(index, 1);
      }
    }

    if (waitingusers.length > 0) {
      let partner = waitingusers.shift();
      const roomname = `${socket.id}-${partner.id}`;
      socket.join(roomname);
      partner.join(roomname);
      socketRooms[socket.id] = roomname;
      socketRooms[partner.id] = roomname;
      io.to(roomname).emit("joined", roomname);
    } else {
      waitingusers.push(socket);
    }
  });
  socket.on("signalingMessage", (data) => {
    if (socketRooms[socket.id] === data.room) {
      socket.broadcast.to(data.room).emit("signalingMessage", data.message);
    }
  });

  socket.on("message",function(data){
    if (socketRooms[socket.id] === data.room) {
      socket.broadcast.to(data.room).emit("message",data.message)
    }
  })

  socket.on("startVideoCall",function({room}){
    if (socketRooms[socket.id] === room) {
      socket.broadcast.to(room).emit("incomingCall")
    }
  })

  socket.on("rejectCall",function({room}){
    if (socketRooms[socket.id] === room) {
      socket.broadcast.to(room).emit("callRejected")
    }
  })

  socket.on("acceptCall",function({room}){
    if (socketRooms[socket.id] === room) {
      socket.broadcast.to(room).emit("callAccepted")
    }
  })
 
  socket.on("disconnect", function () {
    const room = socketRooms[socket.id];
    if (room) {
      socket.broadcast.to(room).emit("partnerDisconnected");
      delete socketRooms[socket.id];
    }
    let index = waitingusers.findIndex(
      (waitingUser) => waitingUser.id === socket.id
    );
    if (index !== -1) {
      waitingusers.splice(index, 1);
    }
  });
});

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
