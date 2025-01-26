"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dataBase_1 = require("./database/dataBase");
const PORT = process.env.PORT || 5000;
//start the server only after connecting to the db
dataBase_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected successfully");
    app_1.default.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
    .catch((error) => console.error(`Failed to start the server: ${error}`));
