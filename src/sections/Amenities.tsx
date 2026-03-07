import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Dumbbell, 
  Car, 
  PawPrint, 
  Building,
  Users,
  Sparkles,
  Wine
} from 'lucide-react';

const amenities = [
  { icon: Waves, title: 'Swimming Pool', description: 'Resort-style pools with sun decks' },
  { icon: Dumbbell, title: 'Fitness Center', description: 'State-of-the-art equipment & classes' },
  { icon: Car, title: 'Parking', description: 'Secure covered parking available' },
  { icon: PawPrint, title: 'Pet Friendly', description: 'Welcoming your furry friends' },
  { icon: Building, title: 'Rooftop Terrace', description: 'Stunning views & entertainment spaces' },
  { icon: Users, title: 'Co-working Space', description: 'Productive workspaces & WiFi' },
  { icon: Sparkles, title: 'Spa & Wellness', description: 'Relaxation & rejuvenation areas' },
  { icon: Wine, title: 'Lounge Areas', description: 'Social spaces for residents' },
];

export function Amenities() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <section ref={sectionRef} className="section-padding py-20 bg-white dark:bg-[#0d1d30]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white mb-4">
            World-Class Amenities
          </h2>
          <p className="text-slate/70 dark:text-white/60 max-w-2xl mx-auto">
            Experience luxury living with our comprehensive suite of amenities designed 
            for your comfort, convenience, and lifestyle.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {amenities.map((amenity) => (
            <motion.div
              key={amenity.title}
              variants={itemVariants}
              className="group p-6 rounded-2xl bg-neutral-50 dark:bg-white/5 hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary transition-all duration-300 text-center cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#E1B84A]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <amenity.icon className="w-7 h-7 text-[#E1B84A] group-hover:text-white dark:group-hover:text-primary" />
              </div>
              <h3 className="font-semibold text-primary dark:text-white group-hover:text-white dark:group-hover:text-primary mb-2 transition-colors">
                {amenity.title}
              </h3>
              <p className="text-sm text-slate/60 dark:text-white/60 group-hover:text-white/80 dark:group-hover:text-primary/80 transition-colors">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
