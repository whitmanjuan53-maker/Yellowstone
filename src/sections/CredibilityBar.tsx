import { ScrollReveal } from '@/components/ScrollReveal';

const stats = [
  { value: '2,500+', label: 'Units Under Management' },
  { value: '94%', label: 'Average Occupancy Rate' },
  { value: '12', label: 'Markets Nationwide' },
  { value: '25+', label: 'Years of Experience' },
];

export function CredibilityBar() {
  return (
    <section className="py-20 bg-secondary-blue">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center lg:text-left lg:pl-8 lg:border-l lg:border-gold/30 first:pl-0 first:border-l-0">
                <div className="text-4xl lg:text-5xl font-display font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
