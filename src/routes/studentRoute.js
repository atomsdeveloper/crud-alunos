import { Router } from "express";
const router = new Router();

// Middleware
import loginRequired from "../middlewares/loginRequired.js";

// Controller
import StudentController from "../controllers/studentController.js";

// Routes

// List all students
router.get("/", StudentController.index);
router.get("/:id", StudentController.show);
router.post("/create", loginRequired, StudentController.store);
router.put("/:id/edit", loginRequired, StudentController.update);
router.delete("/:id/delete", loginRequired, StudentController.delete);

export default router;

/*
 index -> List all Students -> GET
 show -> Show a Student  -> GET
 store -> Create a Student -> POST
 update -> Update a Student -> PUT
 delete -> Delete a Student -> DELETE
*/
