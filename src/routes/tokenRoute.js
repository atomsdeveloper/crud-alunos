import { Router } from "express";
const router = new Router();

// Controller
import tokenController from "../controllers/tokenController.js";

router.post("/", tokenController.store);

export default router;

/*
 index -> List all Tokens -> GET
 show -> Show a Token  -> GET
 store -> Create a Token -> POST
 update -> Update a Token -> PUT
 delete -> Delete a Token -> DELETE
*/
