import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onScheduleTour?: () => void;
}

export function CTASection({ onScheduleTour }: CTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding section-breathe relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="relative overflow-hidden rounded-sm bg-primary-blue p-8 md:p-16 shadow-2xl ring-1 ring-inset ring-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          {/* Floating High-Density Glows */}
          <motion.div
            className="absolute -top-32 -right-32 w-96 h-96 bg-gold/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-blue/40 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "linear" }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Institutional Eyebrow */}
              <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-4">
                <div className="h-px bg-gold/30 w-8"></div>
                <span>Take the Next Step</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tighter leading-[1.1]">
                Ready to Find Your <span className="text-gold">Perfect Home?</span>
              </h2>
              
              <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-xl">
                Let our team of experts guide you through the process. Schedule a tour 
                today and experience luxury living firsthand.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {onScheduleTour ? (
                  <Button
                    size="lg"
                    onClick={onScheduleTour}
                    className="bg-gold text-primary-blue hover:bg-white px-8 h-14 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-1 shadow-gold hover:shadow-gold-glow group"
                  >
                    <Calendar className="w-4 h-4 mr-3" />
                    Schedule a Tour
                  </Button>
                ) : (
                  <Link to="/properties">
                    <Button
                      size="lg"
                      className="bg-gold text-primary-blue hover:bg-white px-8 h-14 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-1 shadow-gold hover:shadow-gold-glow group"
                    >
                      Schedule a Tour
                      <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-500 ease-out group-hover:translate-x-2" />
                    </Button>
                  </Link>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white hover:text-primary-blue px-8 h-14 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-1"
                >
                  <Phone className="w-4 h-4 mr-3" />
                  Call Us
                </Button>
              </div>
            </motion.div>

            {/* Bento Box Style Contact Card */}
            <motion.div 
              className="bg-white/5 backdrop-blur-md rounded-sm p-8 border border-white/10 ring-1 ring-inset ring-white/5 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-8">Get in Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold transition-colors duration-500 ease-out">
                    <Phone className="w-5 h-5 text-gold group-hover:text-primary-blue transition-colors duration-500 ease-out" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1">Direct Line</div>
                    <div className="text-white text-lg tracking-tight">(555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold transition-colors duration-500 ease-out">
                    <Mail className="w-5 h-5 text-gold group-hover:text-primary-blue transition-colors duration-500 ease-out" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1">Email Us</div>
                    <div className="text-white text-lg tracking-tight">hello@yellowstone.com</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold leading-relaxed">
                  Office Hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
