import { Request, Response } from "express";
import { AppDataSource } from "../database/dataBase";
import { GroceryItem } from "../models/GroceryItem";

export const UserController = {
  // View all items
  viewItems: async (_req: Request, res: Response): Promise<void> => {
    try {
      const items = await AppDataSource.getRepository(GroceryItem).find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  },

  // Book multiple items
  bookItems: async (req: Request, res: Response): Promise<void> => {
    try {
      const { itemIds } = req.body;
      const items = await AppDataSource.getRepository(GroceryItem).findByIds(
        itemIds
      );
      if (items.length === 0) {
        res.status(404).json({ message: "No items found" });
        return;
      }
      res.status(200).json({ message: "Items booked successfully", items });
    } catch (error) {
      res.status(500).json({ message: "Error booking items", error });
    }
  },
};
