const logger = require("../config/logger");
const { redisClient } = require("../config/redis");

async function disbandRoom(io, roomname) {
  if (!roomname) return;
  const ids = roomname.split("-");
  if (ids.length === 2) {
    const [id1, id2] = ids;
    io.in(id1).socketsLeave(roomname);
    io.in(id2).socketsLeave(roomname);
    await redisClient.hdel("linkup:rooms", id1);
    await redisClient.hdel("linkup:rooms", id2);
    logger.info({ roomname }, "Room disbanded");
  }
}

// Run stale queue cleaner every 30 seconds
setInterval(async () => {
  try {
    const now = Date.now();
    const staleTime = now - 60000;
    const staleUsers = await redisClient.zrangebyscore("linkup:queue_timestamps", 0, staleTime);

    if (staleUsers.length > 0) {
      logger.info({ count: staleUsers.length }, "Cleaning stale queued users");
      for (const userId of staleUsers) {
        await redisClient.lrem("linkup:queue", 0, userId);
        await redisClient.srem("linkup:queued_users", userId);
        await redisClient.zrem("linkup:queue_timestamps", userId);
      }
    }
  } catch (err) {
    logger.error({ err }, "Error running stale queue cleaner");
  }
}, 30000);

module.exports = function (io) {
  io.on("connection", async function (socket) {
    logger.info({ socketId: socket.id }, "User connected");
    await redisClient.sadd("linkup:active_sockets", socket.id);

    socket.on("joinroom", async function () {
      try {
        const room = await redisClient.hget("linkup:rooms", socket.id);
        if (room) {
          io.in(socket.id).socketsLeave(room);
          await redisClient.hdel("linkup:rooms", socket.id);
        }

        await matchUser(socket);
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in joinroom");
      }
    });

    socket.on("nextStranger", async function () {
      try {
        const room = await redisClient.hget("linkup:rooms", socket.id);
        if (room) {
          socket.broadcast.to(room).emit("partnerDisconnected");
          await disbandRoom(io, room);
        } else {
          await redisClient.lrem("linkup:queue", 0, socket.id);
          await redisClient.srem("linkup:queued_users", socket.id);
          await redisClient.zrem("linkup:queue_timestamps", socket.id);
        }

        await matchUser(socket);
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in nextStranger");
      }
    });

    socket.on("signalingMessage", async (data) => {
      try {
        const room = await redisClient.hget("linkup:rooms", socket.id);
        if (room && room === data.room) {
          socket.broadcast.to(data.room).emit("signalingMessage", data.message);
        }
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in signalingMessage");
      }
    });

    socket.on("message", async function (data) {
      try {
        const room = await redisClient.hget("linkup:rooms", socket.id);
        if (data && room && room === data.room) {
          if (typeof data.message === "string" && data.message.trim().length > 0) {
            if (data.message.length > 1000) {
              socket.emit("error_msg", "Message cannot exceed 1000 characters.");
              return;
            }
            socket.broadcast.to(data.room).emit("message", data.message);
          }
        }
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in message");
      }
    });

    socket.on("startVideoCall", async function ({ room }) {
      try {
        const userRoom = await redisClient.hget("linkup:rooms", socket.id);
        if (userRoom && userRoom === room) {
          socket.broadcast.to(room).emit("incomingCall");
        }
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in startVideoCall");
      }
    });

    socket.on("rejectCall", async function ({ room }) {
      try {
        const userRoom = await redisClient.hget("linkup:rooms", socket.id);
        if (userRoom && userRoom === room) {
          socket.broadcast.to(room).emit("callRejected");
        }
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in rejectCall");
      }
    });

    socket.on("acceptCall", async function ({ room }) {
      try {
        const userRoom = await redisClient.hget("linkup:rooms", socket.id);
        if (userRoom && userRoom === room) {
          socket.broadcast.to(room).emit("callAccepted");
        }
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error in acceptCall");
      }
    });

    socket.on("disconnect", async function () {
      try {
        logger.info({ socketId: socket.id }, "User disconnected");
        await redisClient.srem("linkup:active_sockets", socket.id);
        await redisClient.srem("linkup:queued_users", socket.id);
        await redisClient.zrem("linkup:queue_timestamps", socket.id);

        const room = await redisClient.hget("linkup:rooms", socket.id);
        if (room) {
          socket.broadcast.to(room).emit("partnerDisconnected");
          await disbandRoom(io, room);
        }
      } catch (err) {
        logger.error({ err, socketId: socket.id }, "Error on disconnect");
      }
    });

    async function matchUser(s) {
      let matched = false;
      let attempts = 0;

      while (!matched && attempts < 10) {
        attempts++;
        const partnerId = await redisClient.rpop("linkup:queue");
        if (!partnerId) {
          break;
        }

        if (partnerId === s.id) {
          continue;
        }

        const [isActive, hasRoom] = await Promise.all([
          redisClient.sismember("linkup:active_sockets", partnerId),
          redisClient.hexists("linkup:rooms", partnerId)
        ]);

        if (isActive && !hasRoom) {
          matched = true;
          const roomname = `${s.id}-${partnerId}`;

          await redisClient.hset("linkup:rooms", s.id, roomname);
          await redisClient.hset("linkup:rooms", partnerId, roomname);

          await redisClient.srem("linkup:queued_users", s.id);
          await redisClient.srem("linkup:queued_users", partnerId);
          await redisClient.zrem("linkup:queue_timestamps", s.id);
          await redisClient.zrem("linkup:queue_timestamps", partnerId);

          io.in(s.id).socketsJoin(roomname);
          io.in(partnerId).socketsJoin(roomname);

          logger.info({ roomname, user1: s.id, user2: partnerId }, "Users matched successfully");
          io.to(roomname).emit("joined", roomname);
          return;
        } else {
          await redisClient.srem("linkup:queued_users", partnerId);
          await redisClient.zrem("linkup:queue_timestamps", partnerId);
        }
      }

      const alreadyQueued = await redisClient.sismember("linkup:queued_users", s.id);
      if (!alreadyQueued) {
        await redisClient.sadd("linkup:queued_users", s.id);
        await redisClient.lpush("linkup:queue", s.id);
        await redisClient.zadd("linkup:queue_timestamps", Date.now(), s.id);
        logger.info({ socketId: s.id }, "User added to queue");
      }
    }
  });
};
