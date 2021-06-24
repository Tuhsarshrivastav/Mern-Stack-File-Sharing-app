import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
const app = express();
dotenv.config()


app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
