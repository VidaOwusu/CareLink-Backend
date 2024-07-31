import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import userRouter from "./routes/user_route.js";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      //cookie: { secure: true }
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      }),
    })
  );



app.use(userRouter)

dbConnection();

const PORT = 2000

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`)
})

