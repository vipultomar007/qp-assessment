import express from "express";
import { AdminController } from "../controllers/AdminController";

const router = express.Router();

router.post("/items", AdminController.addItem);
router.get("/items", AdminController.getItems);
router.put("/items/:id", AdminController.updateItem);
router.delete("/items/:id", AdminController.deleteItem);

export default router;
