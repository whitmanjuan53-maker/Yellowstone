import { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Bed, Bath, Square, Check, Calendar, 
  Phone, X, Download, Home, Star, Clock, Navigation,
  FileText, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { properties } from '@/data/properties';
import { BookingWizard } from '@/components/BookingWizard';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';

// Gallery categories
const galleryCategories = {
  interiors: ['Interior Living Room', 'Modern Kitchen', 'Spacious Bedroom', 'Luxury Bathroom'],
  exteriors: ['Building Exterior', 'Main Entrance', 'Landscaped Grounds', 'Parking Area'],
  amenities: ['Fitness Center', 'Resort Pool', 'Resident Lounge', 'Rooftop Terrace'],
  lifestyle: ['Community Events', 'Resident Gathering', 'Outdoor Activities', 'Local Dining'],
};

// Amenity categories for accordion
const amenityCategories = [
  {
    title: 'Resort-Style Amenities',
    icon: Star,
    items: ['Infinity-edge swimming pool', 'Cabanas and sun deck', 'Outdoor fire pits', 'Grilling stations']
  },
  {
    title: 'Health & Wellness',
    icon: Clock,
    items: ['24-hour fitness center', 'Yoga and spin studio', 'Walking trails', 'Bike storage']
  },
  {
    title: 'Resident Services',
    icon: Home,
    items: ['24/7 concierge', 'Package acceptance', 'Dry cleaning service', 'Valet trash']
  },
  {
    title: 'Work & Leisure',
    icon: FileText,
    items: ['Co-working spaces', 'Business center', 'Resident lounge', 'Game room']
  }
];

// Neighborhood highlights
const neighborhoodHighlights = [
  'Walking distance to premier dining and shopping',
  'Minutes from major business districts',
  'Top-rated schools in the area',
  'Easy access to public transportation',
  'Nearby parks and recreation areas',
  'Vibrant nightlife and entertainment',
];

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<keyof typeof galleryCategories>('interiors');
  const [, setSelectedImageIndex] = useState(0);
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  
  const heroRef = useRef(null);
  useInView(heroRef, { margin: "-100px" });
  
  const property = properties.find(p => p.slug === slug);
  
  if (!property) {
    return (
      <div className="min-h-screen bg-off-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-primary-blue mb-4">Property Not Found</h1>
          <Link to="/properties">
            <Button className="bg-gold text-primary-blue hover:bg-gold-dark">Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalAvailable = property.floorPlans.reduce((sum, fp) => sum + fp.availability, 0);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section - Full image banner with dark gradient overlay */}
      <section ref={heroRef} className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <motion.img
          src={property.heroImage}
          alt={property.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        
        {/* Dark gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(43, 57, 95, 0.6) 0%, rgba(43, 57, 95, 0.3) 40%, rgba(43, 57, 95, 0.85) 100%)'
          }}
        />

        {/* Back Button */}
        <motion.div 
          className="absolute top-24 left-0 right-0 section-padding z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-white/80 hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Properties
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end section-padding pb-10 sm:pb-16">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {/* Property Name - Gold per spec */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gold mb-3 sm:mb-4">
                {property.name}
              </h1>
              
              <div className="flex items-center gap-2 text-white/80 mb-4 sm:mb-6">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
                <span className="text-sm sm:text-base lg:text-lg">{property.address}, {property.city}, {property.state} {property.zipCode}</span>
              </div>

              {/* Quick Stats Row - Gold Icons per spec */}
              <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-10">
                {[
                  { icon: Bed, value: `${property.bedrooms}+`, label: 'Bedrooms' },
                  { icon: Bath, value: `${property.bathrooms}+`, label: 'Bathrooms' },
                  { icon: Square, value: `${property.sqft}+`, label: 'Sq Ft' },
                  { icon: Check, value: formatPrice(property.priceRange.min), label: 'Starting Price' },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="flex items-center gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold shrink-0" />
                    <div>
                      <div className="text-white font-semibold text-base sm:text-lg">{stat.value}</div>
                      <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sticky Apply Now Button - Desktop */}
        <motion.div
          className="absolute top-24 right-8 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            onClick={() => setIsBookingOpen(true)}
            size="lg"
            className="bg-gold text-primary-blue hover:bg-gold-dark font-semibold px-8 h-14 shadow-gold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5 mr-2" />
            Apply Now
          </Button>
        </motion.div>
      </section>

      {/* Availability Urgency Banner */}
      {totalAvailable > 0 && totalAvailable <= 3 && (
        <motion.div 
          className="bg-gold-light py-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="section-padding">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-gold-dark">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Only {totalAvailable} Units Available</span>
              <span className="text-sm ml-2">— Apply today to secure your new home</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tabbed Content Section */}
      <section className="py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="floorplans" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="w-full justify-start bg-white border-b border-gray-200 rounded-none h-auto p-0 mb-6 lg:mb-8 flex-wrap overflow-x-auto">
              {[
                { value: 'floorplans', label: 'Floor Plans' },
                { value: 'gallery', label: 'Gallery' },
                { value: 'amenities', label: 'Amenities' },
                { value: 'neighborhood', label: 'Neighborhood' },
                { value: 'availability', label: 'Availability' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-primary-blue data-[state=active]:shadow-none px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-blue hover:text-primary-blue transition-colors whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Floor Plans Tab */}
            <TabsContent value="floorplans" className="mt-0">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">
                    Available Floor Plans
                  </h2>
                  <div className="space-y-6">
                    {property.floorPlans.map((floorPlan, index) => (
                      <motion.div
                        key={floorPlan.id}
                        className="bg-white border border-gray-200 overflow-hidden hover:shadow-card-hover transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="grid md:grid-cols-[200px_1fr_auto] gap-6">
                          {/* Floor Plan Image */}
                          <div className="h-48 md:h-full bg-gray-100 flex items-center justify-center">
                            <Home className="w-16 h-16 text-muted-blue/30" />
                          </div>
                          
                          {/* Floor Plan Details */}
                          <div className="p-6 md:pl-0">
                            <h3 className="text-xl font-display font-bold text-primary-blue mb-2">
                              {floorPlan.name}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-blue mb-4">
                              <span className="flex items-center gap-1">
                                <Bed className="w-4 h-4 text-gold" />
                                {floorPlan.bedrooms} BR
                              </span>
                              <span className="flex items-center gap-1">
                                <Bath className="w-4 h-4 text-gold" />
                                {floorPlan.bathrooms} BA
                              </span>
                              <span className="flex items-center gap-1">
                                <Square className="w-4 h-4 text-gold" />
                                {floorPlan.sqft} sqft
                              </span>
                            </div>
                            {/* Features */}
                            <div className="flex flex-wrap gap-2">
                              {floorPlan.features?.slice(0, 3).map((feature) => (
                                <span 
                                  key={feature}
                                  className="px-3 py-1 bg-off-white text-primary-blue text-xs rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Pricing & CTA */}
                          <div className="p-6 pt-0 md:pt-6 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
                            {/* Rent - Gold highlight per spec */}
                            <div className="text-2xl font-bold text-gold mb-1">
                              {formatPrice(floorPlan.price)}
                            </div>
                            <div className="text-sm text-muted-blue mb-1">per month</div>
                            
                            {/* Available date */}
                            <div className="flex items-center gap-1 text-sm text-green-600 mb-4">
                              <Calendar className="w-4 h-4" />
                              <span>Available Now</span>
                            </div>
                            
                            <Button 
                              onClick={() => setIsBookingOpen(true)}
                              className="w-full bg-gold text-primary-blue hover:bg-gold-dark font-semibold mb-2"
                            >
                              Apply
                            </Button>
                            <Button 
                              variant="outline"
                              className="w-full border-secondary-blue text-secondary-blue hover:bg-secondary-blue hover:text-white"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Brochure
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 p-6 sticky top-24">
                    <h3 className="font-display font-bold text-primary-blue mb-4">Need Help Deciding?</h3>
                    <p className="text-muted-blue text-sm mb-6">
                      Our leasing specialists can help you find the perfect floor plan 
                      for your lifestyle and budget.
                    </p>
                    <Button 
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-gold text-primary-blue hover:bg-gold-dark font-semibold mb-3"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Tour
                    </Button>
                    <a href="tel:+15551234567">
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-0">
              {/* Gallery Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(Object.keys(galleryCategories) as Array<keyof typeof galleryCategories>).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedGalleryCategory(category)}
                    className={`px-4 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                      selectedGalleryCategory === category
                        ? 'bg-gold text-primary-blue'
                        : 'bg-white text-muted-blue hover:bg-off-white border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Gallery Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryCategories[selectedGalleryCategory].map((imageLabel, index) => (
                  <motion.div
                    key={`${selectedGalleryCategory}-${index}`}
                    className="aspect-[4/3] bg-gray-200 relative overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setShowImageLightbox(true);
                    }}
                  >
                    <div className="absolute inset-0 bg-primary-blue/10 group-hover:bg-primary-blue/0 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="w-12 h-12 text-muted-blue/40" />
                    </div>
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-primary-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium">View</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white text-sm">{imageLabel}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Amenities Tab */}
            <TabsContent value="amenities" className="mt-0">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">
                    Property Amenities
                  </h2>
                  {/* Amenities Accordion - per spec */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {amenityCategories.map((category, index) => (
                      <AccordionItem 
                        key={category.title} 
                        value={`item-${index}`}
                        className="bg-white border border-gray-200 px-6 data-[state=open]:shadow-card-hover"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <category.icon className="w-5 h-5 text-gold" />
                            <span className="font-display font-semibold text-primary-blue">
                              {category.title}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <ul className="space-y-2 pl-8">
                            {category.items.map((item) => (
                              <li key={item} className="flex items-center gap-2 text-muted-blue">
                                <Check className="w-4 h-4 text-gold" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                
                <div>
                  <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">
                    Apartment Features
                  </h2>
                  <div className="bg-white border border-gray-200 p-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {property.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-gold flex-shrink-0" />
                          <span className="text-muted-blue">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Neighborhood Tab */}
            <TabsContent value="neighborhood" className="mt-0">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Map */}
                <div className="bg-gray-200 aspect-video lg:aspect-auto lg:h-full min-h-[400px] flex items-center justify-center relative overflow-hidden">
                  {/* Map placeholder - in production would be actual embedded map */}
                  <div className="absolute inset-0 bg-secondary-blue/10" />
                  <div className="text-center">
                    <Navigation className="w-16 h-16 text-muted-blue/40 mx-auto mb-4" />
                    <p className="text-muted-blue">Interactive Map</p>
                    <p className="text-sm text-muted-blue/60 mt-2">
                      {property.city}, {property.state}
                    </p>
                  </div>
                </div>
                
                {/* Right - Location Highlights */}
                <div className="bg-white border border-gray-200 p-8">
                  <h2 className="text-2xl font-display font-bold text-primary-blue mb-6">
                    Neighborhood Highlights
                  </h2>
                  <p className="text-muted-blue mb-6">
                    Located in the heart of {property.city}, this property offers 
                    unparalleled access to the best the city has to offer.
                  </p>
                  
                  <ul className="space-y-4">
                    {neighborhoodHighlights.map((highlight, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-blue">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-display font-semibold text-primary-blue mb-3">
                      Walk Score
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gold">92</span>
                      </div>
                      <div>
                        <p className="font-semibold text-primary-blue">Walker&apos;s Paradise</p>
                        <p className="text-sm text-muted-blue">Daily errands do not require a car</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Availability Tab */}
            <TabsContent value="availability" className="mt-0">
              <div className="bg-white border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-primary-blue mb-2">
                      Real-Time Availability
                    </h2>
                    <p className="text-muted-blue">
                      Updated daily. Units shown are available for immediate move-in or pre-leasing.
                    </p>
                  </div>
                  
                  {/* Availability Badge */}
                  <div className="mt-4 md:mt-0">
                    {totalAvailable > 0 ? (
                      <Badge className="bg-gold-light text-gold-dark px-4 py-2 text-sm font-semibold">
                        {totalAvailable} Units Available
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-200 text-gray-600 px-4 py-2 text-sm font-semibold">
                        Join Waitlist
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Availability Table */}
                <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                  <table className="w-full min-w-[600px] sm:min-w-0">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-display font-semibold text-primary-blue">Unit</th>
                        <th className="text-left py-4 px-4 font-display font-semibold text-primary-blue">Floor Plan</th>
                        <th className="text-left py-4 px-4 font-display font-semibold text-primary-blue">Sq Ft</th>
                        <th className="text-left py-4 px-4 font-display font-semibold text-primary-blue">Rent</th>
                        <th className="text-left py-4 px-4 font-display font-semibold text-primary-blue">Available</th>
                        <th className="text-right py-4 px-4 font-display font-semibold text-primary-blue">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {property.floorPlans.flatMap(fp => 
                        Array.from({ length: Math.min(fp.availability, 3) }, (_, i) => (
                          <tr key={`${fp.id}-${i}`} className="border-b border-gray-100 hover:bg-off-white transition-colors">
                            <td className="py-4 px-4 text-muted-blue">{fp.code}-{100 + i}</td>
                            <td className="py-4 px-4 text-primary-blue font-medium">{fp.name}</td>
                            <td className="py-4 px-4 text-muted-blue">{fp.sqft}</td>
                            <td className="py-4 px-4 text-gold font-semibold">{formatPrice(fp.price)}</td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                                <Clock className="w-4 h-4" />
                                Now
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <Button 
                                size="sm"
                                onClick={() => setIsBookingOpen(true)}
                                className="bg-gold text-primary-blue hover:bg-gold-dark"
                              >
                                Apply
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {totalAvailable === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-muted-blue/40 mx-auto mb-4" />
                    <h3 className="text-xl font-display font-bold text-primary-blue mb-2">
                      No Units Currently Available
                    </h3>
                    <p className="text-muted-blue mb-6">
                      Join our waitlist to be notified when units become available.
                    </p>
                    <Button 
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-gold text-primary-blue hover:bg-gold-dark"
                    >
                      Join Waitlist
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Booking Wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        propertyName={property.name}
      />

      {/* Image Lightbox */}
      <AnimatePresence>
        {showImageLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-blue/95 backdrop-blur-sm"
            onClick={() => setShowImageLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageLightbox(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <Home className="w-24 h-24 text-white/20" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
}
