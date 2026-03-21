import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

export function TourCTASection() {
  return (
    <section
      className="section-padding section-breathe relative overflow-hidden bg-primary-blue"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 text-center">
        <ScrollReveal>
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-4 text-gold text-xs tracking-widest uppercase font-bold mb-6">
            <span className="w-8 h-px bg-gold/50" />
            Tours Available
            <span className="w-8 h-px bg-gold/50" />
          </span>

          {/* Headline */}
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-7xl leading-none mb-6 tracking-tighter">
            Tour Your Future <br />
            <span className="text-gold">Home Today</span>
          </h2>

          {/* Subtext */}
          <p className="text-white/60 text-base lg:text-lg mb-12 max-w-xl mx-auto font-medium">
            In-person and virtual tours available — schedule at a time that works for you.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
          >
            <Link to="/contact">
              <Button
                className="bg-gold text-primary-blue hover:bg-white px-8 py-6 rounded-sm shadow-gold hover:shadow-gold-glow transition-all duration-500 ease-out hover:-translate-y-1 group"
              >
                Schedule In-Person Tour
                <ArrowRight className="w-4 h-4 ml-3 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-out" />
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline"
                className="border border-white/20 text-white hover:bg-white/5 px-8 py-6 rounded-sm transition-all duration-500 ease-out hover:-translate-y-1 bg-transparent"
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
