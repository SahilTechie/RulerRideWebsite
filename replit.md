# Overview

RulerRide is a ride-sharing web application designed specifically for rural and semi-urban communities. The platform connects local drivers with passengers, offering affordable, comfortable, and safe transportation options including bikes, autos, and cars. The application features a modern React frontend with a comprehensive booking system and a Node.js/Express backend with PostgreSQL database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom color scheme optimized for rural branding (green, orange, blue palette)
- **State Management**: TanStack React Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for robust form handling
- **Animations**: Framer Motion for smooth animations and scroll-based reveals

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Design**: RESTful API structure with dedicated booking endpoints
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

## Database Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations with schema definitions in TypeScript
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Data Models**: Users and bookings with proper relationships and constraints

## Development Environment
- **Build System**: Vite for fast development and optimized production builds
- **TypeScript Configuration**: Monorepo setup with path mapping for clean imports
- **Code Quality**: ESM modules throughout the stack for modern JavaScript practices
- **Hot Reload**: Development server with HMR for rapid iteration

## Component Structure
The frontend is organized into feature-based components:
- **Navigation**: Sticky header with smooth scrolling to sections
- **Hero Section**: Animated background with call-to-action
- **Booking System**: Multi-step form with vehicle selection and payment options
- **Features**: Service highlights with icons and animations
- **About Section**: Company story with achievement metrics
- **Testimonials**: Customer feedback with rural community focus
- **Footer**: Contact information and social links

## API Endpoints
- `POST /api/bookings` - Create new ride bookings
- `GET /api/bookings` - Retrieve all bookings
- `GET /api/bookings/:id` - Get specific booking details
- `PATCH /api/bookings/:id/status` - Update booking status

## Storage Strategy
The application uses a dual storage approach:
- **Production**: PostgreSQL database with Drizzle ORM
- **Development**: In-memory storage for rapid prototyping and testing

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle ORM**: Type-safe database toolkit with schema management and migrations

## UI Framework
- **Radix UI**: Headless component primitives for accessibility and customization
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for responsive design

## Development Tools
- **Vite**: Next-generation frontend tooling for fast builds and HMR
- **TypeScript**: Static type checking for enhanced developer experience
- **Framer Motion**: Animation library for smooth user interactions

## Form Management
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation for forms and API data

## State Management
- **TanStack React Query**: Server state management with caching and background updates

## Fonts and Assets
- **Google Fonts**: Inter font family for clean, readable typography
- **Unsplash**: High-quality stock photography for hero and feature sections