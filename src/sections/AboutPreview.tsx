import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Shield, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

export function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Shield, title: 'Institutional-Grade Oversight', desc: 'Rigorous asset management protocols' },
    { icon: TrendingUp, title: 'Proven Track Record', desc: '25+ years of consistent performance' },
    { icon: Users, title: 'Resident-First Approach', desc: 'Exceptional living experiences' },
    { icon: Award, title: 'Industry Recognition', desc: 'Multiple property management awards' },
  ];

  return (
    <section className="bg-white" ref={ref}>
      <div className="section-padding section-breathe max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-sm ring-1 ring-inset ring-black/5 border border-black/5 shadow-card">
              <img
                src="/about-building.jpg"
                alt="Yellowstone Asset Management Property"
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero-property.jpg';
                }}
              />
            </div>
            
            {/* Stats Card Overlay (Bento Box style) */}
            <motion.div 
              className="absolute -bottom-8 -right-8 bg-primary-blue text-white p-8 shadow-card border border-primary-blue ring-1 ring-inset ring-white/10 max-w-xs hidden md:block rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Building2 className="w-6 h-6 text-gold mb-6" strokeWidth={1.5} />
              <div className="text-4xl font-display font-medium mb-2 tracking-tighter">$1.2B+</div>
              <div className="text-white/70 text-xs uppercase tracking-widest font-bold">Assets Under Management</div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Institutional Eyebrow */}
            <div className="text-gold text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-4">
              <span>Firm Overview</span>
              <div className="h-px bg-gold/30 flex-1"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-blue mb-8 leading-[1.1] tracking-tighter">
              A Legacy of Excellence in Property Management
            </h2>
            
            <div className="space-y-6 text-muted-blue leading-relaxed mb-12">
              <p className="text-lg">
                For over two decades, Yellowstone Asset Management has set the standard 
                for professional property management. We combine institutional-grade 
                oversight with a genuine commitment to resident satisfaction.
              </p>
              
              <p>
                Our portfolio spans premier multifamily communities across 12 major markets, 
                representing over $1.2 billion in assets under management. We partner with 
                investors to maximize returns while delivering exceptional living experiences 
                that residents are proud to call home.
              </p>
            </div>

            {/* Feature Grid - Bento Style Alignment */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                >
                  <feature.icon className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-bold text-primary-blue text-sm mb-1 tracking-tight">{feature.title}</h4>
                    <p className="text-muted-blue text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-black/5">
              {['Certified Property Manager', 'REIT Experience', 'ESG Compliant'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary-blue/70">
                  <CheckCircle className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
