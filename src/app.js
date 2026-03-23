import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
//to allow limited storage
app.use(express.json({ limit: "16kb" }));
//to allow data from url
app.use(express.urlencoded({ limit: "16kb" }));
//apne server pe koi bhi file access kare uske liye this is public assets
app.use(express.static("public"));
//handle cookies
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
//routes declaration
app.use("/api/v1/user", userRouter);
//http://localhost:800/api/v1/users/register

export default app;
