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
    <section className="bg-primary-blue relative overflow-hidden" ref={ref}>
      <div className="section-padding section-breathe max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6 flex items-center justify-center gap-4 w-full">
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
            <Handshake className="w-4 h-4" strokeWidth={1.5} />
            <span>Investment Opportunities</span>
            <div className="h-px bg-gold/30 flex-1 max-w-[100px]"></div>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tighter leading-tight">
            Partner With <span className="text-gold">Yellowstone</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Join institutional investors who trust Yellowstone Asset Management 
            to deliver superior risk-adjusted returns through professional multifamily management.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="text-center p-8 rounded-sm bg-white/5 border border-white/10 ring-1 ring-inset ring-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-500 ease-out flex flex-col items-center group cursor-default"
            >
              <stat.icon className="w-6 h-6 text-gold mb-6 group-hover:scale-110 transition-transform duration-500 ease-out" strokeWidth={1.5} />
              <div className="text-4xl md:text-5xl font-display font-medium text-white mb-3 tracking-tighter">{stat.value}</div>
              <div className="text-white/60 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="flex items-start gap-6 p-8 rounded-sm bg-white/5 border border-white/10 ring-1 ring-inset ring-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-500 ease-out group cursor-default"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            >
              <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-500 ease-out">
                <benefit.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <div className="pt-1">
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button 
            size="lg"
            className="bg-gold text-primary-blue hover:bg-white px-8 h-14 font-bold tracking-widest uppercase text-xs transition-all duration-500 ease-out hover:-translate-y-1 shadow-gold hover:shadow-gold-glow group"
          >
            Schedule Investor Meeting
            <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-500 ease-out group-hover:translate-x-2" />
          </Button>
          <p className="text-white/50 text-xs uppercase tracking-widest font-bold mt-8">
            Confidential consultations available for qualified investors
          </p>
        </motion.div>
      </div>
    </section>
  );
}
