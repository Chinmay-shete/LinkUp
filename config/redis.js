const Redis = require("ioredis");
const logger = require("./logger");

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    logger.warn(`Redis connection failed. Retrying in ${delay}ms... (attempt ${times})`);
    return delay;
  },
};

const pubClient = new Redis(redisUrl, redisOptions);
const subClient = new Redis(redisUrl, redisOptions);
const redisClient = new Redis(redisUrl, redisOptions);

pubClient.on("error", (err) => logger.error({ err }, "Redis Pub Client Error"));
subClient.on("error", (err) => logger.error({ err }, "Redis Sub Client Error"));
redisClient.on("error", (err) => logger.error({ err }, "Redis General Client Error"));

pubClient.on("connect", () => logger.info("Redis Pub Client Connected"));
subClient.on("connect", () => logger.info("Redis Sub Client Connected"));
redisClient.on("connect", () => logger.info("Redis General Client Connected"));

module.exports = {
  pubClient,
  subClient,
  redisClient,
};
