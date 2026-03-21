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
    <section className="section-padding section-breathe bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Header */}
        <ScrollReveal>
          <div className="max-w-xl mb-12 lg:mb-16">
            <span className="text-gold text-xs tracking-widest uppercase font-bold">
              Why Yellowstone
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-blue mt-4 tracking-tighter">
              Why Rent With Yellowstone?
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 0.1}>
              <div
                className="group bg-white p-6 sm:p-8 lg:p-10 h-full border border-black/5 ring-1 ring-inset ring-black/5 shadow-card hover:shadow-card-hover rounded-sm overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1 relative"
              >
                {/* Border Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
                
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6 bg-gold/10 rounded-sm text-gold group-hover:bg-gold group-hover:text-primary-blue transition-colors duration-500 ease-out"
                >
                  <benefit.icon
                    className="w-6 h-6"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-primary-blue text-xl mb-3 tracking-tighter group-hover:text-gold transition-colors duration-500 ease-out">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-blue text-sm leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
