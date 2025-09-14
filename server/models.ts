import mongoose, { Document, Schema } from 'mongoose';

// User interfaces and schema
export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Booking interfaces and schema
export interface IBooking extends Document {
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  dateTime: Date;
  paymentMethod: string;
  estimatedFare: number;
  status: string;
  customerName: string;
  customerPhone: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  pickupLocation: {
    type: String,
    required: true,
    trim: true
  },
  dropLocation: {
    type: String,
    required: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['car', 'bike', 'auto', 'suv'],
    default: 'car'
  },
  dateTime: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cash', 'card', 'upi', 'wallet'],
    default: 'cash'
  },
  estimatedFare: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Create indexes for better performance
userSchema.index({ username: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ customerPhone: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
