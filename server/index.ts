import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { connectToDatabase } from "./database";
import dotenv from "dotenv";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Serve static files from the React app
const distPath = path.join(__dirname, "../dist/public");
app.use(express.static(distPath));

// Start server with routes
const startServer = async () => {
  try {
    const server = await registerRoutes(app);
    
    // Handle React routing - serve index.html for all non-API routes
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(distPath, "index.html"));
      } else {
        res.status(404).json({ message: "API endpoint not found" });
      }
    });

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📁 Serving static files from: ${distPath}`);
      
      if (process.env.USE_MONGODB === 'true') {
        console.log("🗄️  Using MongoDB storage");
      } else {
        console.log("💾 Using memory storage (development mode)");
        console.log("ℹ️  To use MongoDB, run: npm run dev:mongo");
      }
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
