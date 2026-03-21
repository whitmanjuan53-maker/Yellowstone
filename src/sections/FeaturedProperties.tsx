import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { properties } from '@/data/properties';

export function FeaturedProperties() {
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

  const featuredProperties = properties.filter((p) => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="section-padding section-breathe bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex-1">
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-4">
              <Sparkles className="w-4 h-4" />
              <span>Featured Properties</span>
              <div className="h-px bg-gold/30 flex-1 max-w-xs"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-blue mb-4 tracking-tighter leading-tight">
              Handpicked for You
            </h2>
            <p className="text-muted-blue text-lg leading-relaxed max-w-xl">
              Discover our most exclusive properties, carefully selected for their 
              exceptional locations, amenities, and living experiences.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Link to="/properties">
              <Button
                variant="outline"
                className="bg-transparent border border-black/10 text-primary-blue hover:bg-primary-blue hover:text-white px-8 h-12 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-1 group"
              >
                View All Properties
                <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-500 ease-out group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
            >
              <PropertyCard property={property} featured />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-muted-blue mb-6">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link to="/map">
            <Button
              size="lg"
              className="bg-primary-blue text-white hover:bg-secondary-blue px-8 h-14 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-1 shadow-card group"
            >
              Explore on Map
              <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-500 ease-out group-hover:translate-x-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
