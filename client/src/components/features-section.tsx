import { motion } from "framer-motion";
import { DollarSign, Armchair, Shield, Globe, UserCheck, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: DollarSign,
    title: "Affordable Pricing 💰",
    description: "Fair and transparent pricing with no hidden charges. Pay only what you see.",
    color: "bg-primary/10 group-hover:bg-primary/20 text-primary",
  },
  {
    icon: Armchair,
    title: "Comfortable Travel 🪑",
    description: "Clean, well-maintained vehicles with comfortable seating for a pleasant journey.",
    color: "bg-secondary/10 group-hover:bg-secondary/20 text-secondary",
  },
  {
    icon: Shield,
    title: "Safety First 🛡️",
    description: "GPS tracking, emergency support, and verified drivers for your peace of mind.",
    color: "bg-accent/10 group-hover:bg-accent/20 text-accent",
  },
  {
    icon: Globe,
    title: "Local Language Support 🌐",
    description: "Communicate in your preferred local language with drivers who understand your culture.",
    color: "bg-primary/10 group-hover:bg-primary/20 text-primary",
  },
  {
    icon: UserCheck,
    title: "Verified Drivers ✅",
    description: "All drivers undergo thorough background checks and regular training sessions.",
    color: "bg-secondary/10 group-hover:bg-secondary/20 text-secondary",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to help you with any queries or emergencies.",
    color: "bg-accent/10 group-hover:bg-accent/20 text-accent",
  },
];

export default function FeaturesSection() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="scroll-reveal text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for safe, comfortable, and affordable rural transportation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="scroll-reveal"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card p-8 shadow-lg border border-border text-center hover:shadow-xl transition-all group">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
