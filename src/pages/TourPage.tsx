import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Bed, Bath, Square, ArrowRight, Check, X,
  Phone, Mail, Clock,
  Calendar, Video, PersonStanding, Star, Eye,
  LayoutGrid, GitCompare, CheckCircle2, Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { properties } from '@/data/properties';
import type { Property, FloorPlan } from '@/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

const RECENTLY_VIEWED_KEY = 'ys-recently-viewed-fps';

function getRecentlyViewed(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
  } catch {
    return [];
  }
}

function addRecentlyViewed(id: string) {
  const list = getRecentlyViewed().filter((x) => x !== id);
  sessionStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify([id, ...list].slice(0, 6)));
}

function popularPlanId(plans: FloorPlan[]): string | null {
  if (!plans.length) return null;
  return plans.reduce((a, b) => (b.availability > a.availability ? b : a)).id;
}

const tourTypes = [
  { id: 'in-person', label: 'In-Person Tour', icon: PersonStanding, desc: 'Walk through with a leasing agent' },
  { id: 'virtual', label: 'Virtual Tour', icon: Video, desc: 'Live video tour from anywhere' },
  { id: 'self-guided', label: 'Self-Guided', icon: Eye, desc: 'Explore on your own schedule' },
] as const;

type TourType = 'in-person' | 'virtual' | 'self-guided';

// ─── Floor Plan Card ─────────────────────────────────────────────────────────

interface FPCardProps {
  plan: FloorPlan;
  isPopular: boolean;
  isRecentlyViewed: boolean;
  isInCompare: boolean;
  compareCount: number;
  onViewDetails: (plan: FloorPlan) => void;
  onTourThis: (plan: FloorPlan) => void;
  onToggleCompare: (plan: FloorPlan) => void;
}

function FloorPlanCard({
  plan, isPopular, isRecentlyViewed, isInCompare, compareCount,
  onViewDetails, onTourThis, onToggleCompare,
}: FPCardProps) {
  const canAddCompare = isInCompare || compareCount < 2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white flex flex-col h-full relative overflow-hidden"
      style={{
        borderTop: isPopular ? '3px solid var(--gold)' : '3px solid transparent',
        boxShadow: '0 2px 12px rgba(43,57,95,0.07)',
      }}
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
        {isPopular && (
          <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: 'var(--gold-light)', color: 'var(--primary-blue)' }}>
            <Star className="w-2.5 h-2.5" fill="currentColor" /> Most Popular
          </span>
        )}
        {isRecentlyViewed && !isPopular && (
          <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-primary-blue/8 text-muted-blue">
            Recently Viewed
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-gray-50">
        <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
        {/* Availability overlay */}
        <div className={`absolute bottom-0 left-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${
          plan.availability > 2
            ? 'bg-emerald-600 text-white'
            : plan.availability > 0
            ? 'bg-amber-500 text-white'
            : 'bg-gray-400 text-white'
        }`}>
          {plan.availability > 0 ? `${plan.availability} Available` : 'Waitlist'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1.5">
          <h4 className="font-display font-bold text-primary-blue text-base leading-snug">{plan.name}</h4>
          <span className="text-gold font-bold text-base shrink-0 ml-2">
            ${plan.price.toLocaleString()}<span className="text-xs text-muted-blue font-normal">/mo</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-blue mb-3">
          <span className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5" strokeWidth={1.75} />
            {plan.bedrooms === 0 ? 'Studio' : `${plan.bedrooms} Bed`}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5" strokeWidth={1.75} />
            {plan.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-3.5 h-3.5" strokeWidth={1.75} />
            {plan.sqft.toLocaleString()} sqft
          </span>
        </div>

        <div className="space-y-1 mb-4 flex-1">
          {plan.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-muted-blue">
              <Check className="w-3 h-3 text-gold shrink-0" strokeWidth={2.5} />
              {f}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(plan)}
            className="flex-1 text-xs font-semibold border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-all duration-200 px-3 py-2"
          >
            View Details
          </button>
          <button
            onClick={() => onTourThis(plan)}
            className="flex-1 text-xs font-semibold text-primary-blue hover:text-white transition-all duration-200 px-3 py-2"
            style={{ background: 'var(--gold)' }}
          >
            Tour This Layout
          </button>
        </div>

        {/* Compare toggle */}
        <button
          onClick={() => canAddCompare && onToggleCompare(plan)}
          disabled={!canAddCompare}
          className={`mt-2 text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 py-1.5 transition-colors ${
            isInCompare
              ? 'text-gold'
              : canAddCompare
              ? 'text-muted-blue/60 hover:text-muted-blue'
              : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          <GitCompare className="w-3 h-3" />
          {isInCompare ? 'Remove from Compare' : 'Add to Compare'}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Floor Plan Detail Modal ─────────────────────────────────────────────────

interface FPDetailProps {
  plan: FloorPlan;
  propertyName: string;
  onClose: () => void;
  onTour: () => void;
}

function FloorPlanDetail({ plan, propertyName, onClose, onTour }: FPDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-blue/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <span className="text-xs text-gold font-semibold uppercase tracking-wider">{propertyName}</span>
            <h3 className="font-display font-bold text-primary-blue text-2xl mt-1">{plan.name}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-muted-blue hover:text-primary-blue transition-colors -mr-1 -mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image */}
        <div className="aspect-video overflow-hidden bg-gray-50">
          <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Size', value: `${plan.sqft.toLocaleString()} sqft` },
              { label: 'Beds / Baths', value: `${plan.bedrooms === 0 ? 'Studio' : plan.bedrooms} / ${plan.bathrooms}` },
              { label: 'Starting At', value: `$${plan.price.toLocaleString()}/mo` },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 bg-background">
                <div className="font-bold text-primary-blue text-lg font-display">{item.value}</div>
                <div className="text-xs text-muted-blue uppercase tracking-wide mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-blue uppercase tracking-wider mb-3">Features</h4>
            <div className="grid grid-cols-2 gap-2">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-blue">
                  <Check className="w-3.5 h-3.5 text-gold shrink-0" strokeWidth={2.5} />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-semibold mb-6 ${
            plan.availability > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
          }`}>
            {plan.availability > 0 ? `${plan.availability} unit${plan.availability !== 1 ? 's' : ''} available` : 'Currently on waitlist'}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onTour}
              className="flex-1 font-semibold h-12"
              style={{ background: 'var(--gold)', color: 'var(--primary-blue)' }}
            >
              <Calendar className="w-4 h-4 mr-2" /> Tour This Layout
            </Button>
            <Link to="/contact" className="flex-1">
              <Button variant="outline" className="w-full border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white h-12 font-semibold transition-all">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Comparison Panel ────────────────────────────────────────────────────────

function ComparePanel({ plans, onRemove }: { plans: FloorPlan[]; onRemove: (id: string) => void }) {
  if (plans.length < 2) return null;
  const [a, b] = plans;
  const rows = [
    { label: 'Bedrooms', a: a.bedrooms === 0 ? 'Studio' : `${a.bedrooms}`, b: b.bedrooms === 0 ? 'Studio' : `${b.bedrooms}` },
    { label: 'Bathrooms', a: `${a.bathrooms}`, b: `${b.bathrooms}` },
    { label: 'Square Feet', a: `${a.sqft.toLocaleString()}`, b: `${b.sqft.toLocaleString()}` },
    { label: 'Starting Price', a: `$${a.price.toLocaleString()}/mo`, b: `$${b.price.toLocaleString()}/mo` },
    { label: 'Available Units', a: a.availability > 0 ? `${a.availability}` : 'Waitlist', b: b.availability > 0 ? `${b.availability}` : 'Waitlist' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-8 bg-white overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(43,57,95,0.12)', borderTop: '3px solid var(--gold)' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4" style={{ color: 'var(--gold)' }} />
          <span className="font-semibold text-primary-blue text-sm">Floor Plan Comparison</span>
        </div>
        <button onClick={() => { onRemove(a.id); onRemove(b.id); }} className="text-xs text-muted-blue hover:text-primary-blue transition-colors">
          Clear
        </button>
      </div>

      <div className="grid grid-cols-3 divide-x divide-gray-100">
        <div className="p-4" />
        {[a, b].map((plan) => (
          <div key={plan.id} className="p-4 text-center">
            <button onClick={() => onRemove(plan.id)} className="text-[10px] text-muted-blue/60 hover:text-muted-blue float-right">✕</button>
            <div className="font-display font-bold text-primary-blue text-base">{plan.name}</div>
            <div className="text-gold font-bold mt-0.5">${plan.price.toLocaleString()}<span className="text-xs text-muted-blue font-normal">/mo</span></div>
          </div>
        ))}
      </div>

      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
          <div className="p-3 px-4 text-xs font-semibold text-muted-blue uppercase tracking-wide">{row.label}</div>
          <div className="p-3 text-center text-sm font-medium text-primary-blue">{row.a}</div>
          <div className="p-3 text-center text-sm font-medium text-primary-blue">{row.b}</div>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Main TourPage ───────────────────────────────────────────────────────────

export function TourPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bedFilter, setBedFilter] = useState<number | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [detailPlan, setDetailPlan] = useState<FloorPlan | null>(null);
  const [compareList, setCompareList] = useState<FloorPlan[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => getRecentlyViewed());
  const [tourType, setTourType] = useState<TourType>('in-person');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const floorPlansRef = useRef<HTMLDivElement>(null);
  const schedulerRef = useRef<HTMLDivElement>(null);

  // Scroll to floor plans when property selected
  useEffect(() => {
    if (selectedProperty && floorPlansRef.current) {
      setTimeout(() => {
        floorPlansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedProperty]);

  const handleViewDetails = (plan: FloorPlan) => {
    setDetailPlan(plan);
    addRecentlyViewed(plan.id);
    setRecentlyViewed(getRecentlyViewed());
  };

  const handleTourThis = (_plan: FloorPlan) => {
    setDetailPlan(null);
    setTimeout(() => schedulerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleToggleCompare = (plan: FloorPlan) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === plan.id)) return prev.filter((p) => p.id !== plan.id);
      if (prev.length >= 2) return prev;
      return [...prev, plan];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const activePlans = selectedProperty
    ? selectedProperty.floorPlans.filter((fp) => {
        if (bedFilter !== null && fp.bedrooms !== bedFilter) return false;
        if (availableOnly && fp.availability === 0) return false;
        return true;
      })
    : [];

  const popularId = selectedProperty ? popularPlanId(selectedProperty.floorPlans) : null;
  const bedroomOptions = selectedProperty
    ? [...new Set(selectedProperty.floorPlans.map((f) => f.bedrooms))].sort()
    : [];

  // Urgency data
  const limitedProperty = selectedProperty
    ? selectedProperty.floorPlans.reduce((t, f) => t + f.availability, 0)
    : null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', paddingTop: '80px' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '62vh' }}>
        <div className="absolute inset-0">
          <img src="/hero-property.jpg" alt="Tour" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(43,57,95,0.92) 0%, rgba(43,57,95,0.80) 50%, rgba(43,57,95,0.65) 100%)' }} />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: 'var(--gold)' }}
          >
            <span className="w-6 h-px" style={{ background: 'var(--gold)' }} /> Tours & Floor Plans <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Schedule a Tour
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white/70 text-lg mb-9 max-w-xl mx-auto"
          >
            Explore our communities and view available floor plans before booking your visit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <a href="#communities">
              <Button size="lg" className="font-semibold px-8 group transition-all duration-300"
                style={{ height: '52px', background: 'var(--gold)', color: 'var(--primary-blue)', fontSize: '1rem' }}>
                Select a Community
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── URGENCY STRIP ────────────────────────────────────────────────── */}
      <div className="w-full py-3.5 px-6 text-center text-sm font-medium" style={{ background: 'var(--secondary-blue)' }}>
        {selectedProperty && limitedProperty !== null ? (
          <span className="text-white/80">
            <span style={{ color: 'var(--gold)' }}>{limitedProperty} unit{limitedProperty !== 1 ? 's' : ''} remaining</span>
            {' '}at {selectedProperty.name} —{' '}
            <span style={{ color: 'var(--gold)' }}>Tour today to secure your layout</span>
          </span>
        ) : (
          <span className="text-white/70">
            <span style={{ color: 'var(--gold)' }}>Now Leasing</span> in Alvin, TX &amp; Surrounding Areas —{' '}
            <span style={{ color: 'var(--gold)' }}>Tours available today</span>
          </span>
        )}
      </div>

      {/* ── STEP 1: COMMUNITY SELECTOR ───────────────────────────────────── */}
      <section id="communities" className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--gold)' }}>Step 1</span>
          <h2 className="font-display font-bold text-primary-blue mt-2" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Choose Your Community
          </h2>
          {selectedProperty && (
            <p className="text-muted-blue text-sm mt-1">
              Viewing <span className="font-semibold text-primary-blue">{selectedProperty.name}</span> —{' '}
              <button onClick={() => { setSelectedProperty(null); setBedFilter(null); setCompareList([]); }}
                className="underline text-gold hover:text-gold-dark transition-colors">
                Change community
              </button>
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((property, i) => {
            const isSelected = selectedProperty?.id === property.id;
            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => { setSelectedProperty(property); setBedFilter(null); setCompareList([]); }}
                className="bg-white cursor-pointer overflow-hidden group transition-all duration-300 relative"
                style={{
                  boxShadow: isSelected
                    ? '0 0 0 2px var(--gold), 0 8px 24px rgba(43,57,95,0.14)'
                    : '0 2px 10px rgba(43,57,95,0.07)',
                }}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--gold)' }}>
                    <Check className="w-3.5 h-3.5 text-primary-blue" strokeWidth={2.5} />
                  </div>
                )}
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={property.heroImage} alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className={`font-display font-bold text-base leading-snug mb-0.5 transition-colors ${isSelected ? 'text-gold' : 'text-primary-blue group-hover:text-gold'}`}>
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-blue mb-2.5">
                    <MapPin className="w-3 h-3" strokeWidth={1.75} />
                    {property.city}, {property.state}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-blue">
                      From <span className="font-bold text-primary-blue">${property.priceRange.min.toLocaleString()}</span>/mo
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 ${
                      property.availabilityStatus === 'available' ? 'bg-emerald-50 text-emerald-700'
                      : property.availabilityStatus === 'limited' ? 'bg-amber-50 text-amber-700'
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                      {property.availabilityStatus === 'available' ? 'Available'
                        : property.availabilityStatus === 'limited' ? 'Limited'
                        : 'Waitlist'}
                    </span>
                  </div>
                  <button className="w-full mt-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                    style={isSelected
                      ? { background: 'var(--gold)', color: 'var(--primary-blue)' }
                      : { background: 'var(--primary-blue)', color: 'white' }}>
                    {isSelected ? 'Selected ✓' : 'View Floor Plans'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── STEP 2: FLOOR PLANS ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.section
            ref={floorPlansRef}
            key={selectedProperty.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="py-16 lg:py-20 bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--gold)' }}>Step 2</span>
                  <h2 className="font-display font-bold text-primary-blue mt-2" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
                    Available Floor Plans
                  </h2>
                  <p className="text-muted-blue text-sm mt-1">at <span className="font-semibold text-primary-blue">{selectedProperty.name}</span>, {selectedProperty.city}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-blue">
                  <LayoutGrid className="w-4 h-4" />
                  {activePlans.length} plan{activePlans.length !== 1 ? 's' : ''} shown
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-8 p-4 bg-background">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-muted-blue uppercase tracking-wide mr-1">Beds:</span>
                  <button
                    onClick={() => setBedFilter(null)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase transition-all duration-200 ${
                      bedFilter === null
                        ? 'text-primary-blue'
                        : 'bg-white text-muted-blue hover:text-primary-blue border border-gray-200'
                    }`}
                    style={bedFilter === null ? { background: 'var(--gold)', color: 'var(--primary-blue)' } : {}}
                  >
                    All
                  </button>
                  {bedroomOptions.map((n) => (
                    <button
                      key={n}
                      onClick={() => setBedFilter(bedFilter === n ? null : n)}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase transition-all duration-200 ${
                        bedFilter === n
                          ? ''
                          : 'bg-white text-muted-blue hover:text-primary-blue border border-gray-200'
                      }`}
                      style={bedFilter === n ? { background: 'var(--gold)', color: 'var(--primary-blue)' } : {}}
                    >
                      {n === 0 ? 'Studio' : `${n} Bed`}
                    </button>
                  ))}
                </div>
                <div className="ml-auto">
                  <button
                    onClick={() => setAvailableOnly(!availableOnly)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase border transition-all duration-200 ${
                      availableOnly ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 'border-gray-200 bg-white text-muted-blue'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-sm flex items-center justify-center ${availableOnly ? 'bg-emerald-600' : 'border border-gray-300'}`}>
                      {availableOnly && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
                    </div>
                    Available Only
                  </button>
                </div>
              </div>

              {/* Floor Plan Grid */}
              {activePlans.length > 0 ? (
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  <AnimatePresence mode="popLayout">
                    {activePlans.map((plan) => (
                      <FloorPlanCard
                        key={plan.id}
                        plan={plan}
                        isPopular={plan.id === popularId}
                        isRecentlyViewed={recentlyViewed.includes(plan.id)}
                        isInCompare={compareList.some((p) => p.id === plan.id)}
                        compareCount={compareList.length}
                        onViewDetails={handleViewDetails}
                        onTourThis={handleTourThis}
                        onToggleCompare={handleToggleCompare}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-16 text-muted-blue">
                  <LayoutGrid className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">No floor plans match your filters.</p>
                  <button onClick={() => { setBedFilter(null); setAvailableOnly(false); }}
                    className="mt-3 text-sm underline text-gold hover:text-gold-dark">
                    Clear filters
                  </button>
                </div>
              )}

              {/* Comparison Panel */}
              <AnimatePresence>
                {compareList.length === 2 && (
                  <ComparePanel
                    plans={compareList}
                    onRemove={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
                  />
                )}
              </AnimatePresence>

              {/* Compare hint */}
              {compareList.length === 1 && (
                <div className="mt-4 text-center text-xs text-muted-blue/70">
                  Select one more floor plan to compare
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── STEP 3: SCHEDULER + SIDEBAR ─────────────────────────────────── */}
      <section ref={schedulerRef} className="py-16 lg:py-20" style={{ background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 xl:gap-14">

            {/* LEFT — Scheduler */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--gold)' }}>Step 3</span>
              <h2 className="font-display font-bold text-primary-blue mt-2 mb-8" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
                Book Your Visit
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-10 text-center"
                  style={{ boxShadow: '0 4px 24px rgba(43,57,95,0.1)' }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-display font-bold text-primary-blue text-2xl mb-3">Tour Request Sent!</h3>
                  <p className="text-muted-blue max-w-sm mx-auto mb-6">
                    We'll confirm your {tourType.replace('-', ' ')} tour within 1 business hour.
                    {selectedProperty && ` Looking forward to showing you ${selectedProperty.name}!`}
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link to="/properties">
                      <Button variant="outline" className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-semibold transition-all">
                        Browse More Communities
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button className="font-semibold" style={{ background: 'var(--gold)', color: 'var(--primary-blue)' }}>
                        Contact Leasing
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-6 lg:p-8" style={{ boxShadow: '0 4px 24px rgba(43,57,95,0.08)' }}>

                  {/* Tour Type */}
                  <div className="mb-8">
                    <label className="block text-xs font-semibold text-muted-blue uppercase tracking-wider mb-3">
                      Tour Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {tourTypes.map((t) => {
                        const active = tourType === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTourType(t.id as TourType)}
                            className="flex flex-col items-center gap-2 p-4 border-2 text-center transition-all duration-200"
                            style={active
                              ? { borderColor: 'var(--gold)', background: 'rgba(207,165,74,0.06)' }
                              : { borderColor: '#e5e7eb' }}
                          >
                            <t.icon className="w-5 h-5" style={{ color: active ? 'var(--gold)' : 'var(--muted-blue)' }} strokeWidth={1.75} />
                            <span className={`text-sm font-semibold ${active ? 'text-primary-blue' : 'text-muted-blue'}`}>{t.label}</span>
                            <span className="text-[11px] text-muted-blue/70">{t.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected community display */}
                  {selectedProperty && (
                    <div className="mb-6 p-3 flex items-center gap-3 bg-background border-l-4"
                      style={{ borderColor: 'var(--gold)' }}>
                      <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--gold)' }} />
                      <div>
                        <div className="text-xs text-muted-blue uppercase tracking-wide">Touring</div>
                        <div className="font-semibold text-primary-blue text-sm">{selectedProperty.name} — {selectedProperty.city}, {selectedProperty.state}</div>
                      </div>
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-blue uppercase tracking-wide mb-1.5">Name *</label>
                      <Input
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="h-11 border-gray-200 focus:border-gold focus:ring-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-blue uppercase tracking-wide mb-1.5">Email *</label>
                      <Input
                        required
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="h-11 border-gray-200 focus:border-gold focus:ring-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-blue uppercase tracking-wide mb-1.5">Phone</label>
                      <Input
                        type="tel"
                        placeholder="(000) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="h-11 border-gray-200 focus:border-gold focus:ring-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-blue uppercase tracking-wide mb-1.5">Preferred Date *</label>
                      <Input
                        required
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                        className="h-11 border-gray-200 focus:border-gold focus:ring-gold/30"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-muted-blue uppercase tracking-wide mb-1.5">Notes / Questions</label>
                    <textarea
                      rows={3}
                      placeholder="Any specific floor plans you'd like to see, questions, accessibility needs..."
                      value={formData.notes}
                      onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                      className="w-full border border-gray-200 px-3 py-2.5 text-sm text-primary-blue placeholder:text-muted-blue/50 focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full font-semibold group transition-all duration-300"
                    style={{ height: '52px', background: 'var(--gold)', color: 'var(--primary-blue)', fontSize: '1rem' }}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Request...</>
                    ) : (
                      <><Calendar className="w-4 h-4 mr-2" /> Confirm Tour <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></>
                    )}
                  </Button>

                  <p className="text-xs text-muted-blue/60 text-center mt-3">
                    We'll send a confirmation to your email within 1 business hour.
                  </p>
                </form>
              )}
            </div>

            {/* RIGHT — Sticky Sidebar (desktop only) */}
            <div className="hidden lg:block">
              <div className="sticky top-28 space-y-5">

                {/* Property Info Card */}
                {selectedProperty ? (
                  <div className="bg-white overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(43,57,95,0.1)' }}>
                    <div className="h-28 overflow-hidden">
                      <img src={selectedProperty.heroImage} alt={selectedProperty.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-primary-blue text-lg leading-snug">{selectedProperty.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-blue mt-1 mb-4">
                        <MapPin className="w-3.5 h-3.5" /> {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state}
                      </div>
                      <ul className="space-y-2.5 text-xs text-muted-blue border-t border-gray-100 pt-4">
                        <li className="flex items-center gap-2.5">
                          <Clock className="w-3.5 h-3.5 text-gold/80 shrink-0" />
                          Mon–Fri 9am–6pm · Sat 10am–4pm
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Phone className="w-3.5 h-3.5 text-gold/80 shrink-0" />
                          (713) 555-1234
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Mail className="w-3.5 h-3.5 text-gold/80 shrink-0" />
                          leasing@yellowstone.com
                        </li>
                        {selectedProperty.amenities.includes('Pet Friendly') && (
                          <li className="flex items-center gap-2.5 text-emerald-600 font-medium">
                            <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} /> Pet Friendly Community
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-gray-100 border-t border-gray-100">
                      <Link to="/contact" className="flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wide text-primary-blue hover:text-white transition-colors hover:bg-primary-blue">
                        <Phone className="w-3.5 h-3.5" /> Call Leasing
                      </Link>
                      <Link to="/contact" className="flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wide"
                        style={{ background: 'var(--gold)', color: 'var(--primary-blue)' }}>
                        Apply Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 text-center" style={{ boxShadow: '0 4px 24px rgba(43,57,95,0.08)' }}>
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <p className="text-sm font-semibold text-primary-blue mb-1">Select a Community</p>
                    <p className="text-xs text-muted-blue">Choose a property above to see contact info and availability.</p>
                  </div>
                )}

                {/* Quick contact card */}
                <div className="bg-white p-5" style={{ boxShadow: '0 4px 24px rgba(43,57,95,0.08)', borderTop: '3px solid var(--gold)' }}>
                  <p className="text-xs font-semibold text-muted-blue uppercase tracking-wide mb-3">Prefer to call?</p>
                  <a href="tel:+17135551234" className="flex items-center gap-2 text-primary-blue font-bold text-lg hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" /> (713) 555-1234
                  </a>
                  <p className="text-xs text-muted-blue mt-1">Leasing team available Mon–Sat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOOR PLAN DETAIL MODAL ──────────────────────────────────────── */}
      <AnimatePresence>
        {detailPlan && selectedProperty && (
          <FloorPlanDetail
            plan={detailPlan}
            propertyName={selectedProperty.name}
            onClose={() => setDetailPlan(null)}
            onTour={() => handleTourThis(detailPlan)}
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE STICKY BAR ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ background: 'white', borderTop: '1px solid rgba(43,57,95,0.1)', boxShadow: '0 -4px 16px rgba(43,57,95,0.1)' }}>
        <div className="flex items-stretch divide-x divide-gray-100">
          <a href="tel:+17135551234" className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors"
            style={{ color: 'var(--muted-blue)' }}>
            <Phone style={{ width: '18px', height: '18px' }} strokeWidth={1.75} />
            <span className="text-[10px] font-semibold tracking-wide uppercase">Call</span>
          </a>
          <a href="#communities" className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5"
            style={{ background: 'var(--gold)', color: 'var(--primary-blue)' }}>
            <Calendar style={{ width: '18px', height: '18px' }} strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-wide uppercase">Tour</span>
          </a>
          <Link to="/contact" className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors"
            style={{ color: 'var(--muted-blue)' }}>
            <Mail style={{ width: '18px', height: '18px' }} strokeWidth={1.75} />
            <span className="text-[10px] font-semibold tracking-wide uppercase">Apply</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
