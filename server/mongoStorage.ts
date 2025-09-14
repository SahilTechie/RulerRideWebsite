import { type User, type InsertUser, type Booking, type InsertBooking } from "@shared/schema";
import { User as UserModel, Booking as BookingModel, type IUser, type IBooking } from "./models";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: string): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
}

export class MongoStorage implements IStorage {
  constructor() {
    // Connection is handled in index.ts
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id).lean();
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username }).lean();
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        username: user.username,
        password: user.password,
      };
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const user = new UserModel(insertUser);
      const savedUser = await user.save();
      
      return {
        id: (savedUser._id as any).toString(),
        username: savedUser.username,
        password: savedUser.password,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    try {
      const bookingData = {
        pickupLocation: insertBooking.pickupLocation,
        dropLocation: insertBooking.dropLocation,
        vehicleType: insertBooking.vehicleType,
        dateTime: new Date(insertBooking.dateTime),
        paymentMethod: insertBooking.paymentMethod,
        estimatedFare: parseFloat(insertBooking.estimatedFare),
        customerName: insertBooking.customerName,
        customerPhone: insertBooking.customerPhone,
        status: 'pending',
      };

      const booking = new BookingModel(bookingData);
      const savedBooking = await booking.save();
      
      return {
        id: (savedBooking._id as any).toString(),
        pickupLocation: savedBooking.pickupLocation,
        dropLocation: savedBooking.dropLocation,
        vehicleType: savedBooking.vehicleType,
        dateTime: savedBooking.dateTime,
        paymentMethod: savedBooking.paymentMethod,
        estimatedFare: savedBooking.estimatedFare.toString(),
        status: savedBooking.status,
        customerName: savedBooking.customerName || null,
        customerPhone: savedBooking.customerPhone || null,
        createdAt: savedBooking.createdAt || new Date(),
      };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw new Error('Failed to create booking');
    }
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    try {
      const booking = await BookingModel.findById(id).lean();
      if (!booking) return undefined;
      
      return {
        id: booking._id.toString(),
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        vehicleType: booking.vehicleType,
        dateTime: booking.dateTime,
        paymentMethod: booking.paymentMethod,
        estimatedFare: booking.estimatedFare.toString(),
        status: booking.status,
        customerName: booking.customerName || null,
        customerPhone: booking.customerPhone || null,
        createdAt: booking.createdAt || new Date(),
      };
    } catch (error) {
      console.error('Error getting booking:', error);
      return undefined;
    }
  }

  async getAllBookings(): Promise<Booking[]> {
    try {
      const bookings = await BookingModel.find({})
        .sort({ createdAt: -1 })
        .lean();
      
      return bookings.map(booking => ({
        id: booking._id.toString(),
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        vehicleType: booking.vehicleType,
        dateTime: booking.dateTime,
        paymentMethod: booking.paymentMethod,
        estimatedFare: booking.estimatedFare.toString(),
        status: booking.status,
        customerName: booking.customerName || null,
        customerPhone: booking.customerPhone || null,
        createdAt: booking.createdAt || new Date(),
      }));
    } catch (error) {
      console.error('Error getting all bookings:', error);
      return [];
    }
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    try {
      const booking = await BookingModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).lean();
      
      if (!booking) return undefined;
      
      return {
        id: booking._id.toString(),
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        vehicleType: booking.vehicleType,
        dateTime: booking.dateTime,
        paymentMethod: booking.paymentMethod,
        estimatedFare: booking.estimatedFare.toString(),
        status: booking.status,
        customerName: booking.customerName || null,
        customerPhone: booking.customerPhone || null,
        createdAt: booking.createdAt || new Date(),
      };
    } catch (error) {
      console.error('Error updating booking status:', error);
      return undefined;
    }
  }
}

// Memory storage implementation (keeping as fallback)
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { randomUUID } = await import("crypto");
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const { randomUUID } = await import("crypto");
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      dateTime: new Date(insertBooking.dateTime),
      status: "pending",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }
}

// Create storage instance
const createStorage = (): IStorage => {
  // Use MongoDB if explicitly requested or in production with MONGODB_URI
  if (process.env.USE_MONGODB === 'true' || (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI)) {
    console.log('✅ Using MongoDB storage');
    return new MongoStorage();
  } else {
    console.log('ℹ️  Using memory storage (development mode)');
    console.log('ℹ️  To use MongoDB in development, run: npm run dev:mongo');
    return new MemStorage();
  }
};

export const storage = createStorage();
