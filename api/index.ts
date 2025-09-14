import express, { Request, Response } from "express";
import { registerRoutes } from "../server/routes";
import { connectToDatabase } from "../server/database";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use((req, res, next) => {
  // Basic CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database if using MongoDB
if (process.env.USE_MONGODB === 'true' || (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI)) {
  connectToDatabase().catch(console.error);
}

// Initialize routes
registerRoutes(app);

// Export the Express app as a serverless function
export default app;