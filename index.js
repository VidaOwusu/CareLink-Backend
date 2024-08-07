import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import errorHandler from "errorhandler";
import userRouter from "./routes/user_route.js";
import profileRouter from "./routes/profile_route.js";
import appointmentRouter from "./routes/appointment_route.js"
import adminRouter from "./routes/admin_route.js";

const app = express();


expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: [
    "auth",
    "admin",
    "profile",
    "appointment",
    
  ],
  mongooseModels: mongoose.modelNames(),
});

app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
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

  dbConnection();

app.use("/api/v1", userRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", appointmentRouter);
app.use("/api/v1", adminRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));
app.use(errorHandler({ log: false }));



const PORT = 2000

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`)
})

