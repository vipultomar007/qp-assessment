import express from "express";
import {
  addGrocery,
  deleteGrocery,
  viewGroceries,
  updateGrocery,
  patchInventory,
} from "../controllers/AdminController";
import { validate } from "../middleware/validate";
import {
  addGroceryItemSchema,
  updateGroceryItemSchema,
  patchInventorySchema,
} from "../validators/adminValidator";

const router = express.Router();

// Add a new grocery item
router.post("/addItems", validate(addGroceryItemSchema), addGrocery);

// Delete a grocery item
router.delete("/delete/:id", deleteGrocery);

// View all grocery items
router.get("/items", viewGroceries);

// Update grocery details (name, price, description)
router.patch("/update/:id", validate(updateGroceryItemSchema), updateGrocery);

// Patch inventory details (quantity)
router.patch("/inventory/:id", validate(patchInventorySchema), patchInventory);

export default router;
