"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const validate_1 = require("../middleware/validate");
const userValidator_1 = require("../validators/userValidator");
const router = (0, express_1.Router)();
// Route to get all available grocery items
router.get("/groceries", UserController_1.getAllGroceryItems);
// Route to place an order
router.post("/order", (0, validate_1.validate)(userValidator_1.placeOrderSchema), UserController_1.placeOrder);
exports.default = router;
