import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center min-h-screen pt-[72px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/houston-skyline-bg.jpg"
          alt="Houston Skyline"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-8 lg:py-0 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gold">
              <span className="w-6 h-px bg-gold" />
              Now Leasing
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold tracking-tighter leading-[1.05] text-white mb-4 drop-shadow-md text-[clamp(2.75rem,6vw,4.5rem)]"
          >
            Find Your Next Home
            <br />
            <span className="text-gold">With Confidence.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white text-lg lg:text-xl leading-relaxed max-w-lg mb-8 font-medium drop-shadow-sm"
          >
            Professionally managed communities designed for comfort,
            convenience, and long-term living.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link to="/properties">
              <Button
                size="lg"
                className="bg-gold text-primary-blue hover:bg-gold-light hover:text-primary-blue font-bold px-8 h-14 text-xs tracking-widest uppercase group transition-all duration-500 ease-out"
              >
                View Properties
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 ease-out group-hover:translate-x-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border border-white/20 text-white hover:bg-white/10 hover:text-white font-bold px-8 h-14 text-xs tracking-widest uppercase transition-all duration-500 ease-out bg-transparent backdrop-blur-sm"
              >
                <Calendar className="w-4 h-4 mr-2 shrink-0" />
                Schedule Tour
              </Button>
            </Link>
          </motion.div>

          {/* Location tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs text-white tracking-widest uppercase font-bold drop-shadow-sm"
          >
            Now Leasing in Alvin, TX &amp; Surrounding Areas
          </motion.p>
        </div>
      </div>


    </section>
  );
}
