"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const GroceryItem_1 = require("../models/GroceryItem");
const Order_1 = require("../models/Order");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "vipul",
    database: process.env.DB_NAME || "qp-assessment",
    synchronize: true, //Auto Sync Schema
    logging: false,
    entities: [GroceryItem_1.GroceryItem, Order_1.Order],
});
