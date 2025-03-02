import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cors from "cors";
import productroute from "./productroute.js";
import userroute from './userroute.js';

dotenv.config();
const app=express();
// const PORT=process.env.PORT || 5000
app.use(cors());
app.use(express.json());

app.use('/api/products',productroute);
app.use('/api/users',userroute);

// console.log(process.env.MONGO_URL);
app.listen(5000, ()=>{
    connectDB();
    console.log("Server 5000")
});