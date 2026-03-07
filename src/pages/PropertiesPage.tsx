import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Grid3X3, List, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PropertyCard } from '@/components/PropertyCard';
import { properties, cities, amenities as allAmenities } from '@/data/properties';
import { BookingWizard } from '@/components/BookingWizard';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';

export function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || property.city === selectedCity;
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => property.amenities.includes(amenity));
    return matchesSearch && matchesCity && matchesAmenities;
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-off-white pt-20 sm:pt-24 pb-20 sm:pb-16">
      <div className="px-4 sm:px-6 lg:px-8 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                {/* Gold divider */}
                <div className="gold-divider mb-4" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary-blue mb-2">
                  Our Properties
                </h1>
                <p className="text-muted-blue text-sm sm:text-base">
                  Discover {properties.length} premium properties across {cities.length} cities
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full sm:w-auto bg-gold text-primary-blue hover:bg-gold-dark font-semibold h-12 px-6 shadow-gold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Tour
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="bg-white border border-gray-200 p-4 mb-8 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-blue/40" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-gray-200 focus:border-gold focus:ring-gold"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 h-12 border border-gray-200 bg-white text-sm text-primary-blue focus:border-gold focus:outline-none"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-12 px-4 border-gray-200 ${showFilters ? 'bg-primary-blue text-white border-primary-blue' : 'text-primary-blue'}`}
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </Button>
                <div className="flex border border-gray-200 overflow-hidden shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary-blue text-white' : 'bg-white text-primary-blue hover:bg-off-white'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary-blue text-white' : 'bg-white text-primary-blue hover:bg-off-white'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-primary-blue">Amenities</p>
                    {(selectedAmenities.length > 0 || selectedCity || searchQuery) && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-gold hover:text-gold-dark font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allAmenities.slice(0, 12).map((amenity, index) => (
                      <motion.button
                        key={amenity}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-1.5 text-sm transition-all duration-300 ${
                          selectedAmenities.includes(amenity)
                            ? 'bg-gold text-primary-blue font-medium'
                            : 'bg-off-white text-muted-blue hover:bg-gold/20'
                        }`}
                      >
                        {amenity}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Count */}
          <motion.div 
            className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-muted-blue text-sm sm:text-base">
              Showing <span className="font-semibold text-primary-blue">{filteredProperties.length}</span> properties
            </p>
            <Link 
              to="/map"
              className="flex items-center gap-2 text-secondary-blue hover:text-gold transition-colors font-medium"
            >
              <MapPin className="w-4 h-4" />
              View on Map
            </Link>
          </motion.div>

          {/* Properties Grid */}
          <motion.div 
            className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4 sm:gap-6`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProperties.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-16 h-16 text-muted-blue/30 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-primary-blue mb-2">
                No properties found
              </h3>
              <p className="text-muted-blue mb-4">
                Try adjusting your search or filters
              </p>
              <Button 
                onClick={clearFilters} 
                variant="outline"
                className="border-secondary-blue text-secondary-blue hover:bg-secondary-blue hover:text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Booking Wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
}
