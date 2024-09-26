import express from "express";
import dotenv from "dotenv";
dotenv.config();
import StartDB from "./Database/MongoDB";
import indexRoute from "./routes/index";

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => console.log("[express] Server is running on port 7000"));
app.use("/api/v1", indexRoute);

StartDB();