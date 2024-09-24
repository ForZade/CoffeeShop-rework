import express from "express";

import StartDB from "./Database/MongoDB";

const app = express();

app.listen(3000, () => console.log("[express] Server is running on port 3000"));

StartDB();