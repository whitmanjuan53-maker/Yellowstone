import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Bed, Bath } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

export function PropertySpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProperties.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentProperty = featuredProperties[currentIndex];

  if (!currentProperty) return null;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Executive Divider */}
        <div className="executive-divider mb-16">
          <div className="executive-divider-diamond" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs uppercase tracking-[0.3em] font-medium"
          >
            Featured Community
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-3"
          >
            Spotlight Property
          </motion.h2>
        </div>

        {/* Spotlight Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProperty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <motion.img
                  src={currentProperty.heroImage}
                  alt={currentProperty.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                />
                {/* Overlay Stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-blue/90 to-transparent p-6">
                  <div className="flex items-center gap-6 text-white">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-gold" />
                      <span className="text-sm">{currentProperty.bedrooms}+ Bed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="w-4 h-4 text-gold" />
                      <span className="text-sm">{currentProperty.bathrooms} Bath</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:pl-8">
                <div className="flex items-center gap-2 text-gold text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{currentProperty.city}, {currentProperty.state}</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mb-4">
                  {currentProperty.name}
                </h3>
                
                <p className="text-muted-blue leading-relaxed mb-6 max-w-md">
                  {currentProperty.description}
                </p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-3xl font-bold text-gold">
                    ${currentProperty.priceRange.min.toLocaleString()}
                  </span>
                  <span className="text-muted-blue text-sm">/month starting</span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to={`/properties/${currentProperty.slug}`}>
                    <Button className="btn-premium bg-gold text-primary-blue hover:bg-gold-dark font-semibold px-8 h-12 border-2 border-gold">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      variant="outline" 
                      className="h-12 px-8 border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-300"
                    >
                      Schedule Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Rotation Indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {featuredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 bg-gold' 
                    : 'w-2 bg-primary-blue/20 hover:bg-primary-blue/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
