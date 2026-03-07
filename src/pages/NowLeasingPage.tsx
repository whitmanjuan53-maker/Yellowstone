import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Calendar,
  ArrowRight,
  Tag,
  Clock,
  Percent,
  Gift,
  Star,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

// Promotions data for each property
interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  discount: string;
  validUntil: string;
  code?: string;
  badge?: string;
  color: string;
}

interface PropertyPromotions {
  propertyId: string;
  promotions: Promotion[];
}

const propertyPromotions: PropertyPromotions[] = [
  {
    propertyId: '1',
    promotions: [
      {
        id: 'grand-1',
        title: 'Move-In Special',
        subtitle: 'First Month Free',
        description: 'Sign a 12-month lease and get your first month rent-free! Plus, waived application and admin fees.',
        discount: '$2,800 OFF',
        validUntil: '2025-03-31',
        code: 'MOVEIN24',
        badge: 'Limited Time',
        color: 'from-amber-500 to-orange-500'
      },
      {
        id: 'grand-2',
        title: 'Referral Bonus',
        subtitle: 'Give $500, Get $500',
        description: 'Refer a friend who signs a lease and both receive $500 rent credit. No limit on referrals!',
        discount: '$500 EACH',
        validUntil: '2025-12-31',
        code: 'REFER500',
        badge: 'Ongoing',
        color: 'from-blue-500 to-indigo-500'
      },
      {
        id: 'grand-3',
        title: 'Military Discount',
        subtitle: '5% Off Monthly Rent',
        description: 'Active duty and veterans receive 5% off monthly rent with valid ID. Thank you for your service!',
        discount: '5% OFF',
        validUntil: 'Ongoing',
        badge: 'Military',
        color: 'from-emerald-500 to-teal-500'
      }
    ]
  },
  {
    propertyId: '2',
    promotions: [
      {
        id: 'urban-1',
        title: 'Spring Savings',
        subtitle: '$1,000 Off First Month',
        description: 'Spring into your new home with $1,000 off first month rent on select floor plans.',
        discount: '$1,000 OFF',
        validUntil: '2025-04-30',
        code: 'SPRING1K',
        badge: 'Hot Deal',
        color: 'from-pink-500 to-rose-500'
      },
      {
        id: 'urban-2',
        title: 'Look & Lease',
        subtitle: 'Apply Same Day, Save $500',
        description: 'Tour and apply within 24 hours of your visit to receive $500 off your first month.',
        discount: '$500 OFF',
        validUntil: '2025-03-15',
        code: 'LOOKLEASE',
        badge: 'Act Fast',
        color: 'from-purple-500 to-violet-500'
      }
    ]
  },
  {
    propertyId: '3',
    promotions: [
      {
        id: 'skyline-1',
        title: 'Luxury Living Special',
        subtitle: '2 Months Free',
        description: 'Sign a 15-month lease on a penthouse unit and receive 2 months free. Experience luxury at its finest.',
        discount: '$15,000 OFF',
        validUntil: '2025-04-15',
        badge: 'Penthouse',
        color: 'from-amber-400 to-yellow-500'
      },
      {
        id: 'skyline-2',
        title: 'Corporate Housing',
        subtitle: 'Flexible Terms Available',
        description: 'Corporate relocations welcome! Short-term leases available with furnished options.',
        discount: 'FLEXIBLE',
        validUntil: 'Ongoing',
        code: 'CORP2024',
        badge: 'Corporate',
        color: 'from-slate-500 to-gray-500'
      }
    ]
  },
  {
    propertyId: '4',
    promotions: [
      {
        id: 'parkside-1',
        title: 'Family Friendly',
        subtitle: 'Kids Play Free',
        description: 'Families with children receive waived pet fees and complimentary access to all community play areas.',
        discount: '$350 WAIVED',
        validUntil: 'Ongoing',
        badge: 'Family',
        color: 'from-green-500 to-emerald-500'
      },
      {
        id: 'parkside-2',
        title: 'Early Bird Special',
        subtitle: 'Reserve Now, Move Later',
        description: 'Reserve your townhome up to 60 days in advance and receive $200 off your first month.',
        discount: '$200 OFF',
        validUntil: '2025-06-30',
        code: 'EARLYBIRD',
        badge: 'Plan Ahead',
        color: 'from-cyan-500 to-blue-500'
      }
    ]
  },
  {
    propertyId: '5',
    promotions: [
      {
        id: 'vista-1',
        title: 'Desert Heat Special',
        subtitle: 'Summer Move-In Bonus',
        description: 'Move in during summer months and receive free AC maintenance for your first year.',
        discount: '$600 VALUE',
        validUntil: '2025-08-31',
        badge: 'Summer',
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 'vista-2',
        title: 'Student Discount',
        subtitle: '10% Off with Student ID',
        description: 'College students receive 10% off monthly rent with valid student ID. Study in style!',
        discount: '10% OFF',
        validUntil: 'Ongoing',
        code: 'STUDENT10',
        badge: 'Students',
        color: 'from-indigo-500 to-purple-500'
      }
    ]
  },
  {
    propertyId: '6',
    promotions: [
      {
        id: 'azure-1',
        title: 'Music City Welcome',
        subtitle: 'Free Parking for 6 Months',
        description: 'New residents receive complimentary reserved parking for 6 months. A $900 value!',
        discount: '$900 VALUE',
        validUntil: '2025-05-31',
        code: 'PARKFREE',
        badge: 'Limited',
        color: 'from-violet-500 to-purple-600'
      },
      {
        id: 'azure-2',
        title: 'Recording Studio Access',
        subtitle: 'Free Studio Hours',
        description: 'Residents get 10 free hours per month in our on-site professional recording studio.',
        discount: 'FREE ACCESS',
        validUntil: 'Ongoing',
        badge: 'Artists',
        color: 'from-fuchsia-500 to-pink-500'
      }
    ]
  },
  {
    propertyId: '7',
    promotions: [
      {
        id: 'willow-1',
        title: 'Pet Paradise',
        subtitle: 'No Pet Deposit',
        description: 'Pet lovers rejoice! No pet deposit required and free dog park membership included.',
        discount: '$300 WAIVED',
        validUntil: 'Ongoing',
        badge: 'Pet Friendly',
        color: 'from-teal-500 to-cyan-500'
      },
      {
        id: 'willow-2',
        title: 'Garden Special',
        subtitle: 'Private Patio Upgrade',
        description: 'Select units receive a complimentary patio furniture set for your private garden space.',
        discount: '$800 VALUE',
        validUntil: '2025-04-30',
        code: 'GARDEN24',
        badge: 'Upgrade',
        color: 'from-green-400 to-emerald-500'
      }
    ]
  },
  {
    propertyId: '8',
    promotions: [
      {
        id: 'foundry-1',
        title: 'Historic Charm',
        subtitle: 'Loft Living Special',
        description: 'Experience authentic loft living with 1 month free on any 12-month lease.',
        discount: '$2,800 OFF',
        validUntil: '2025-03-31',
        code: 'LOFTLIFE',
        badge: 'Featured',
        color: 'from-amber-600 to-orange-600'
      },
      {
        id: 'foundry-2',
        title: 'Artist Retreat',
        subtitle: 'Creative Space Bonus',
        description: 'Artists and creatives receive a $500 credit toward studio setup in your loft.',
        discount: '$500 CREDIT',
        validUntil: 'Ongoing',
        code: 'CREATE500',
        badge: 'Creative',
        color: 'from-rose-500 to-pink-600'
      }
    ]
  }
];

// Property Card with Promotion Carousel
function PropertyPromotionCard({ 
  property, 
  promotions 
}: { 
  property: typeof properties[0]; 
  promotions: Promotion[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentPromo = promotions[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.heroImage} 
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-display font-bold text-lg">{property.name}</h3>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <MapPin className="w-3 h-3" />
            {property.city}, {property.state}
          </div>
        </div>

        {/* Promotion Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${currentPromo.color} text-white`}>
            <Sparkles className="w-3 h-3" />
            {currentPromo.badge}
          </span>
        </div>

        {/* Carousel Navigation Dots */}
        {promotions.length > 1 && (
          <div className="absolute top-3 left-3 flex gap-1">
            {promotions.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Promotion Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromo.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Discount Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-bold rounded-lg bg-gradient-to-r ${currentPromo.color} text-white`}>
                <Percent className="w-3.5 h-3.5" />
                {currentPromo.discount}
              </span>
              {currentPromo.code && (
                <span className="text-xs text-muted-blue bg-gray-100 px-2 py-1 rounded font-mono">
                  Code: {currentPromo.code}
                </span>
              )}
            </div>

            {/* Title & Description */}
            <h4 className="font-display font-bold text-primary-blue text-base mb-1">
              {currentPromo.title}
            </h4>
            <p className="text-gold font-semibold text-sm mb-2">
              {currentPromo.subtitle}
            </p>
            <p className="text-muted-blue text-xs leading-relaxed mb-3 line-clamp-2">
              {currentPromo.description}
            </p>

            {/* Valid Until */}
            <div className="flex items-center gap-1.5 text-xs text-muted-blue mb-4">
              <Clock className="w-3 h-3" />
              Valid until: {currentPromo.validUntil === 'Ongoing' ? 'Ongoing' : new Date(currentPromo.validUntil).toLocaleDateString()}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {promotions.length > 1 && (
            <div className="flex gap-1">
              <button
                onClick={handlePrev}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-primary-blue" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-primary-blue" />
              </button>
            </div>
          )}
          <Link to={`/properties/${property.slug}`} className="flex-1">
            <Button 
              size="sm" 
              className="w-full bg-gold text-primary-blue hover:bg-gold-light font-semibold text-xs h-8"
            >
              View Property
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Carousel for Featured Promotions
function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredPromos = [
    {
      title: 'Spring Move-In Special',
      subtitle: 'Up to 2 Months Free Rent',
      description: 'Limited time offer on select properties. Secure your dream home today!',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      icon: Gift
    },
    {
      title: 'Referral Rewards',
      subtitle: 'Give $500, Get $500',
      description: 'Refer a friend and both of you receive rent credits when they sign a lease.',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      icon: Star
    },
    {
      title: 'Military & Student Discounts',
      subtitle: '5-10% Off Monthly Rent',
      description: 'Special rates for active military, veterans, and college students.',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      icon: Check
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPromos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = featuredPromos[currentIndex];
  const Icon = current.icon;

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-r ${current.gradient} py-16 px-4 sm:px-6 lg:px-8`}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4"
            >
              <Icon className="w-4 h-4" />
              <span>Featured Offer</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-3"
            >
              {current.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl text-white/90 font-semibold mb-4"
            >
              {current.subtitle}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 max-w-xl mx-auto mb-6"
            >
              {current.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/properties">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-blue hover:bg-white/90 font-semibold px-8"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredPromos.length) % featuredPromos.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredPromos.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredPromos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Main Page Component
export function NowLeasingPage() {
  const [filter, setFilter] = useState<'all' | 'limited' | 'ongoing'>('all');

  const filteredProperties = properties.filter(p => {
    if (filter === 'limited') {
      return propertyPromotions.find(pp => pp.propertyId === p.id)?.promotions.some(promo => promo.validUntil !== 'Ongoing');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Special Offers
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary-blue mb-3">
            Now Leasing Specials
          </h1>
          <p className="text-muted-blue max-w-2xl mx-auto">
            Take advantage of these limited-time offers across our premium properties. 
            From move-in specials to referral bonuses, find the perfect deal for your new home.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Offers' },
            { id: 'limited', label: 'Limited Time' },
            { id: 'ongoing', label: 'Ongoing' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === f.id
                  ? 'bg-gold text-primary-blue'
                  : 'bg-white text-muted-blue hover:bg-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Property Promotions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => {
            const promos = propertyPromotions.find(pp => pp.propertyId === property.id)?.promotions || [];
            if (promos.length === 0) return null;
            
            return (
              <PropertyPromotionCard
                key={property.id}
                property={property}
                promotions={promos}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-muted-blue">No promotions found for the selected filter.</p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary-blue rounded-2xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
            Don&apos;t See What You&apos;re Looking For?
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            Contact our leasing team for additional specials and availability updates.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-gold text-primary-blue hover:bg-gold-light font-semibold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Tour
              </Button>
            </Link>
            <a href="tel:+17135551234">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-blue font-semibold"
              >
                Call Leasing Office
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
