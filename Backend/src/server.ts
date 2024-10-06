import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import StartDB from "./Database/MongoDB";

// Routes
import allRoutes from "./routes/index";

// Middlewares
import { loggerMiddleware } from "./middlewares/logger";

const PORT = process.env.PORT || 3000;

const app = express();

async function initializeDatabase() {
  try {
    await StartDB();
  } catch (err: unknown) {
    console.log(err);
  }
}

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(
        `[express] Server is running on port: http://localhost:${PORT}`,
      );
    });

    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );

    app.use(loggerMiddleware);

    app.use("/api/v1", allRoutes);

    // app.use(handleError500);
  } catch (err: unknown) {
    console.log(err);
  }
}

startServer();
