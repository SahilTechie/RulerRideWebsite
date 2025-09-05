import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pickupLocation: text("pickup_location").notNull(),
  dropLocation: text("drop_location").notNull(),
  vehicleType: text("vehicle_type").notNull(),
  dateTime: timestamp("date_time").notNull(),
  paymentMethod: text("payment_method").notNull(),
  estimatedFare: decimal("estimated_fare", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
  createdAt: true,
}).extend({
  dateTime: z.string().min(1, "Date and time is required"),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
