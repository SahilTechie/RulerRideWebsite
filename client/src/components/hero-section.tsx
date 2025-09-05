import { Car, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToBooking = () => {
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const vehicles = [
    { emoji: '🚗', top: '20%', size: '1.5rem', animation: 'slide-right', delay: 0 },
    { emoji: '🏍️', top: '40%', size: '1.2rem', animation: 'slide-left', delay: -4 },
    { emoji: '🛺', top: '60%', size: '1.3rem', animation: 'slide-right', delay: -6 },
    { emoji: '🚙', top: '80%', size: '1.4rem', animation: 'slide-left', delay: -2 },
  ];

  return (
    <section id="home" className="relative hero-bg min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            className={`moving-vehicle animate-${vehicle.animation}`}
            style={{
              top: vehicle.top,
              fontSize: vehicle.size,
              animationDelay: `${vehicle.delay}s`,
            }}
          >
            {vehicle.emoji}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Background landscape overlay */}
          <div className="mb-8 relative">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
              alt="Rural landscape with rolling hills" 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-20 -z-10" 
            />
          </div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary">Affordable.</span>{' '}
            <span className="text-secondary">Comfortable.</span>{' '}
            <span className="text-accent">Safe.</span>
            <br />
            <span className="text-foreground">Rides for Everyone.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Connecting rural communities with reliable, affordable transportation. Book your ride in seconds, travel with confidence.
          </motion.p>
          
          {/* Primary CTA */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              onClick={scrollToBooking}
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all shadow-lg"
              data-testid="button-book-ride-hero"
            >
              <Car className="mr-2 h-5 w-5" />
              Book a Ride Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              data-testid="button-how-it-works"
            >
              <Play className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="stat-riders">50K+</div>
                <div className="text-muted-foreground">Happy Riders</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2" data-testid="stat-drivers">1000+</div>
                <div className="text-muted-foreground">Verified Drivers</div>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border border-border hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2" data-testid="stat-villages">200+</div>
                <div className="text-muted-foreground">Villages Connected</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
