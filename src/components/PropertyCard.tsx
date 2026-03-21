import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export function PropertyCard({ property, featured }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div 
      className="group bg-white overflow-hidden border border-black/5 shadow-card hover:shadow-card-hover ring-1 ring-inset ring-black/5 transition-all duration-500 ease-out flex flex-col"
      whileHover={{ y: -4 }}
    >
      <Link to={`/properties/${property.slug}`} className="block flex-1 flex flex-col">
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <motion.img
            src={property.heroImage}
            alt={property.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 ease-out" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <Badge className="bg-gold text-primary-blue font-semibold uppercase tracking-widest text-xs px-3 py-1">
                Featured
              </Badge>
            )}
            <Badge 
              className={`${
                property.availabilityStatus === 'available' 
                  ? 'bg-green-500' 
                  : property.availabilityStatus === 'limited'
                  ? 'bg-gold-light text-primary-blue'
                  : 'bg-muted-blue'
              } text-white uppercase tracking-widest text-xs px-3 py-1`}
            >
              {property.availabilityStatus === 'available' ? 'Available' : 
               property.availabilityStatus === 'limited' ? 'Limited' : 'Waitlist'}
            </Badge>
          </div>

          {/* Price */}
          <div className="absolute bottom-6 left-6">
            <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Starting from</p>
            <p className="text-white text-3xl font-bold font-display tracking-tight">
              {formatPrice(property.priceRange.min)}<span className="text-sm font-normal font-sans text-white/80/mo">/mo</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-2xl font-display font-bold text-primary-blue group-hover:text-gold-dark transition-colors duration-500 tracking-tighter mb-2">
              {property.name}
            </h3>
            <div className="flex items-center gap-2 text-muted-blue text-sm uppercase tracking-widest">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              {property.city}, {property.state}
            </div>
          </div>

          <p className="text-muted-blue text-sm mb-8 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>

          <div className="mb-auto" />

          {/* Quick Stats - Bento Box Layering */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            <div className="border border-black/5 rounded-sm p-4 bg-off-white/30 text-center flex flex-col justify-center transition-colors duration-500 group-hover:bg-off-white/80">
              <span className="block text-xs uppercase tracking-widest text-muted-blue mb-1">Bed</span>
              <span className="block text-xl font-semibold text-primary-blue">{property.bedrooms}</span>
            </div>
            <div className="border border-black/5 rounded-sm p-4 bg-off-white/30 text-center flex flex-col justify-center transition-colors duration-500 group-hover:bg-off-white/80">
              <span className="block text-xs uppercase tracking-widest text-muted-blue mb-1">Bath</span>
              <span className="block text-xl font-semibold text-primary-blue">{property.bathrooms}</span>
            </div>
            <div className="border border-black/5 rounded-sm p-4 bg-off-white/30 text-center flex flex-col justify-center transition-colors duration-500 group-hover:bg-off-white/80">
              <span className="block text-xs uppercase tracking-widest text-muted-blue mb-1">SqFt</span>
              <span className="block text-lg font-semibold text-primary-blue">{property.sqft}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-8 pb-8">
        <Link 
          to={`/properties/${property.slug}`}
          className="w-full flex items-center justify-center gap-3 py-4 bg-off-white hover:bg-gold text-primary-blue font-bold tracking-widest uppercase text-xs transition-colors duration-500 ease-out group/btn border border-black/5"
        >
          View Details
          <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover/btn:translate-x-2" />
        </Link>
      </div>
    </motion.div>
  );
}
