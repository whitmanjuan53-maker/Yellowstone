import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface LifestyleSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
}

const lifestyleSlides: LifestyleSlide[] = [
  {
    id: 'sanctuary',
    title: 'Your Sanctuary',
    subtitle: 'Peaceful Living',
    description: 'Return to a home that embraces you with tranquility. Our properties feature thoughtfully designed spaces that prioritize your comfort and well-being.',
    image: '/lifestyle-sanctuary.jpg',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'community',
    title: 'Vibrant Community',
    subtitle: 'Connect & Thrive',
    description: 'Join a community of like-minded individuals. From rooftop socials to fitness classes, discover opportunities to connect and build lasting relationships.',
    image: '/lifestyle-community.jpg',
    color: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'nightlife',
    title: 'Urban Nightlife',
    subtitle: 'After Dark Adventures',
    description: 'Step out into the city\'s vibrant nightlife. Our prime locations put you at the center of the best dining, entertainment, and cultural experiences.',
    image: '/lifestyle-nightlife.jpg',
    color: 'from-purple-500/20 to-pink-500/20'
  }
];

export function LifestyleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % lifestyleSlides.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isVisible]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + lifestyleSlides.length) % lifestyleSlides.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % lifestyleSlides.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentSlide = lifestyleSlides[currentIndex];

  return (
    <section 
      ref={sectionRef} 
      className="relative section-padding section-breathe overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6 flex items-center justify-center gap-4 w-full">
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            <span>Experience the Lifestyle</span>
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
          </div>
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-blue mb-4 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Live Your <span className="text-gold">Best Life</span>
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-white border border-black/5 shadow-card hover:shadow-card-hover ring-1 ring-inset ring-black/5 rounded-sm p-4 lg:p-8 transition-all duration-500 ease-out">
            {/* Image Side */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-sm bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary-blue hover:bg-gold hover:text-white transition-colors duration-500 ease-out"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-10 h-10 rounded-sm bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary-blue hover:bg-gold hover:text-white transition-colors duration-500 ease-out"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:pl-8 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <motion.p 
                    className="text-gold font-bold mb-4 tracking-widest uppercase text-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.h3 
                    className="text-3xl md:text-4xl font-display font-bold text-primary-blue mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                  >
                    {currentSlide.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-blue text-base leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  >
                    {currentSlide.description}
                  </motion.p>

                  {/* Feature Tags */}
                  <motion.div 
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
                  >
                    {['Premium Amenities', 'Prime Location', '24/7 Support'].map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5, ease: "easeOut" }}
                        className="px-4 py-2 bg-slate-50 border border-black/5 rounded-sm text-xs font-bold uppercase tracking-widest text-primary-gray"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {lifestyleSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  index === currentIndex 
                    ? 'w-8 bg-gold' 
                    : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
