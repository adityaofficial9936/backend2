import express from "express";

import cookieParser  from "cookie-parser";
import cors from "cors";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20mb"}))
app.use(express.urlencoded({extended:true, limit: "20mb"}))
app.use(express.static("public"))
app.use(cookieParser()) 

// import routes

import userRoutes from "./routes/user.routes.js";

// roote declaration
app.use("/api/v1/users", userRoutes)
// here we are using the userRouter to handle the routes for the user module and we are using the /api/v1/users as the base route for the user module 

// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/users/login
export {app}; 