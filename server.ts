import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import fileRouter from "./routes/api";
import { v2 as cloudinary } from "cloudinary";
const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.API_CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

connectDb();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/files/", fileRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
