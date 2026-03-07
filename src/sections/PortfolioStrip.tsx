import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { properties } from '@/data/properties';

const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

export function PortfolioStrip() {
  return (
    <section className="py-12 sm:py-16 lg:py-28" style={{ background: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6 mb-10 lg:mb-14">
            <div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
                Featured Communities
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-primary-blue mt-3">
                Explore Our Communities
              </h2>
            </div>
            <Link to="/properties" className="hidden lg:block">
              <Button
                variant="outline"
                className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-semibold px-6 h-12 transition-all duration-300"
              >
                View All Communities
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {featuredProperties.map((property, index) => (
            <ScrollReveal key={property.id} delay={index * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="group bg-white overflow-hidden card-premium flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={property.heroImage}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                    style={{ transition: 'transform 0.7s ease' }}
                  />
                  <div className="absolute inset-0 bg-primary-blue/0 group-hover:bg-primary-blue/15 transition-colors duration-300" />

                  {/* Starting price badge */}
                  <div className="absolute bottom-0 left-0 bg-primary-blue px-4 py-2">
                    <span className="text-white font-bold text-sm">
                      From ${property.priceRange.min.toLocaleString()}
                    </span>
                    <span className="text-gold/80 text-xs">/mo</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Name */}
                  <h3 className="text-xl font-display font-bold text-primary-blue mb-1.5 group-hover:text-gold transition-colors duration-300">
                    {property.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-muted-blue mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                    <span className="text-sm">
                      {property.city}, {property.state}
                    </span>
                  </div>

                  {/* Beds indicator */}
                  <div className="flex items-center gap-1.5 text-muted-blue/80 mb-4">
                    <Bed className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                    <span className="text-sm">
                      {property.floorPlans && property.floorPlans.length > 0
                        ? `${Math.min(...property.floorPlans.map((f) => f.bedrooms))}–${Math.max(...property.floorPlans.map((f) => f.bedrooms))} Beds`
                        : `${property.bedrooms} Bed`}
                    </span>
                  </div>

                  {/* Gold underline animation on hover */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link to={`/properties/${property.slug}`}>
                      <Button
                        size="sm"
                        className="bg-gold text-primary-blue hover:bg-gold-light font-semibold px-5 h-9 text-sm transition-all duration-300"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                    <span
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{
                        color:
                          property.availabilityStatus === 'available'
                            ? 'var(--gold)'
                            : 'var(--muted-blue)',
                      }}
                    >
                      {property.availabilityStatus === 'available'
                        ? 'Available Now'
                        : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center lg:hidden">
          <Link to="/properties">
            <Button
              variant="outline"
              className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-semibold px-8 h-12"
            >
              View All Communities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
