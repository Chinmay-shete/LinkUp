const express = require("express");
const router = express.Router();
const os = require("os");
const { redisClient } = require("../config/redis");

router.get("/", async (req, res) => {
  let redisStatus = "down";
  try {
    const ping = await redisClient.ping();
    if (ping === "PONG") {
      redisStatus = "up";
    }
  } catch (err) {
    // Redis down
  }

  const io = req.app.get("io");
  const activeConnections = io ? io.engine.clientsCount : 0;

  const health = {
    status: redisStatus === "up" ? "ok" : "partially_degraded",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    activeConnections,
    redisStatus,
    memoryUsage: process.memoryUsage(),
    cpuCores: os.cpus().length,
  };

  if (redisStatus === "up") {
    res.status(200).json(health);
  } else {
    res.status(503).json(health);
  }
});

module.exports = router;
