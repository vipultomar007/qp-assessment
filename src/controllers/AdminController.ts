import { Request, Response } from "express";
import { AppDataSource } from "../database/dataBase";
import { GroceryItem } from "../models/GroceryItem";

export const AdminController = {
  // Add new item
  addItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const item = AppDataSource.getRepository(GroceryItem).create(req.body);
      const result = await AppDataSource.getRepository(GroceryItem).save(item);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error adding item", error });
    }
  },

  // Get all items
  getItems: async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await AppDataSource.getRepository(GroceryItem).find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  },

  // Update an existing item
  updateItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await AppDataSource.getRepository(GroceryItem).findOneBy({
        id: parseInt(req.params.id),
      });
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      AppDataSource.getRepository(GroceryItem).merge(item, req.body);
      const result = await AppDataSource.getRepository(GroceryItem).save(item);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error });
    }
  },

  // Delete an existing item
  deleteItem: async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await AppDataSource.getRepository(GroceryItem).delete(
        req.params.id
      );
      if (result.affected === 0) {
        res.status(404).json({ message: "Item not found" });
        return;
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  },
};
