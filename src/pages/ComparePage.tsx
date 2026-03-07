import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Check, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

export function ComparePage() {
  // For demo, compare first 3 featured properties
  const compareProperties = properties.filter(p => p.featured).slice(0, 3);

  const allAmenities = Array.from(
    new Set(compareProperties.flatMap(p => p.amenities))
  ).slice(0, 10);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#0a1628] pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/properties"
              className="flex items-center gap-2 text-slate/70 dark:text-white/60 hover:text-primary dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-display font-bold text-primary dark:text-white">
                Compare Properties
              </h1>
              <p className="text-slate/60 dark:text-white/60">
                Side-by-side comparison of your selected properties
              </p>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <th className="p-4 text-left text-sm font-semibold text-slate/60 dark:text-white/60 sticky left-0 bg-white dark:bg-slate-800 z-10">
                      Feature
                    </th>
                    {compareProperties.map(property => (
                      <th key={property.id} className="p-4 min-w-[250px]">
                        <div className="text-left">
                          <img 
                            src={property.heroImage} 
                            alt={property.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold text-primary dark:text-white">{property.name}</h3>
                          <p className="text-sm text-slate/60 dark:text-white/60">{property.city}, {property.state}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="p-4 text-sm font-medium text-slate/70 dark:text-white/70 sticky left-0 bg-white dark:bg-slate-800">Monthly Rent</td>
                    {compareProperties.map(property => (
                      <td key={property.id} className="p-4">
                        <span className="text-2xl font-bold text-[#E1B84A]">
                          ${property.priceRange.min.toLocaleString()}
                        </span>
                        <span className="text-slate/60 dark:text-white/60"> - ${property.priceRange.max.toLocaleString()}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="p-4 text-sm font-medium text-slate/70 dark:text-white/70 sticky left-0 bg-white dark:bg-slate-800">Bedrooms</td>
                    {compareProperties.map(property => (
                      <td key={property.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-slate/60" />
                          <span className="text-primary dark:text-white">{property.bedrooms}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="p-4 text-sm font-medium text-slate/70 dark:text-white/70 sticky left-0 bg-white dark:bg-slate-800">Bathrooms</td>
                    {compareProperties.map(property => (
                      <td key={property.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Bath className="w-4 h-4 text-slate/60" />
                          <span className="text-primary dark:text-white">{property.bathrooms}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="p-4 text-sm font-medium text-slate/70 dark:text-white/70 sticky left-0 bg-white dark:bg-slate-800">Square Feet</td>
                    {compareProperties.map(property => (
                      <td key={property.id} className="p-4">
                        <div className="flex items-center gap-2">
                          <Square className="w-4 h-4 text-slate/60" />
                          <span className="text-primary dark:text-white">{property.sqft}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-white/10">
                    <td className="p-4 text-sm font-medium text-slate/70 dark:text-white/70 sticky left-0 bg-white dark:bg-slate-800">Availability</td>
                    {compareProperties.map(property => (
                      <td key={property.id} className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          property.availabilityStatus === 'available' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : property.availabilityStatus === 'limited'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
                        }`}>
                          {property.availabilityStatus.charAt(0).toUpperCase() + property.availabilityStatus.slice(1)}
                        </span>
                      </td>
                    ))}
                  </tr>
                  {allAmenities.map(amenity => (
                    <tr key={amenity} className="border-b border-neutral-200 dark:border-white/10">
                      <td className="p-4 text-sm font-medium text-slate/70 dark:text-white/70 sticky left-0 bg-white dark:bg-slate-800">{amenity}</td>
                      {compareProperties.map(property => (
                        <td key={property.id} className="p-4">
                          {property.amenities.includes(amenity) ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-slate/30" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 sticky left-0 bg-white dark:bg-slate-800"></td>
                    {compareProperties.map(property => (
                      <td key={property.id} className="p-4">
                        <Link to={`/properties/${property.slug}`}>
                          <Button className="w-full bg-[#E1B84A] text-[#0B2F5B] hover:bg-[#F0C85A]">
                            View Details
                          </Button>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
