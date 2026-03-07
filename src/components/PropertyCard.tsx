import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
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
      className="group bg-white overflow-hidden shadow-card hover:shadow-gold-glow transition-all duration-500"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        border: '1px solid transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#CFA54A';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      <Link to={`/properties/${property.slug}`} className="block">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <motion.img
            src={property.heroImage}
            alt={property.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <Badge className="bg-gold text-primary-blue font-semibold">
                Featured
              </Badge>
            )}
            <Badge 
              className={`${
                property.availabilityStatus === 'available' 
                  ? 'bg-green-500' 
                  : property.availabilityStatus === 'limited'
                  ? 'bg-gold-light text-gold-dark'
                  : 'bg-muted-blue'
              } text-white`}
            >
              {property.availabilityStatus === 'available' ? 'Available' : 
               property.availabilityStatus === 'limited' ? 'Limited' : 'Waitlist'}
            </Badge>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <p className="text-white/80 text-sm">Starting from</p>
            <p className="text-white text-2xl font-bold font-display">
              {formatPrice(property.priceRange.min)}<span className="text-sm font-normal font-sans">/mo</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-display font-bold text-primary-blue group-hover:text-gold-dark transition-colors">
              {property.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 text-muted-blue text-sm mb-3">
            <MapPin className="w-4 h-4 text-gold" />
            {property.city}, {property.state}
          </div>

          <p className="text-muted-blue text-sm mb-4 line-clamp-2">
            {property.shortDescription}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-muted-blue mb-4">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-gold" />
              <span>{property.bedrooms} BR</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-gold" />
              <span>{property.bathrooms} BA</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4 text-gold" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mb-4">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span 
                key={amenity}
                className="px-2 py-1 bg-off-white text-muted-blue text-xs"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-off-white text-muted-blue text-xs">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link 
          to={`/properties/${property.slug}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-off-white hover:bg-gold text-primary-blue hover:text-primary-blue font-semibold transition-all duration-300 group/btn"
        >
          View Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
