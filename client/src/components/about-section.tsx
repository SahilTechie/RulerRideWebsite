import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const achievements = [
  "Serving 200+ villages and growing",
  "Supporting local driver partners", 
  "Building stronger rural communities"
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Rural village community" 
              className="w-full h-96 object-cover rounded-2xl shadow-xl" 
            />
          </motion.div>
          
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Connecting Rural Communities</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              RulerRide was born from a simple belief: everyone deserves access to safe, affordable, and reliable transportation, regardless of where they live.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We specialize in serving rural and semi-urban areas where traditional ride-sharing services often don't reach. Our platform connects local drivers with community members, creating economic opportunities while solving transportation challenges.
            </p>
            
            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="text-primary h-6 w-6 flex-shrink-0" />
                  <span className="text-foreground font-medium" data-testid={`achievement-${index}`}>
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-4 font-semibold hover:bg-primary/90 transition-all"
              data-testid="button-learn-more"
            >
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
