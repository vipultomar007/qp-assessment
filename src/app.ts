import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

//Routes
import adminRoutes from "./routes/adminRoutes";
// import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

//Middleware
app.use(cors());
app.use(express.json());

//API route
app.use("/api/admin", adminRoutes);
// app.use("/api/user", userRoutes);

//Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Server is up and running" });
});

//Global error Handling
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
  next();
});

export default app;
