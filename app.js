import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
dotenv.config();


const app = express();

app.use(express.json());


//middlewares
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);






mongoose.connect("mongodb+srv://sarveshchavhanit:sarvesh@cluster0.f0ipeva.mongodb.net/")


.then(()=> app.listen(5000,()=> console.log("Connected to Database and Server is running")))

.catch((e)=> console.log(e));





