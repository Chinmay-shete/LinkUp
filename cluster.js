require("dotenv").config();
const cluster = require("cluster");
const http = require("http");
const os = require("os");
const { setupMaster } = require("@socket.io/sticky");
const { setupPrimary } = require("@socket.io/cluster-adapter");
const logger = require("./config/logger");

if (cluster.isPrimary) {
  const PORT = process.env.PORT || 3000;
  const server = http.createServer();

  // Setup sticky session routing for socket.io handshakes
  setupMaster(server, {
    loadBalancingMethod: "least-connection",
  });

  // Setup cluster adapter primary
  setupPrimary();

  server.listen(PORT, () => {
    logger.info(`Master cluster process ${process.pid} listening on port ${PORT}`);
  });

  const numCPUs = os.cpus().length;
  logger.info(`Forking ${numCPUs} worker processes...`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.error(`Worker process ${worker.process.pid} exited with code ${code} (${signal}). Forking replacement...`);
    cluster.fork();
  });
} else {
  logger.info(`Worker process ${process.pid} started`);
  const { io } = require("./server");
  const { setupWorker } = require("@socket.io/sticky");

  // Hook worker to sticky master
  setupWorker(io);
}
