import express from "express";
import getProductRoute from "./apiProduct/getProduct";
import StartDB from "./Database/MongoDB";
import logger from "./logger/logger";

const app = express();
app.use(express.json());
app.use("/api/v1", getProductRoute);

// START SERVER
try {
  const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  // HANDLE ERROR, LOG IT FOR DEBUGGING
  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      logger.error("Port 3000 is already in use.");
    } else {
      logger.error("Server error:", err);
    }
  });
} catch (err) {
  logger.error("Failed to start the server:", err);
}
// OBVIOUSLY
StartDB();
