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
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} className="section-padding section-breathe bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6 flex items-center justify-center gap-4 w-full max-w-xs">
            <div className="h-px bg-gold/30 flex-1"></div>
            <span>Property Features</span>
            <div className="h-px bg-gold/30 flex-1"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-blue mb-6 tracking-tighter leading-tight">
            World-Class Amenities
          </h2>
          <p className="text-muted-blue text-lg max-w-2xl mx-auto leading-relaxed">
            Experience luxury living with our comprehensive suite of amenities designed 
            for your comfort, convenience, and lifestyle.
          </p>
        </motion.div>

        {/* Amenities Grid - Bento Style */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {amenities.map((amenity) => (
            <motion.div
              key={amenity.title}
              variants={itemVariants}
              className="group p-8 rounded-sm bg-white border border-black/5 shadow-card hover:shadow-card-hover ring-1 ring-inset ring-black/5 transition-all duration-500 ease-out flex flex-col items-start cursor-pointer hover:-translate-y-1"
            >
              <div className="w-12 h-12 mb-6 rounded-sm bg-slate-50 group-hover:bg-primary-blue transition-colors duration-500 ease-out flex items-center justify-center border border-black/5">
                <amenity.icon className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-500 ease-out" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-primary-blue text-sm mb-2 tracking-tight group-hover:text-gold transition-colors duration-500 ease-out">
                {amenity.title}
              </h3>
              <p className="text-sm text-muted-blue leading-relaxed">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
