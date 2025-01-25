import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

router.get("/items", UserController.viewItems);
router.post("/book", UserController.bookItems);

export default router;
