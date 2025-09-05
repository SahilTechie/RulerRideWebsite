import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Car, Calendar, CreditCard, Check, CheckCircle, Shield, Clock, Heart, Bike, Zap } from "lucide-react";

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
      setBookingSuccess(booking);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed!",
        description: `Your booking ID is #${booking.id.slice(0, 8)}`,
      });
      
      // Hide success message after 8 seconds
      setTimeout(() => {
        setBookingSuccess(null);
        form.reset();
      }, 8000);
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Booking Form */}
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card p-8 shadow-xl border border-border">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Book Your Ride</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Shield className="mr-2 h-4 w-4 text-primary" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field} 
                                data-testid="input-customer-name"
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
                            <FormLabel className="flex items-center">
                              <Shield className="mr-2 h-4 w-4 text-primary" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your phone number" 
                                {...field}
                                data-testid="input-customer-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Locations */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="pickupLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-primary" />
                              Pickup Location
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter pickup location" 
                                {...field}
                                data-testid="input-pickup-location"
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
                              <MapPin className="mr-2 h-4 w-4 text-secondary" />
                              Drop Location
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter destination" 
                                {...field}
                                data-testid="input-drop-location"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Vehicle Type */}
                    <FormField
                      control={form.control}
                      name="vehicleType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="flex items-center">
                            <Car className="mr-2 h-4 w-4 text-accent" />
                            Vehicle Type
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-3 gap-4"
                              data-testid="radio-group-vehicle-type"
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
                                    className="flex flex-col items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-all bg-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 w-full"
                                    data-testid={`vehicle-option-${option.value}`}
                                  >
                                    <option.icon className="h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary mb-2" />
                                    <span className="text-sm font-medium peer-data-[state=checked]:text-primary">
                                      {option.label}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{option.rate}</span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date/Time & Payment */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="dateTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-primary" />
                              Date & Time
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="datetime-local" 
                                {...field}
                                data-testid="input-datetime"
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
                            <FormLabel className="flex items-center">
                              <CreditCard className="mr-2 h-4 w-4 text-secondary" />
                              Payment Method
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-payment-method">
                                  <SelectValue placeholder="Select payment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cash">Cash Payment</SelectItem>
                                <SelectItem value="upi">UPI Payment</SelectItem>
                                <SelectItem value="card">Card Payment</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Fare Estimate */}
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Estimated Fare:</span>
                        <span className="text-xl font-bold text-primary" data-testid="text-estimated-fare">
                          ₹{estimatedFare}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Final fare may vary based on actual distance and time
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground p-4 font-semibold text-lg hover:bg-primary/90 transform hover:scale-105 transition-all"
                      disabled={createBookingMutation.isPending}
                      data-testid="button-book-now"
                    >
                      {createBookingMutation.isPending ? (
                        "Booking..."
                      ) : (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          Book Now
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Success Message */}
                {bookingSuccess && (
                  <motion.div 
                    className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-testid="booking-success-message"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-primary h-6 w-6" />
                      <div>
                        <p className="font-semibold text-primary">Booking Confirmed!</p>
                        <p className="text-sm text-muted-foreground">
                          Your driver will contact you shortly. Booking ID: #{bookingSuccess.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Highlight */}
          <motion.div 
            className="scroll-reveal space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Happy rural family" 
              className="w-full h-48 object-cover rounded-2xl shadow-lg" 
            />
            
            <Card className="bg-card p-6 shadow-lg border border-border">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Why Choose RulerRide?</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="text-primary h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">100% Safe & Verified</h4>
                    <p className="text-muted-foreground text-sm">All drivers are background checked and vehicles are regularly inspected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Always On Time</h4>
                    <p className="text-muted-foreground text-sm">Real-time tracking and reliable pickup times</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="text-accent h-6 w-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Community First</h4>
                    <p className="text-muted-foreground text-sm">Supporting local drivers and connecting rural communities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
