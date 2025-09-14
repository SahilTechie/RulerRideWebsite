import dotenv from 'dotenv';
import { connectToDatabase } from './database';
import { User, Booking } from './models';

// Load environment variables
dotenv.config();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectToDatabase();
    
    // Clear existing data
    await User.deleteMany({});
    await Booking.deleteMany({});
    
    console.log('🗑️  Cleared existing data');
    
    // Create sample users
    const sampleUsers = [
      {
        username: 'admin',
        password: 'admin123' // In production, this should be hashed
      },
      {
        username: 'testuser',
        password: 'test123' // In production, this should be hashed
      }
    ];
    
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${createdUsers.length} sample users`);
    
    // Create sample bookings
    const sampleBookings = [
      {
        pickupLocation: 'Railway Station, Cityville',
        dropLocation: 'Central Mall, Cityville',
        vehicleType: 'car',
        dateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        paymentMethod: 'cash',
        estimatedFare: 150.00,
        status: 'pending',
        customerName: 'John Doe',
        customerPhone: '+91-9876543210'
      },
      {
        pickupLocation: 'Airport Terminal 1',
        dropLocation: 'Downtown Hotel',
        vehicleType: 'suv',
        dateTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        paymentMethod: 'card',
        estimatedFare: 250.00,
        status: 'confirmed',
        customerName: 'Jane Smith',
        customerPhone: '+91-9876543211'
      },
      {
        pickupLocation: 'Bus Stand, Old City',
        dropLocation: 'New Market Area',
        vehicleType: 'auto',
        dateTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
        paymentMethod: 'upi',
        estimatedFare: 80.00,
        status: 'pending',
        customerName: 'Raj Patel',
        customerPhone: '+91-9876543212'
      }
    ];
    
    const createdBookings = await Booking.insertMany(sampleBookings);
    console.log(`🚗 Created ${createdBookings.length} sample bookings`);
    
    console.log('✅ Database seeding completed successfully!');
    console.log('\nSample data created:');
    console.log('Users:', sampleUsers.map(u => u.username));
    console.log('Bookings:', createdBookings.length, 'bookings with various statuses');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();
