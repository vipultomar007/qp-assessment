import { Router } from "express";
import { getAllGroceryItems, placeOrder } from "../controllers/UserController";
import { validate } from "../middleware/validate";
import { placeOrderSchema } from "../validators/userValidator";

const router = Router();

// Route to get all available grocery items
router.get("/groceries", getAllGroceryItems);

// Route to place an order
router.post("/order", validate(placeOrderSchema), placeOrder);

export default router;
