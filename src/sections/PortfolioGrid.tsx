import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

export function PortfolioGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Take first 6 properties for the grid
  const featuredProperties = properties.slice(0, 6);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-off-white" ref={ref}>
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Gold divider above headline */}
            <div className="gold-divider mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-blue mb-4">
              Our Portfolio
            </h2>
            <p className="text-muted-blue text-lg max-w-2xl mx-auto">
              Discover professionally managed luxury multifamily communities 
              across premier markets nationwide.
            </p>
          </motion.div>

          {/* Property Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link to={`/properties/${property.slug}`}>
                  <div 
                    className={`
                      group bg-white overflow-hidden transition-all duration-500
                      ${hoveredIndex === index ? 'shadow-gold-glow -translate-y-2' : 'shadow-card'}
                    `}
                    style={{
                      border: hoveredIndex === index ? '1px solid #CFA54A' : '1px solid transparent'
                    }}
                  >
                    {/* Property Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={property.heroImage}
                        alt={property.name}
                        className="w-full h-full object-cover"
                        animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Dark overlay on hover */}
                      <div 
                        className={`
                          absolute inset-0 bg-primary-blue/20 transition-opacity duration-300
                          ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}
                        `}
                      />
                      {/* Starting Price Badge */}
                      <div className="absolute top-4 right-4 bg-gold text-primary-blue px-4 py-2 font-semibold text-sm">
                        From ${property.priceRange.min.toLocaleString()}/mo
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-primary-blue mb-2 group-hover:text-gold-dark transition-colors">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-blue mb-4">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="text-sm">{property.city}, {property.state}</span>
                      </div>

                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 mb-6 text-sm text-muted-blue">
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4 text-gold" />
                          <span>Up to {property.bedrooms} BR</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4 text-gold" />
                          <span>Up to {property.bathrooms} BA</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4 text-gold" />
                          <span>{property.sqft.toLocaleString()}+ sqft</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className="w-full bg-gold text-primary-blue hover:bg-gold-dark font-semibold transition-all duration-300 group/btn"
                      >
                        View Property
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/properties">
              <Button 
                size="lg"
                className="bg-primary-blue text-white hover:bg-secondary-blue px-8 h-14 font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              >
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
