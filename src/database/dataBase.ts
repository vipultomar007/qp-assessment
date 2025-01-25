import { DataSource } from "typeorm";
import { GroceryItem } from "../models/GroceryItem";
import { Order } from "../models/Order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "vipul",
  database: process.env.DB_NAME || "qp-assessment",
  synchronize: true, //Auto Sync Schema
  logging: false,
  entities: [GroceryItem, Order],
});
