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
      className="relative py-20 overflow-hidden bg-gradient-to-b from-neutral-100 via-white to-neutral-100 dark:from-[#0a1628] dark:via-[#0d1d30] dark:to-[#0a1628]"
    >
      {/* Background Gradient Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlide.color}`}
        />
      </AnimatePresence>

      <div className="section-padding relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E1B84A]/10 rounded-full text-[#E1B84A] text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Experience the Lifestyle</span>
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Live Your <span className="text-[#E1B84A]">Best Life</span>
            </motion.h2>
          </motion.div>

          {/* Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image Side */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
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
                    className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-primary dark:text-white hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-primary dark:text-white hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:pl-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                  >
                    <motion.p 
                      className="text-[#E1B84A] font-medium mb-2 tracking-wider uppercase text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                    <motion.h3 
                      className="text-3xl md:text-4xl font-display font-bold text-primary dark:text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {currentSlide.title}
                    </motion.h3>
                    <motion.p 
                      className="text-slate/70 dark:text-white/60 text-lg leading-relaxed mb-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentSlide.description}
                    </motion.p>

                    {/* Feature Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      {['Premium Amenities', 'Prime Location', '24/7 Support'].map((tag, index) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="px-4 py-2 bg-white dark:bg-white/10 rounded-full text-sm font-medium text-primary dark:text-white shadow-sm"
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-[#E1B84A]' 
                      : 'w-2 bg-neutral-300 dark:bg-white/30 hover:bg-neutral-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
