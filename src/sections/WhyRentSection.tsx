import { motion } from 'framer-motion';
import { Wrench, MapPin, PawPrint, Smartphone } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';

const benefits = [
  {
    icon: Wrench,
    title: 'Responsive Maintenance',
    description:
      'Fast, professional service when you need it. Submit requests online and track status in real time.',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description:
      'Convenient access to schools, shopping, dining, and work — in communities you actually want to live in.',
  },
  {
    icon: PawPrint,
    title: 'Pet-Friendly Living',
    description:
      'Comfort and space for every member of your household, four-legged ones included.',
  },
  {
    icon: Smartphone,
    title: 'Easy Online Portal',
    description:
      'Pay rent, submit maintenance requests, and manage your lease anytime — from any device.',
  },
];

export function WhyRentSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-xl mb-10 lg:mb-14">
            <span className="text-gold text-xs tracking-[0.2em] uppercase font-semibold">
              Why Yellowstone
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-bold text-primary-blue mt-3">
              Why Rent With Yellowstone?
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group bg-white p-5 sm:p-6 lg:p-7 h-full"
                style={{
                  borderTop: '3px solid var(--gold)',
                  boxShadow: '0 2px 12px rgba(43, 57, 95, 0.07)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 28px rgba(43, 57, 95, 0.14)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 2px 12px rgba(43, 57, 95, 0.07)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ background: 'rgba(207, 165, 74, 0.12)' }}
                >
                  <benefit.icon
                    className="w-5 h-5"
                    style={{ color: 'var(--gold)' }}
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-primary-blue text-lg mb-2.5 leading-snug">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-blue text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
