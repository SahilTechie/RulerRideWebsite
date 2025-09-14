import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Car, Calendar, CreditCard, Check, CheckCircle, Shield, Clock, Heart, Bike, Zap, MapPinIcon, PhoneCall, User, Navigation, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertBooking, Booking } from "@shared/schema";

const bookingFormSchema = z.object({
  pickupLocation: z.string().min(2, "Pickup location must be at least 2 characters"),
  dropLocation: z.string().min(2, "Drop location must be at least 2 characters"),
  vehicleType: z.enum(["bike", "auto", "car"], {
    required_error: "Please select a vehicle type",
  }),
  dateTime: z.string().min(1, "Date and time is required"),
  paymentMethod: z.enum(["cash", "upi", "card"], {
    required_error: "Please select a payment method",
  }),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  estimatedFare: z.string(),
});

type BookingForm = z.infer<typeof bookingFormSchema>;

export default function BookingSection() {
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [showRideConfirmation, setShowRideConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [driverData, setDriverData] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      pickupLocation: "",
      dropLocation: "",
      vehicleType: "auto",
      dateTime: "",
      paymentMethod: "cash",
      customerName: "",
      customerPhone: "",
      estimatedFare: "80",
    },
  });

  const vehicleType = form.watch("vehicleType");
  const rates = { bike: 5, auto: 8, car: 12 };
  const baseDistance = 10;
  const estimatedFare = rates[vehicleType as keyof typeof rates] * baseDistance;

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: (booking: Booking) => {
      // Start 10-second loading animation
      setIsLoading(true);
      
      // Simulate driver assignment during loading
      const mockDriverData = {
        driverName: "Ramesh Kumar",
        driverPhone: "+91 98765 43210",
        driverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        vehicleNumber: "MH 12 AB 1234",
        vehicleModel: "Bajaj Auto Rickshaw",
        vehicleColor: "Yellow & Black",
        vehicleImage: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=200&fit=crop",
        rating: 4.8,
        experience: "5 years",
        languages: ["Hindi", "Marathi", "English"]
      };
      
      // After 10 seconds, show the confirmation with driver data
      setTimeout(() => {
        setIsLoading(false);
        setBookingSuccess(booking);
        setDriverData(mockDriverData);
        setShowRideConfirmation(true);
        queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
        toast({
          title: "Driver Assigned!",
          description: `${mockDriverData.driverName} will be your driver`,
        });
      }, 10000); // 10 seconds delay
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const handleContinueBooking = () => {
    setShowRideConfirmation(false);
    setBookingSuccess(null);
    setDriverData(null);
    setIsLoading(false);
    form.reset();
  };

  const onSubmit = (data: BookingForm) => {
    const bookingData: InsertBooking = {
      ...data,
      estimatedFare: estimatedFare.toString(),
    };
    createBookingMutation.mutate(bookingData);
  };

  const vehicleOptions = [
    { value: "bike", label: "Bike", icon: Bike, rate: "₹5/km" },
    { value: "auto", label: "Auto", icon: Zap, rate: "₹8/km" },
    { value: "car", label: "Car", icon: Car, rate: "₹12/km" },
  ];

  return (
    <section id="book" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="scroll-reveal text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Book Your Ride</h2>
          <p className="text-xl text-muted-foreground">Simple, fast, and reliable booking in just a few clicks</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Booking Form with Flip Animation */}
          <motion.div 
            className="scroll-reveal relative h-[700px] lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-full [perspective:1000px]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading-animation"
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 shadow-xl border border-primary/20 w-full h-full flex flex-col justify-center items-center text-center">
                      <motion.div
                        className="relative mb-8"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 via-yellow-500/30 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto shadow-lg">
                          <Zap className="w-16 h-16 text-yellow-500" />
                        </div>
                      </motion.div>

                      <div className="w-full max-w-sm mb-6">
                        <motion.div
                          className="h-2 bg-gray-200 rounded-full overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 10, ease: "linear" }}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        className="text-center"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Finding nearest ride available...
                        </h3>
                        <p className="text-muted-foreground">
                          Please wait while we connect you with a driver
                        </p>
                      </motion.div>
                    </Card>
                  </motion.div>
                ) : !showRideConfirmation ? (
                  <motion.div
                    key="booking-form"
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Card className="bg-card p-6 shadow-xl border border-border h-full overflow-y-auto">
                      <CardHeader className="px-0 pt-0">
                        <CardTitle>Book Your Ride</CardTitle>
                      </CardHeader>
                      <CardContent className="px-0 pb-0">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Personal Information Section */}
                            <div className="space-y-3">
                              <div className="border-b border-border pb-2">
                                <h3 className="text-lg font-semibold flex items-center">
                                  <User className="mr-2 h-5 w-5 text-primary" />
                                  Personal Information
                                </h3>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="customerName"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Enter your full name" 
                                          {...field} 
                                          className="h-10"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="customerPhone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Phone Number</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Enter your phone number" 
                                          {...field}
                                          className="h-10"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            {/* Journey Details Section */}
                            <div className="space-y-3">
                              <div className="border-b border-border pb-2">
                                <h3 className="text-lg font-semibold flex items-center">
                                  <Navigation className="mr-2 h-5 w-5 text-secondary" />
                                  Journey Details
                                </h3>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="pickupLocation"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-green-500" />
                                        Pickup Location
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Enter pickup location" 
                                          {...field}
                                          className="h-10"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="dropLocation"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-red-500" />
                                        Drop Location
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="Enter destination" 
                                          {...field}
                                          className="h-10"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            {/* Vehicle Selection */}
                            <div className="space-y-3">
                              <div className="border-b border-border pb-2">
                                <h3 className="text-lg font-semibold flex items-center">
                                  <Truck className="mr-2 h-5 w-5 text-accent" />
                                  Choose Your Ride
                                </h3>
                              </div>
                              <FormField
                                control={form.control}
                                name="vehicleType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-3 gap-4"
                                      >
                                        {vehicleOptions.map((option) => (
                                          <div key={option.value} className="flex items-center space-x-2">
                                            <RadioGroupItem 
                                              value={option.value} 
                                              id={option.value}
                                              className="peer sr-only"
                                            />
                                            <Label
                                              htmlFor={option.value}
                                              className="flex flex-col items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-all bg-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 w-full hover:shadow-md"
                                            >
                                              <option.icon className="h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary mb-2" />
                                              <span className="text-sm font-medium peer-data-[state=checked]:text-primary">
                                                {option.label}
                                              </span>
                                              <span className="text-xs text-muted-foreground font-semibold">{option.rate}</span>
                                            </Label>
                                          </div>
                                        ))}
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            {/* Booking Preferences */}
                            <div className="space-y-3">
                              <div className="border-b border-border pb-2">
                                <h3 className="text-lg font-semibold flex items-center">
                                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                                  Booking Preferences
                                </h3>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="dateTime"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Date & Time</FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="datetime-local" 
                                          {...field}
                                          className="h-10"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="paymentMethod"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Payment Method</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="h-10">
                                            <SelectValue placeholder="Select payment" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="cash">💵 Cash Payment</SelectItem>
                                          <SelectItem value="upi">📱 UPI Payment</SelectItem>
                                          <SelectItem value="card">💳 Card Payment</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>

                            {/* Fare Estimate */}
                            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-4 rounded-xl border border-primary/20">
                              <div className="text-center">
                                <h3 className="text-lg font-semibold text-foreground mb-2">Fare Estimate</h3>
                                <div className="text-2xl font-bold text-primary mb-2">
                                  ₹{estimatedFare}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Estimated for ~10 km journey
                                </p>
                              </div>
                            </div>

                            <Button
                              type="submit"
                              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 font-bold text-lg hover:from-primary/90 hover:to-secondary/90 transition-all shadow-lg rounded-xl"
                              disabled={createBookingMutation.isPending || isLoading}
                            >
                              {createBookingMutation.isPending || isLoading ? (
                                <div className="flex items-center justify-center">
                                  <motion.div
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  Booking your ride...
                                </div>
                              ) : (
                                <>
                                  <Check className="mr-2 h-6 w-6" />
                                  Book Now - ₹{estimatedFare}
                                </>
                              )}
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ride-confirmation"
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 shadow-xl border border-primary/20 h-full overflow-hidden">
                      <div className="h-full flex flex-col">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.3 }}
                          className="text-center mb-4 flex-shrink-0"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 via-primary/30 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Car className="w-8 h-8 text-primary" />
                          </div>
                          <h2 className="text-xl font-bold text-primary mb-1">
                            🎉 Your Ride is Coming!
                          </h2>
                        </motion.div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                          {bookingSuccess && driverData && (
                            <>
                              <div className="bg-background/50 p-3 rounded-lg border">
                                <h3 className="font-semibold mb-2 text-center text-sm">Booking Details</h3>
                                <div className="text-xs space-y-1">
                                  <div className="flex justify-between">
                                    <span>ID:</span>
                                    <span className="font-mono text-primary">#{bookingSuccess.id.slice(0, 6)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Fare:</span>
                                    <span className="text-primary font-semibold">₹{bookingSuccess.estimatedFare}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg border border-blue-200">
                                <h3 className="font-bold mb-2 text-center text-blue-800 text-sm">🚗 Your Driver</h3>
                                <div className="flex items-center space-x-3 mb-2">
                                  <img 
                                    src={driverData.driverImage} 
                                    alt={driverData.driverName}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm truncate">{driverData.driverName}</h4>
                                    <div className="flex items-center space-x-1">
                                      <span className="text-yellow-500 text-xs">⭐</span>
                                      <span className="text-xs">{driverData.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs">
                                  <div className="flex justify-between mb-1">
                                    <span>Vehicle:</span>
                                    <span className="font-mono bg-yellow-100 px-1 py-0.5 rounded">
                                      {driverData.vehicleNumber}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Contact:</span>
                                    <a href={`tel:${driverData.driverPhone}`} className="text-blue-600 font-semibold">
                                      {driverData.driverPhone}
                                    </a>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <div className="text-center">
                                  <h4 className="font-semibold text-amber-800 text-sm mb-1">🚗 Driver is on the way!</h4>
                                  <p className="text-xs text-amber-700">ETA: 5-10 minutes</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50 flex-shrink-0">
                          <Button
                            onClick={handleContinueBooking}
                            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 rounded-lg font-semibold text-sm"
                          >
                            <Car className="mr-1 h-3 w-3" />
                            Continue Booking
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Information Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <div className="text-center mb-4">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800">Safe & Trusted</h3>
              </div>
              <ul className="space-y-3 text-sm text-green-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Verified drivers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  GPS tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  24/7 support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Insurance covered
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center mb-4">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-800">Quick & Easy</h3>
              </div>
              <ul className="space-y-3 text-sm text-blue-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Instant booking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Real-time updates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Multiple payment options
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Transparent pricing
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <div className="text-center mb-4">
                <Heart className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-orange-800">Need Help?</h3>
              </div>
              <div className="space-y-3 text-sm text-orange-700">
                <div className="flex items-center justify-between">
                  <span>Call Support:</span>
                  <a href="tel:+911234567890" className="font-semibold text-orange-600 hover:underline">
                    +91 123 456 7890
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>WhatsApp:</span>
                  <a href="https://wa.me/911234567890" className="font-semibold text-orange-600 hover:underline">
                    Chat Now
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <div className="text-center mb-4">
                <span className="text-3xl mb-2 block">🎁</span>
                <h3 className="text-lg font-bold text-yellow-800">Special Offers</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-300">
                  <div className="font-semibold text-yellow-800">First Ride Free!</div>
                  <div className="text-yellow-700">Up to ₹100 off on your first booking</div>
                  <div className="text-xs text-yellow-600 mt-1">Code: WELCOME100</div>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg border border-orange-300">
                  <div className="font-semibold text-orange-800">Refer & Earn</div>
                  <div className="text-yellow-700">Get ₹50 for every friend you refer</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
