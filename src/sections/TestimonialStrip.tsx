import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Yellowstone's professional management has consistently delivered above-market returns. Their institutional approach to asset management gives us complete confidence in our investment.",
    author: "Michael Richardson",
    title: "Managing Director, Capital Partners LLC",
    rating: 5
  },
  {
    quote: "The attention to detail and resident satisfaction focus sets Yellowstone apart. Our properties have never performed better, and occupancy rates exceed market averages.",
    author: "Sarah Chen",
    title: "Portfolio Manager, REIT Investment Group",
    rating: 5
  },
  {
    quote: "Working with Yellowstone has been transformative for our multifamily portfolio. Their data-driven approach and operational excellence deliver measurable results.",
    author: "David Morrison",
    title: "Principal, Morrison Family Investments",
    rating: 5
  },
  {
    quote: "The transparency and communication from Yellowstone is unmatched. We always know exactly how our assets are performing and what strategies are being implemented.",
    author: "Jennifer Walsh",
    title: "Investment Director, Walsh Capital",
    rating: 5
  }
];

export function TestimonialStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding section-breathe bg-primary-blue relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative bg-white/5 border border-white/10 shadow-card ring-1 ring-inset ring-white/5 p-8 md:p-16 rounded-sm backdrop-blur-sm">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-gold/20" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center relative z-10"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-gold fill-gold" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-xl md:text-3xl text-white font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="font-bold text-white text-lg tracking-wide mb-1">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-gold text-xs uppercase tracking-widest font-bold">
                    {testimonials[currentIndex].title}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 mt-12 relative z-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-primary-blue hover:-translate-x-1 transition-all duration-500 ease-out rounded-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-primary-blue hover:translate-x-1 transition-all duration-500 ease-out rounded-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-sm transition-all duration-500 ease-out ${
                  index === currentIndex ? 'bg-gold w-8' : 'bg-white/20 hover:bg-white/40 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
