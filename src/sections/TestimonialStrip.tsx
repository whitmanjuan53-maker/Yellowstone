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
    <section className="py-20 bg-muted-blue" ref={ref}>
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Trusted by Industry Leaders
            </h2>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-8 md:p-12">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-gold/30" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8 max-w-3xl mx-auto">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-gold">
                      {testimonials[currentIndex].title}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-primary-blue transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-gold hover:border-gold hover:text-primary-blue transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
