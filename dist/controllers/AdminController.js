"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchInventory = exports.updateGrocery = exports.viewGroceries = exports.deleteGrocery = exports.addGrocery = void 0;
const dataBase_1 = require("../database/dataBase");
const GroceryItem_1 = require("../models/GroceryItem");
// Add a new grocery item
const addGrocery = async (req, res, next) => {
    try {
        const groceryRepo = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
        const { name, price, description, quantity } = req.body;
        const newGrocery = groceryRepo.create({
            name,
            price,
            description,
            quantity,
        });
        await groceryRepo.save(newGrocery);
        res.status(201).json({
            message: "Grocery item added successfully",
            grocery: newGrocery,
        });
    }
    catch (err) {
        next(err); // Use next() to pass errors to Express's error handler
    }
};
exports.addGrocery = addGrocery;
// Delete a grocery item
const deleteGrocery = async (req, res, next) => {
    const groceryRepo = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const { id } = req.params;
    try {
        const grocery = await groceryRepo.findOneBy({ id: parseInt(id, 10) });
        if (!grocery) {
            res.status(404).json({ message: "Grocery item not found" });
            return;
        }
        await groceryRepo.remove(grocery);
        res.status(200).json({ message: "Grocery item deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteGrocery = deleteGrocery;
// View all grocery items
const viewGroceries = async (req, res, next) => {
    const groceryRepo = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    try {
        const groceries = await groceryRepo.find();
        res.status(200).json({ groceries });
    }
    catch (error) {
        next(error);
    }
};
exports.viewGroceries = viewGroceries;
// Update grocery details (name, price, description)
const updateGrocery = async (req, res, next) => {
    const groceryRepo = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const grocery = await groceryRepo.findOneBy({ id: parseInt(id, 10) });
        if (!grocery) {
            res.status(404).json({ message: "Grocery item not found" });
            return;
        }
        if (name)
            grocery.name = name;
        if (price !== undefined)
            grocery.price = price;
        if (description)
            grocery.description = description;
        await groceryRepo.save(grocery);
        res
            .status(200)
            .json({ message: "Grocery item updated successfully", grocery });
    }
    catch (error) {
        next(error);
    }
};
exports.updateGrocery = updateGrocery;
// Patch inventory details (quantity)
const patchInventory = async (req, res, next) => {
    const groceryRepo = dataBase_1.AppDataSource.getRepository(GroceryItem_1.GroceryItem);
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const grocery = await groceryRepo.findOneBy({ id: parseInt(id, 10) });
        if (!grocery) {
            res.status(404).json({ message: "Grocery item not found" });
            return;
        }
        if (quantity !== undefined) {
            grocery.quantity = quantity;
        }
        await groceryRepo.save(grocery);
        res
            .status(200)
            .json({ message: "Inventory updated successfully", grocery });
    }
    catch (error) {
        next(error);
    }
};
exports.patchInventory = patchInventory;
