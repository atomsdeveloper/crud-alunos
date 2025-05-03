import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

import cors from "cors";
import helmet from "helmet";

import { resolve } from "path";
import express from "express";

// Importing the database connection
import "./database/index.js";

// Routes
import homeRoute from "./routes/homeRoute.js";
import userRoute from "./routes/userRoute.js";
import tokenRoute from "./routes/tokenRoute.js";
import studentRoute from "./routes/studentRoute.js";
import photoRoute from "./routes/photoRoute.js";

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["*", "ws:", "http:", "https:"], // Allow all connections
          },
        },
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/", homeRoute);
    this.app.use("/users/", userRoute);
    this.app.use("/token/", tokenRoute);
    this.app.use("/students/", studentRoute);
    this.app.use("/photo/", photoRoute);
  }
}

// Exporting the instance of App
// This allows us to use the same instance across the application
export default new App().app;
