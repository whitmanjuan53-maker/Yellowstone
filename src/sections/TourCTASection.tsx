import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function TourCTASection() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-28 relative overflow-hidden"
      style={{ background: 'var(--primary-blue)' }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        <ScrollReveal>
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-5">
            <span className="w-5 h-px bg-gold" />
            Tours Available
            <span className="w-5 h-px bg-gold" />
          </span>

          {/* Headline */}
          <h2 className="font-display font-bold text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            Tour Your Future Home Today
          </h2>

          {/* Subtext */}
          <p className="text-white/65 text-sm sm:text-base lg:text-lg mb-8 lg:mb-10 max-w-md mx-auto px-4 sm:px-0">
            In-person and virtual tours available — schedule at a time that works for you.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gold text-primary-blue hover:bg-gold-light font-semibold px-8 group transition-all duration-300"
                style={{ height: '52px', fontSize: '1rem' }}
              >
                Schedule In-Person Tour
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold px-8 bg-transparent transition-all duration-300"
                style={{ height: '52px', fontSize: '1rem' }}
              >
                Schedule Virtual Tour
              </Button>
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
