import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../database/dataBase";
import { GroceryItem } from "../models/GroceryItem";

// Add a new grocery item
export const addGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const groceryRepo = AppDataSource.getRepository(GroceryItem);
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
  } catch (err) {
    next(err); // Use next() to pass errors to Express's error handler
  }
};

// Delete a grocery item
export const deleteGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const groceryRepo = AppDataSource.getRepository(GroceryItem);
  const { id } = req.params;

  try {
    const grocery = await groceryRepo.findOneBy({ id: parseInt(id, 10) });
    if (!grocery) {
      res.status(404).json({ message: "Grocery item not found" });
      return;
    }

    await groceryRepo.remove(grocery);
    res.status(200).json({ message: "Grocery item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// View all grocery items
export const viewGroceries = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const groceryRepo = AppDataSource.getRepository(GroceryItem);

  try {
    const groceries = await groceryRepo.find();
    res.status(200).json({ groceries });
  } catch (error) {
    next(error);
  }
};

// Update grocery details (name, price, description)
export const updateGrocery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const groceryRepo = AppDataSource.getRepository(GroceryItem);
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const grocery = await groceryRepo.findOneBy({ id: parseInt(id, 10) });
    if (!grocery) {
      res.status(404).json({ message: "Grocery item not found" });
      return;
    }

    if (name) grocery.name = name;
    if (price !== undefined) grocery.price = price;
    if (description) grocery.description = description;
    await groceryRepo.save(grocery);
    res
      .status(200)
      .json({ message: "Grocery item updated successfully", grocery });
  } catch (error) {
    next(error);
  }
};

// Patch inventory details (quantity)
export const patchInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const groceryRepo = AppDataSource.getRepository(GroceryItem);
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
  } catch (error) {
    next(error);
  }
};
