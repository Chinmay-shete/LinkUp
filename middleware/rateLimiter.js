const rateLimit = require("express-rate-limit");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const { redisClient } = require("../config/redis");
const logger = require("../config/logger");

// HTTP Rate Limiter (express-rate-limit)
const httpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 429, message: "Too many requests from this IP, please try again after 15 minutes" },
});

// Socket.IO Connection Rate Limiter (rate-limiter-flexible + Redis)
// Limit to 10 connections per minute per IP, block for 5 minutes if exceeded
const connectionLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit_conn",
  points: 10,
  duration: 60,
  blockDuration: 300,
});

// Socket.IO Message/Event Rate Limiter
// Limit to 5 events per second per Socket ID
const eventLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit_event",
  points: 5,
  duration: 1,
});

const socketConnectionRateLimiter = async (socket, next) => {
  const ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
  try {
    await connectionLimiter.consume(ip);
    next();
  } catch (rejRes) {
    logger.warn({ ip }, "Socket connection rate limit exceeded");
    const err = new Error("Too many connections. Please wait 5 minutes.");
    err.data = { status: 429, retryAfter: Math.round(rejRes.msBeforeNext / 1000) };
    next(err);
  }
};

const socketEventRateLimiter = (socket, next) => {
  socket.use(async (packet, nextMiddle) => {
    const eventName = packet[0];
    // Rate limit message sending and room commands
    if (["message", "joinroom", "nextStranger", "startVideoCall"].includes(eventName)) {
      try {
        await eventLimiter.consume(socket.id);
        nextMiddle();
      } catch (rejRes) {
        logger.warn({ socketId: socket.id, eventName }, "Socket event rate limit exceeded");
        socket.emit("error_msg", "Rate limit exceeded. Please slow down.");
        // We reject the event execution by passing an error, which socket.io handles
        nextMiddle(new Error("Rate limit exceeded"));
      }
    } else {
      nextMiddle();
    }
  });
  next();
};

module.exports = {
  httpLimiter,
  socketConnectionRateLimiter,
  socketEventRateLimiter,
};
