import express from "express";

import StartDB from "./Database/MongoDB";
import dotenv from "dotenv";
import routes from "./routes/index";


dotenv.config();


const PORT = process.env.PORT || 4040;
const app = express();
app.use(express.json());
app.use("/api/v1", routes);

app.listen(4040, () => console.log(`[express] Server is running on port http://localhost:${PORT}`));

app.get('/status', (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Jeigu servas veikia tai ko tu neveiki"
    });
});
  

StartDB();