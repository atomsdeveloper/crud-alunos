import { Router } from "express";
const router = new Router();

// Multer
import multer from "multer";

// Controller
import PhotoController from "../controllers/photoController.js";

// Middleware
import loginRequired from "../middlewares/loginRequired.js";

// Multer Config
import multerConfig from "../config/multer.js";

// Middleware
// Multer middleware to handle file uploads
// The multerConfig is passed as an argument to the multer function
// The single method is used to specify that we are expecting a single file upload
const upload = multer(multerConfig).single("file");

// Route
router.post("/", upload, loginRequired, PhotoController.store);

export default router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/
