# RulerRide - Rural Ride Sharing Platform

A MERN stack application for affordable rural ride-sharing services.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: MongoDB + Mongoose
- **UI Components**: Radix UI + shadcn/ui

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (v5.0 or higher)
   - Local installation OR
   - MongoDB Atlas cloud account

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Quick Start (Memory Storage)

For immediate development without MongoDB setup:

```bash
npm run dev
```

This will start the server with in-memory storage at `http://localhost:5000`

### 3. MongoDB Setup (Optional but Recommended)

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. Run with MongoDB:
   ```bash
   npm run dev:mongo
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/rulerride
   ```
5. Run in production mode:
   ```bash
   npm start
   ```

### 4. Seed the Database (MongoDB only)

Add sample data to MongoDB:

```bash
npm run db:seed
```

## API Endpoints

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a specific booking
- `PATCH /api/bookings/:id/status` - Update booking status

### Request/Response Examples

#### Create Booking
```bash
POST /api/bookings
Content-Type: application/json

{
  "pickupLocation": "Railway Station",
  "dropLocation": "Central Mall",
  "vehicleType": "car",
  "dateTime": "2025-09-05T14:30:00Z",
  "paymentMethod": "cash",
  "estimatedFare": "150.00",
  "customerName": "John Doe",
  "customerPhone": "+91-9876543210"
}
```

#### Update Booking Status
```bash
PATCH /api/bookings/:id/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  pickupLocation: String,
  dropLocation: String,
  vehicleType: String, // 'car', 'bike', 'auto', 'suv'
  dateTime: Date,
  paymentMethod: String, // 'cash', 'card', 'upi', 'wallet'
  estimatedFare: Number,
  status: String, // 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'
  customerName: String,
  customerPhone: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Available Scripts

- `npm run dev` - Start development server (memory storage)
- `npm run dev:mongo` - Start development server with MongoDB
- `npm run build` - Build for production
- `npm run start` - Start production server (uses MongoDB if MONGODB_URI is set)
- `npm run check` - Run TypeScript type checking
- `npm run db:seed` - Seed MongoDB with sample data (requires MongoDB)

## Project Structure

```
RulerRide/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utility libraries
├── server/                 # Express backend
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── models.ts           # MongoDB models
│   ├── database.ts         # Database connection
│   ├── mongoStorage.ts     # Storage layer
│   └── seedDatabase.ts     # Database seeding
├── shared/                 # Shared TypeScript types
│   └── schema.ts           # Validation schemas
└── README.md
```

## Features

- **Ride Booking**: Complete booking system with validation
- **Real-time Updates**: Booking status management
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript support
- **Modern UI**: Beautiful components with Tailwind CSS
- **Data Persistence**: MongoDB with Mongoose ODM

## Development Notes

- The frontend remains unchanged and uses the same API endpoints
- MongoDB provides better flexibility for rural ride-sharing data
- Mongoose provides schema validation and type safety
- Environment variables are used for configuration
- The application supports both local and cloud MongoDB deployments

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Build the application: `npm run build`
4. Start the server: `npm start`

For cloud deployment, ensure your MongoDB connection string includes proper authentication and network access settings.
