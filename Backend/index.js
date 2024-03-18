import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import MahasiswaRoute from "./routes/MahasiswaRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(MahasiswaRoute);
app.listen(process.env.APP_PORT, () => {
    console.log(`Server running up...http://localhost:${process.env.APP_PORT}`);
});