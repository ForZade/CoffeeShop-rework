import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import StartDB from "./Database/MongoDB";

//Routes
import allRoutes from "./routes/index";
import { generateUserId } from "./utils/idgen";
import handleError500 from "./middlewares/error500";
import { loggerMiddleware } from "./middlewares/logger";

const PORT = process.env.PORT || 3000;

const app = express();

async function initializeDatabase() {
    try {
        await StartDB();
    }
    catch (err) {
        console.log(err);
    }
}

async function startServer() {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`[express] Server is running on port: ${PORT}`)
        });
        app.use(express.json());
        app.use(cors({
                origin: "http://localhost:5173",
                credentials: true
        }));

        app.use(handleError500);
        app.use(loggerMiddleware);

        app.use("/api/v1", allRoutes);
    } 
    catch (err) {
        console.log(err);
    }
}

startServer();