import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

import express from "express";

// Importing the database connection
import "./src/database/index.js";

// Routes
import homeRoute from "./src/routes/homeRoute.js";
import userRoute from "./src/routes/userRoute.js";
import tokenRoute from "./src/routes/tokenRoute.js";
import studentRoute from "./src/routes/studentRoute.js";
import photoRoute from "./src/routes/photoRoute.js";

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
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
