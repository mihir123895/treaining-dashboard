import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import moduleRoutes from "./routes/modules.js"

dotenv.config();
const app = express();
app.use(cors({
  origin: "https://treaining-dashboard-v9dk.vercel.app",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/modules",moduleRoutes)

app.get("/", (req, res) => {
    res.send("Training management Backend is running");
})


const PORT = process.env.PORT ||  5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT} : http://localhost:${PORT}`);
}) 

