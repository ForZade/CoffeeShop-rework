import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import StartDB from "./Database/MongoDB";
import passport from "./config/passport";

// Routes
import allRoutes from "./routes/index";

// Middlewares
import handleError500 from "./middlewares/error500";
import { loggerMiddleware } from "./middlewares/logger";

const PORT = process.env.PORT || 3000;

const app = express();

async function initializeDatabase() {
  try {
    await StartDB();
  } catch (err) {
    console.log(err);
  }
}

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`[express] Server is running on port: ${PORT}`);
    });

    app.use(express.json());
    app.use(cookieParser());
    app.use(passport.initialize());

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );

    app.use(loggerMiddleware);

    app.use("/api/v1", allRoutes);
  } catch (err) {
    console.log(err);
  }
}

startServer();
