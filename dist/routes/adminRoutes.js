"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const validate_1 = require("../middleware/validate");
const adminValidator_1 = require("../validators/adminValidator");
const router = express_1.default.Router();
// Add a new grocery item
router.post("/addItems", (0, validate_1.validate)(adminValidator_1.addGroceryItemSchema), AdminController_1.addGrocery);
// Delete a grocery item
router.delete("/delete/:id", AdminController_1.deleteGrocery);
// View all grocery items
router.get("/items", AdminController_1.viewGroceries);
// Update grocery details (name, price, description)
router.patch("/update/:id", (0, validate_1.validate)(adminValidator_1.updateGroceryItemSchema), AdminController_1.updateGrocery);
// Patch inventory details (quantity)
router.patch("/inventory/:id", (0, validate_1.validate)(adminValidator_1.patchInventorySchema), AdminController_1.patchInventory);
exports.default = router;
