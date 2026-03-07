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
    <section ref={sectionRef} className="section-padding py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-700 dark:from-[#0a1628] dark:to-[#0d1d30] p-10 md:p-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(225, 184, 74, 0.5) 1px, transparent 0)`,
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

          {/* Floating Orbs */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-[#E1B84A]/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Ready to Find Your <span className="text-[#E1B84A]">Perfect Home?</span>
              </motion.h2>
              <motion.p 
                className="text-white/80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Let our team of experts guide you through the process. Schedule a tour 
                today and experience luxury living firsthand.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {onScheduleTour ? (
                  <Button
                    size="lg"
                    onClick={onScheduleTour}
                    className="bg-[#E1B84A] text-[#0B2F5B] hover:bg-[#F0C85A] font-semibold shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Tour
                  </Button>
                ) : (
                  <Link to="/properties">
                    <Button
                      size="lg"
                      className="bg-[#E1B84A] text-[#0B2F5B] hover:bg-[#F0C85A] font-semibold shadow-glow transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Schedule a Tour
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-3 text-white/80"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#E1B84A]" />
                  </div>
                  <span>(555) 123-4567</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-white/80"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#E1B84A]" />
                  </div>
                  <span>hello@yellowstone.com</span>
                </motion.div>
              </div>
              <motion.div 
                className="mt-6 pt-6 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <p className="text-white/60 text-sm">
                  Office Hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
