import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user_route.js";
import profileRouter from "./routes/profile_route.js";
import appointmentRouter from "./routes/appointment_route.js"
import adminRouter from "./routes/admin_route.js";
import { passwordRouter } from "./routes/resetPassword_route.js";
import { restartServer } from "./config/restart_server.js";


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

  app.get("/api/v1/health", (req, res) => {
    res.json({ status: "UP" });
  });


app.use("/api/v1", userRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", appointmentRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", passwordRouter)

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));




const PORT = 2000

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL);
};

dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      reboot().then(() => {
        console.log(`Server Restarted`);
      });
      console.log(`Server is connected to Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });

