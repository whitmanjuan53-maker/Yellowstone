import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin,
  ArrowRight,
  Percent,
  Clock,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Promotion {
  id: string;
  propertyId: string;
  propertyName: string;
  propertySlug: string;
  propertyImage: string;
  propertyCity: string;
  propertyState: string;
  title: string;
  subtitle: string;
  discount: string;
  validUntil: string;
  code?: string;
  color: string;
}

// All promotions flattened with property info
const allPromotions: Promotion[] = [
  {
    id: 'promo-1',
    propertyId: '1',
    propertyName: 'The Grand Residences',
    propertySlug: 'the-grand-residences',
    propertyImage: '/property-1.jpg',
    propertyCity: 'Denver',
    propertyState: 'CO',
    title: 'Move-In Special',
    subtitle: 'First Month Free',
    discount: '$2,800 OFF',
    validUntil: '2025-03-31',
    code: 'MOVEIN24',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'promo-2',
    propertyId: '2',
    propertyName: 'Urban Loft District',
    propertySlug: 'urban-loft-district',
    propertyImage: '/property-2.jpg',
    propertyCity: 'Austin',
    propertyState: 'TX',
    title: 'Spring Savings',
    subtitle: '$1,000 Off First Month',
    discount: '$1,000 OFF',
    validUntil: '2025-04-30',
    code: 'SPRING1K',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'promo-3',
    propertyId: '3',
    propertyName: 'Skyline Tower',
    propertySlug: 'skyline-tower',
    propertyImage: '/property-3.jpg',
    propertyCity: 'Seattle',
    propertyState: 'WA',
    title: 'Luxury Living Special',
    subtitle: '2 Months Free',
    discount: '$15,000 OFF',
    validUntil: '2025-04-15',
    color: 'from-amber-400 to-yellow-500'
  },
  {
    id: 'promo-4',
    propertyId: '4',
    propertyName: 'Parkside Townhomes',
    propertySlug: 'parkside-townhomes',
    propertyImage: '/property-4.jpg',
    propertyCity: 'Portland',
    propertyState: 'OR',
    title: 'Family Friendly',
    subtitle: 'Kids Play Free',
    discount: '$350 WAIVED',
    validUntil: 'Ongoing',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'promo-5',
    propertyId: '5',
    propertyName: 'Vista Heights',
    propertySlug: 'vista-heights',
    propertyImage: '/property-5.jpg',
    propertyCity: 'Phoenix',
    propertyState: 'AZ',
    title: 'Desert Heat Special',
    subtitle: 'Summer Move-In Bonus',
    discount: '$600 VALUE',
    validUntil: '2025-08-31',
    code: 'SUMMER',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'promo-6',
    propertyId: '6',
    propertyName: 'Azure Midtown',
    propertySlug: 'azure-midtown',
    propertyImage: '/property-6.jpg',
    propertyCity: 'Nashville',
    propertyState: 'TN',
    title: 'Music City Welcome',
    subtitle: 'Free Parking 6 Months',
    discount: '$900 VALUE',
    validUntil: '2025-05-31',
    code: 'PARKFREE',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'promo-7',
    propertyId: '7',
    propertyName: 'Willow Creek Estates',
    propertySlug: 'willow-creek-estates',
    propertyImage: '/property-7.jpg',
    propertyCity: 'Denver',
    propertyState: 'CO',
    title: 'Pet Paradise',
    subtitle: 'No Pet Deposit',
    discount: '$300 WAIVED',
    validUntil: 'Ongoing',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: 'promo-8',
    propertyId: '8',
    propertyName: 'The Foundry Lofts',
    propertySlug: 'the-foundry-lofts',
    propertyImage: '/property-8.jpg',
    propertyCity: 'Chicago',
    propertyState: 'IL',
    title: 'Historic Charm',
    subtitle: 'Loft Living Special',
    discount: '$2,800 OFF',
    validUntil: '2025-03-31',
    code: 'LOFTLIFE',
    color: 'from-amber-600 to-orange-600'
  }
];

export function PromotionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allPromotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + allPromotions.length) % allPromotions.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % allPromotions.length);
  };

  const currentPromo = allPromotions[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="pt-4 pb-6 sm:pt-6 sm:pb-8 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Limited Time Offers
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-blue mb-2">
            Now Leasing Specials
          </h2>
          <p className="text-muted-blue text-sm max-w-md mx-auto">
            Exclusive deals on our premium properties. Don&apos;t miss out!
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Card */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromo.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="grid md:grid-cols-2"
              >
                {/* Image Side */}
                <div className="relative h-56 md:h-auto min-h-[280px]">
                  <img 
                    src={currentPromo.propertyImage} 
                    alt={currentPromo.propertyName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Property Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-display font-bold text-xl mb-1">
                      {currentPromo.propertyName}
                    </h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {currentPromo.propertyCity}, {currentPromo.propertyState}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${currentPromo.color} text-white shadow-lg`}>
                      <Sparkles className="w-3 h-3" />
                      Special Offer
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  {/* Discount Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-lg font-bold bg-gradient-to-r ${currentPromo.color} text-white`}>
                      <Percent className="w-4 h-4" />
                      {currentPromo.discount}
                    </span>
                  </div>

                  {/* Promotion Title */}
                  <h4 className="text-xl font-display font-bold text-primary-blue mb-1">
                    {currentPromo.title}
                  </h4>
                  <p className="text-gold font-semibold mb-3">
                    {currentPromo.subtitle}
                  </p>

                  {/* Valid Until */}
                  <div className="flex items-center gap-2 text-sm text-muted-blue mb-4">
                    <Clock className="w-4 h-4" />
                    <span>
                      Valid until: {currentPromo.validUntil === 'Ongoing' ? 'Ongoing' : new Date(currentPromo.validUntil).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Promo Code */}
                  {currentPromo.code && (
                    <div className="mb-4">
                      <span className="text-xs text-muted-blue uppercase tracking-wide">Promo Code:</span>
                      <div className="inline-flex items-center gap-2 ml-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                        <Tag className="w-3.5 h-3.5 text-gold" />
                        <span className="font-mono font-semibold text-primary-blue text-sm">
                          {currentPromo.code}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link 
                    to={`/properties/${currentPromo.propertySlug}`}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gold text-primary-blue font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    View Property
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-primary-blue" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-primary-blue" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {allPromotions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-6 bg-gold' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Property Thumbnails (Desktop) */}
          <div className="hidden lg:flex justify-center gap-3 mt-6">
            {allPromotions.slice(0, 6).map((promo, idx) => (
              <button
                key={promo.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentIndex 
                    ? 'border-gold ring-2 ring-gold/20' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={promo.propertyImage} 
                  alt={promo.propertyName}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
