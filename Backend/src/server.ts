import express from "express";
import dotenv from "dotenv";
dotenv.config();
import StartDB from "./Database/MongoDB";
import indexRoute from "./routes/index";
import { Admin } from "mongodb";
import adminRoute from "./routes/admin/Admins";

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => console.log("[express] Server is running on port 7000"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", indexRoute);
app.use("/admin", adminRoute); 

StartDB();