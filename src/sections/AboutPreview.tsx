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
    <section className="py-24 bg-white" ref={ref}>
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="relative">
                <img
                  src="/about-building.jpg"
                  alt="Yellowstone Asset Management Property"
                  className="w-full h-[500px] object-cover shadow-card"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-property.jpg';
                  }}
                />
                {/* Gold accent corner */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-gold" />
                <div className="absolute -top-4 -left-4 w-24 h-24 border-l-4 border-t-4 border-gold" />
              </div>
              
              {/* Stats Card Overlay */}
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-primary-blue text-white p-6 shadow-lg max-w-xs hidden md:block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Building2 className="w-8 h-8 text-gold mb-3" />
                <div className="text-3xl font-display font-bold mb-1">$1.2B+</div>
                <div className="text-white/70 text-sm">Assets Under Management</div>
              </motion.div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {/* Thin gold divider line above headline - per spec */}
              <div className="gold-divider mb-6" />
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-blue mb-6 leading-tight">
                A Legacy of Excellence in Property Management
              </h2>
              
              <p className="text-muted-blue text-lg leading-relaxed mb-6">
                For over two decades, Yellowstone Asset Management has set the standard 
                for professional property management. We combine institutional-grade 
                oversight with a genuine commitment to resident satisfaction.
              </p>
              
              <p className="text-muted-blue leading-relaxed mb-8">
                Our portfolio spans premier multifamily communities across 12 major markets, 
                representing over $1.2 billion in assets under management. We partner with 
                investors to maximize returns while delivering exceptional living experiences 
                that residents are proud to call home.
              </p>

              {/* Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <feature.icon className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary-blue text-sm">{feature.title}</h4>
                      <p className="text-muted-blue text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
                {['Certified Property Manager', 'REIT Experience', 'ESG Compliant'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-blue">
                    <CheckCircle className="w-4 h-4 text-gold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
