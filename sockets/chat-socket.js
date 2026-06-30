let waitingusers = [];
let socketRooms = {};

function disbandRoom(io, roomname) {
  if (!roomname) return;
  for (const socketId in socketRooms) {
    if (socketRooms[socketId] === roomname) {
      const s = io.sockets.sockets.get(socketId);
      if (s) {
        s.leave(roomname);
      }
      delete socketRooms[socketId];
    }
  }
}

module.exports = function (io) {
  io.on("connection", function (socket) {
    socket.on("joinroom", function () {
      if (socketRooms[socket.id]) {
        socket.leave(socketRooms[socket.id]);
        delete socketRooms[socket.id];
      }

      // Safeguard against duplicate queue entries
      const inQueue = waitingusers.some((u) => u.id === socket.id);
      if (inQueue) return;

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
        disbandRoom(io, room);
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

    socket.on("message", function (data) {
      if (socketRooms[socket.id] === data.room) {
        socket.broadcast.to(data.room).emit("message", data.message);
      }
    });

    socket.on("startVideoCall", function ({ room }) {
      if (socketRooms[socket.id] === room) {
        socket.broadcast.to(room).emit("incomingCall");
      }
    });

    socket.on("rejectCall", function ({ room }) {
      if (socketRooms[socket.id] === room) {
        socket.broadcast.to(room).emit("callRejected");
      }
    });

    socket.on("acceptCall", function ({ room }) {
      if (socketRooms[socket.id] === room) {
        socket.broadcast.to(room).emit("callAccepted");
      }
    });

    socket.on("disconnect", function () {
      const room = socketRooms[socket.id];
      if (room) {
        socket.broadcast.to(room).emit("partnerDisconnected");
        disbandRoom(io, room);
      }
      let index = waitingusers.findIndex(
        (waitingUser) => waitingUser.id === socket.id
      );
      if (index !== -1) {
        waitingusers.splice(index, 1);
      }
    });
  });
};
