import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Square, DollarSign, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { properties } from '@/data/properties';

export function FloorPlansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);

  // Get all floor plans from all properties
  const allFloorPlans = properties.flatMap(property => 
    property.floorPlans.map(fp => ({
      ...fp,
      propertyName: property.name,
      propertySlug: property.slug,
      propertyCity: property.city,
    }))
  );

  const filteredFloorPlans = allFloorPlans.filter(fp => {
    const matchesSearch = fp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fp.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBedrooms = selectedBedrooms === null || fp.bedrooms === selectedBedrooms;
    return matchesSearch && matchesBedrooms;
  });

  const bedroomOptions = [0, 1, 2, 3];

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
                Floor Plans
              </h1>
              <p className="text-slate/60 dark:text-white/60">
                Browse all available floor plans across our properties
              </p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-8 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40" />
                <Input
                  placeholder="Search floor plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 dark:bg-white/10 dark:border-white/20"
                />
              </div>
              <div className="flex gap-2">
                <span className="text-sm text-slate/60 dark:text-white/60 self-center mr-2">Bedrooms:</span>
                {bedroomOptions.map(num => (
                  <button
                    key={num}
                    onClick={() => setSelectedBedrooms(selectedBedrooms === num ? null : num)}
                    className={`px-4 h-12 rounded-lg font-medium transition-colors ${
                      selectedBedrooms === num
                        ? 'bg-[#E1B84A] text-[#0B2F5B]'
                        : 'bg-neutral-100 dark:bg-white/10 text-slate dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20'
                    }`}
                  >
                    {num === 0 ? 'Studio' : `${num} BR`}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate/70 dark:text-white/60">
              Showing <span className="font-semibold text-primary dark:text-white">{filteredFloorPlans.length}</span> floor plans
            </p>
          </div>

          {/* Floor Plans Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredFloorPlans.map((floorPlan, index) => (
              <motion.div 
                key={floorPlan.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Floor Plan Image */}
                <div className="relative h-48 bg-neutral-100 dark:bg-white/5 flex items-center justify-center">
                  <img
                    src={floorPlan.image}
                    alt={floorPlan.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      floorPlan.availability > 0
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400'
                    }`}>
                      {floorPlan.availability > 0 ? `${floorPlan.availability} Available` : 'Waitlist'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-primary dark:text-white">{floorPlan.name}</h3>
                      <p className="text-sm text-slate/60 dark:text-white/60">{floorPlan.propertyName}</p>
                    </div>
                    <span className="text-lg font-bold text-[#E1B84A]">
                      ${floorPlan.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-sm text-slate/70 dark:text-white/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{floorPlan.bedrooms === 0 ? 'Studio' : `${floorPlan.bedrooms} BR`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{floorPlan.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{floorPlan.sqft} sqft</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {floorPlan.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate/60 dark:text-white/60">
                        <Check className="w-4 h-4 text-[#E1B84A]" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/properties/${floorPlan.propertySlug}`} className="flex-1">
                      <Button className="w-full bg-[#E1B84A] text-[#0B2F5B] hover:bg-[#F0C85A]">
                        View Property
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredFloorPlans.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <DollarSign className="w-16 h-16 text-slate/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                No floor plans found
              </h3>
              <p className="text-slate/60 dark:text-white/60">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
