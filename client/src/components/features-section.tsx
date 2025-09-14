import { motion } from "framer-motion";
import { Shield, Clock, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const whyChooseFeatures = [
  {
    icon: Shield,
    title: "100% Safe & Verified",
    description: "All drivers are background checked and vehicles are regularly inspected",
    color: "text-green-600",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "Real-time tracking and reliable pickup times",
    color: "text-orange-600",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "Supporting local drivers and connecting rural communities",
    color: "text-blue-600",
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
          <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose RulerRide?</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/img3.png" 
              alt="Happy rural family enjoying sunset together" 
              className="w-full h-80 object-cover rounded-2xl shadow-xl" 
            />
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="scroll-reveal"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card p-8 shadow-lg border border-border">
              <CardContent className="p-0 space-y-6">
                {whyChooseFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1`}>
                      <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" data-testid={`feature-title-${index}`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`feature-description-${index}`}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
