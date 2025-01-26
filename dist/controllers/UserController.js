"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = exports.getAllGroceryItems = void 0;
const GroceryItem_1 = require("../models/GroceryItem");
const Order_1 = require("../models/Order");
const dataBase_1 = require("../database/dataBase");
const getAllGroceryItems = async (req, res) => {
    try {
        const groceryRepo = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
        const groceries = await groceryRepo.find();
        res.status(200).json(groceries);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch grocery items" });
    }
};
exports.getAllGroceryItems = getAllGroceryItems;
const placeOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;
        const groceryRepository = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
        const orderRepository = dataBase_1.AppDataSource.getRepository(Order_1.Order);
        // Calculate total price for the order
        let totalPrice = 0;
        for (const item of items) {
            const groceryItem = await groceryRepository.findOne({
                where: { id: item.id },
            });
            if (groceryItem) {
                totalPrice += groceryItem.price * item.quantity;
            }
        }
        // Create new order
        const newOrder = new Order_1.Order();
        newOrder.userId = userId;
        newOrder.items = items;
        newOrder.totalPrice = totalPrice;
        // Save the order to the database
        await orderRepository.save(newOrder);
        // Send success response
        res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });
    }
    catch (error) {
        console.error("Order placement failed:", error);
        res.status(500).json({ error: "Failed to place order" });
    }
};
exports.placeOrder = placeOrder;
