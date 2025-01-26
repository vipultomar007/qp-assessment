import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Routes
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Application = express();

// Security Middleware
app.use(helmet()); // Secure HTTP headers
app.use(xss()); // Prevent XSS attacks

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes); // Admin endpoints
app.use("/api/user", userRoutes); // User endpoints

// Health Check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API is running successfully!" });
});

// Error Handling Middleware
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
  next();
});

export default app;
