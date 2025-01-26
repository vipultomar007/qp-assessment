import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { GroceryItem } from "../models/GroceryItem";
import { Order } from "../models/Order";
import { AppDataSource } from "../database/dataBase";

export const getAllGroceryItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groceryRepo = AppDataSource.getRepository(GroceryItem);
    const groceries = await groceryRepo.find();
    res.status(200).json(groceries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch grocery items" });
  }
};

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, items } = req.body;
    const groceryRepository = AppDataSource.getRepository(GroceryItem);
    const orderRepository = AppDataSource.getRepository(Order);

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
    const newOrder = new Order();
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
  } catch (error) {
    console.error("Order placement failed:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};
