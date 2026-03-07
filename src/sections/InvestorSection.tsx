import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, BarChart3, Handshake, ArrowRight, Building2, DollarSign, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InvestorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Superior Returns',
      description: 'Consistent outperformance through disciplined asset management and value-add strategies.'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Comprehensive due diligence and proactive management to protect your investment.'
    },
    {
      icon: BarChart3,
      title: 'Transparent Reporting',
      description: 'Real-time access to performance metrics and detailed financial reporting.'
    },
    {
      icon: Target,
      title: 'Strategic Growth',
      description: 'Targeted acquisitions in high-growth markets with strong fundamentals.'
    },
  ];

  const stats = [
    { value: '18%', label: 'Average IRR', icon: DollarSign },
    { value: '94%', label: 'Occupancy Rate', icon: Building2 },
    { value: '25+', label: 'Years Experience', icon: Shield },
  ];

  return (
    <section className="py-24 bg-primary-blue" ref={ref}>
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm mb-6 border border-gold/30">
              <Handshake className="w-4 h-4 text-gold" />
              <span className="text-white/80 text-sm font-medium tracking-wide">Investment Opportunities</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
              Partner With <span className="text-gold">Yellowstone</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Join institutional investors who trust Yellowstone Asset Management 
              to deliver superior risk-adjusted returns through professional multifamily management.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="text-center p-8 bg-white/5 border border-white/10 hover:border-gold/50 transition-colors duration-300"
              >
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex gap-4 p-6 bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-300 group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-white/60 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button 
              size="lg"
              className="bg-gold text-primary-blue hover:bg-gold-dark px-10 h-14 font-semibold text-lg shadow-gold hover:shadow-lg transition-all duration-300 hover:-translate-y-1 tracking-wide"
            >
              Schedule Investor Meeting
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-white/50 text-sm mt-4">
              Confidential consultations available for qualified investors
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
