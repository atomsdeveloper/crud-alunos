import { Router } from "express";
const router = new Router();

// Middleware
import loginRequired from "../middlewares/loginRequired.js";

// Controller
import UserController from "../controllers/userController.js";

// Routes
// Not should be used in production
router.get("/", UserController.index);
// router.get("/:id", UserController.show);

router.post("/", UserController.store);
router.put("/", loginRequired, UserController.update);
router.delete("/", loginRequired, UserController.delete);

export default router;

/*
 index -> List all users -> GET
 show -> Show a user  -> GET
 store -> Create a user -> POST
 update -> Update a user -> PUT
 delete -> Delete a user -> DELETE
*/
