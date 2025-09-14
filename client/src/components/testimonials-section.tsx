import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Kadampur Village",
    text: "RulerRide has been a game-changer for our village. Now I can easily visit the market and hospital without waiting for hours.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0c56d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    name: "Rajesh Patel",
    location: "Bhiwani District",
    text: "The drivers are so friendly and know all the local routes. It's like having a neighbor give you a ride!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    name: "Sunita Devi",
    location: "Mandawa Village",
    text: "Safe, reliable, and affordable. My daughter can now go to college in the city without any worries.",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    name: "Amit Kumar",
    location: "Dehradun Hills",
    text: "The best part is the affordability. I can now travel to the city for work without spending my entire salary on transport.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    name: "Meera Singh",
    location: "Rajgarh Village",
    text: "Quick, efficient, and the drivers are always punctual. It's made my daily commute so much easier.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    name: "Vikram Rao",
    location: "Khandwa District",
    text: "RulerRide has connected our remote village to the main city. Now medical emergencies are no longer a nightmare.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <Card className="bg-card p-8 shadow-lg border border-border hover:shadow-xl transition-shadow min-w-[350px] mx-4">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, starIndex) => (
              <Star key={starIndex} className="h-5 w-5 fill-current" />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground mb-6 italic" data-testid={`testimonial-text-${index}`}>
          "{testimonial.text}"
        </p>
        <div className="flex items-center">
          <img 
            src={testimonial.avatar} 
            alt={`${testimonial.name} avatar`} 
            className="w-12 h-12 rounded-full mr-4" 
          />
          <div>
            <div className="font-semibold" data-testid={`testimonial-name-${index}`}>
              {testimonial.name}
            </div>
            <div className="text-muted-foreground text-sm" data-testid={`testimonial-location-${index}`}>
              {testimonial.location}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="scroll-reveal text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Riders Say</h2>
          <p className="text-xl text-muted-foreground">Real stories from real people in rural communities</p>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: [0, -1950] // Adjust this value based on card width (350px + margin) * number of original testimonials
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, // Adjust speed here
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.name}-${index}`} 
                testimonial={testimonial} 
                index={index} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
