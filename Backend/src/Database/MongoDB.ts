import mongoose from "mongoose";

const URI = process.env.MONGO_URI;


export default async function startDB() {
    mongoose.connect(URI, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
    })
      .then(() => {
        console.log('[mongoose] Connected to MongoDB on the server');
    })
      .catch((err) => {
        console.error('[mongoose] Connection error', err);
    });
}