import { z } from "zod";

// User schema for validation (MongoDB compatible)
export const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Booking schema for validation (MongoDB compatible)
export const insertBookingSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropLocation: z.string().min(1, "Drop location is required"),
  vehicleType: z.enum(["car", "bike", "auto", "suv"], {
    errorMap: () => ({ message: "Please select a valid vehicle type" })
  }),
  dateTime: z.string().min(1, "Date and time is required"),
  paymentMethod: z.enum(["cash", "card", "upi", "wallet"], {
    errorMap: () => ({ message: "Please select a valid payment method" })
  }),
  estimatedFare: z.string().min(1, "Estimated fare is required"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = {
  id: string;
  username: string;
  password: string;
};

export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Booking = {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  dateTime: Date;
  paymentMethod: string;
  estimatedFare: string;
  status: string;
  customerName: string | null;
  customerPhone: string | null;
  createdAt: Date;
};

// Export the schemas for backward compatibility
export const users = null; // Not used with MongoDB
export const bookings = null; // Not used with MongoDB
