import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { properties } from '@/data/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function PortfolioGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            {featuredProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={itemVariants}
                className="h-full"
              >
                <PropertyCard property={property} featured={true} />
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
                className="bg-primary-blue text-white hover:bg-secondary-blue px-8 h-14 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-0.5 group"
              >
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-500 ease-out group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
