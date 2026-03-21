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
      className="section-padding section-breathe bg-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6 flex items-center justify-center gap-4 w-full">
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            <span>Limited Time Offers</span>
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-blue mb-4 tracking-tighter leading-tight">
            Now Leasing Specials
          </h2>
          <p className="text-muted-blue text-lg max-w-2xl mx-auto leading-relaxed">
            Exclusive deals on our premium properties. Don&apos;t miss out!
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Card */}
          <div className="relative bg-white rounded-sm border border-black/5 ring-1 ring-inset ring-black/5 shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-500 ease-out">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromo.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid md:grid-cols-2"
              >
                {/* Image Side */}
                <div className="relative h-64 md:h-auto min-h-[320px]">
                  <img 
                    src={currentPromo.propertyImage} 
                    alt={currentPromo.propertyName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/90 via-primary-blue/20 to-transparent" />
                  
                  {/* Property Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white font-display font-bold text-2xl tracking-tight mb-2">
                      {currentPromo.propertyName}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium tracking-wide">
                      <MapPin className="w-4 h-4" strokeWidth={1.5} />
                      {currentPromo.propertyCity}, {currentPromo.propertyState}
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${currentPromo.color} text-white shadow-md`}>
                      <Sparkles className="w-3 h-3" />
                      Special Offer
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  {/* Discount Badge */}
                  <div className="mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-lg font-bold tracking-tight bg-gradient-to-r ${currentPromo.color} text-white shadow-sm`}>
                      <Percent className="w-4 h-4" strokeWidth={2.5} />
                      {currentPromo.discount}
                    </span>
                  </div>

                  {/* Promotion Title */}
                  <h4 className="text-2xl font-display font-bold text-primary-blue mb-2 tracking-tight">
                    {currentPromo.title}
                  </h4>
                  <p className="text-gold font-bold tracking-widest text-xs uppercase mb-6">
                    {currentPromo.subtitle}
                  </p>

                  {/* Valid Until */}
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-blue mb-6">
                    <Clock className="w-4 h-4" strokeWidth={1.5} />
                    <span>
                      Valid until: {currentPromo.validUntil === 'Ongoing' ? 'Ongoing' : new Date(currentPromo.validUntil).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Promo Code */}
                  {currentPromo.code && (
                    <div className="mb-8">
                      <span className="text-xs text-muted-blue/70 uppercase font-bold tracking-widest block mb-2">Promo Code:</span>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-black/5 rounded-sm ring-1 ring-inset ring-black/5">
                        <Tag className="w-4 h-4 text-gold" strokeWidth={1.5} />
                        <span className="font-mono font-bold text-primary-blue text-sm tracking-widest">
                          {currentPromo.code}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link 
                    to={`/properties/${currentPromo.propertySlug}`}
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-primary-blue text-white text-xs font-bold tracking-widest uppercase rounded-sm hover:-translate-y-1 hover:bg-gold transition-all duration-500 ease-out shadow-md group mt-auto"
                  >
                    View Property
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-sm flex items-center justify-center shadow-card border border-black/5 hover:bg-gold hover:text-white transition-all duration-500 ease-out z-10 text-primary-blue hover:-translate-x-1"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-sm flex items-center justify-center shadow-card border border-black/5 hover:bg-gold hover:text-white transition-all duration-500 ease-out z-10 text-primary-blue hover:translate-x-1"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {allPromotions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  idx === currentIndex 
                    ? 'w-8 bg-gold' 
                    : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Property Thumbnails (Desktop) */}
          <div className="hidden lg:flex justify-center gap-4 mt-8">
            {allPromotions.slice(0, 6).map((promo, idx) => (
              <button
                key={promo.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`relative w-20 h-20 rounded-sm overflow-hidden border transition-all duration-500 ease-out shadow-sm hover:-translate-y-1 ${
                  idx === currentIndex 
                    ? 'border-gold ring-1 ring-gold shadow-gold-glow' 
                    : 'border-black/5 opacity-60 hover:opacity-100 hover:border-black/10'
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
