import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  Home, 
  FileText, 
  ArrowRight, 
  CheckCircle2,
  Building2,
  DollarSign,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollReveal } from '@/components/ScrollReveal';

const performanceMetrics = [
  { value: '2,500+', label: 'Units Managed' },
  { value: '94%', label: 'Average Occupancy' },
  { value: '12', label: 'Markets Served' },
  { value: '25+', label: 'Years Experience' },
];

const managementPhilosophy = [
  'Operational efficiency across all assets',
  'Disciplined cost control and budget management',
  'Proactive vacancy reduction strategies',
  'Strategic market positioning analysis',
  'Resident retention programs',
  'Long-term asset preservation protocols',
];

const services = [
  {
    icon: Shield,
    title: 'Asset Oversight',
    description: 'Comprehensive property monitoring, performance tracking, and strategic planning to protect and enhance asset value.',
  },
  {
    icon: DollarSign,
    title: 'Leasing & Revenue Management',
    description: 'Market-responsive pricing strategies, tenant screening, and lease administration to maximize income potential.',
  },
  {
    icon: Home,
    title: 'Maintenance & CapEx Coordination',
    description: 'Preventive maintenance programs, capital improvement planning, and vendor management for operational efficiency.',
  },
  {
    icon: FileText,
    title: 'Financial Reporting & Transparency',
    description: 'Detailed monthly statements, annual budget planning, and open communication on all financial matters.',
  },
];

export function InvestorsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    propertyType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Executive */}
      <section className="relative min-h-[55vh] flex items-center pt-24">
        <div className="absolute inset-0">
          <img
            src="/hero-property.jpg"
            alt="Property Management"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'rgba(43, 57, 95, 0.85)' }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-16">
          <ScrollReveal>
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
              Institutional Asset Management
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4 mb-4">
              Investor Relations
            </h1>
            <p className="text-xl text-gold font-display mb-6">
              Strategic Property Management & Asset Performance Oversight
            </p>
            <p className="text-white/75 max-w-2xl leading-relaxed mb-10">
              We provide structured operational management, disciplined cost control, and long-term value positioning across every asset we manage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="#services">
                <Button className="btn-premium bg-gold text-primary-blue hover:bg-gold-dark font-semibold px-8 h-12">
                  Management Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="#inquiry">
                <Button 
                  variant="outline" 
                  className="h-12 px-8 border border-gold text-gold hover:bg-gold hover:text-primary-blue font-semibold bg-transparent transition-all duration-300"
                >
                  Acquisition Inquiry
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Management Philosophy */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="executive-divider mb-16">
            <div className="executive-divider-diamond" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                Our Framework
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-4 mb-6">
                Our Approach
              </h2>
              <p className="text-muted-blue leading-relaxed mb-6">
                Yellowstone Asset Management operates on a foundation of operational discipline and strategic oversight. We understand that each asset represents significant capital commitment, and we treat that responsibility with the seriousness it demands.
              </p>
              <p className="text-muted-blue leading-relaxed">
                Our management philosophy centers on measurable outcomes, transparent communication, and proactive stewardship. We don't just maintain properties—we actively position them for sustained performance in changing market conditions.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-background p-8 rounded-sm">
                <h3 className="font-display font-bold text-primary-blue text-lg mb-6">
                  Core Operational Principles
                </h3>
                <ul className="space-y-4">
                  {managementPhilosophy.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <span className="text-primary-blue">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Performance Snapshot Strip */}
      <section className="py-16 bg-secondary-blue">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, index) => (
              <ScrollReveal key={metric.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">
                    {metric.value}
                  </div>
                  <div className="text-white/60 text-sm tracking-wide uppercase">
                    {metric.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown Grid */}
      <section id="services" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                Full-Service Management
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-4">
                Services Overview
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="card-premium bg-white p-8 border-t-4 border-gold"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center mb-6">
                    <service.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-primary-blue mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-blue leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Acquisition & Partnership Section */}
      <section id="inquiry" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                Partnership Opportunities
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-4 mb-6">
                Partner With Yellowstone
              </h2>
              <p className="text-muted-blue leading-relaxed mb-6">
                We selectively partner with owners seeking disciplined management and long-term portfolio growth. Our approach is collaborative, transparent, and focused on shared success metrics.
              </p>
              <p className="text-muted-blue leading-relaxed mb-8">
                Whether you're an institutional investor, private equity firm, or individual property owner, we offer the operational expertise and market insight necessary to maximize your asset's potential.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gold" />
                  <span className="text-primary-blue">Multi-family residential portfolios</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <span className="text-primary-blue">Value-add opportunity assets</span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-gold" />
                  <span className="text-primary-blue">Stabilized income properties</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <form onSubmit={handleSubmit} className="bg-background p-8 rounded-sm">
                <h3 className="font-display font-bold text-primary-blue text-xl mb-6">
                  Acquisition Inquiry
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12 border-2 border-gray-200 focus:border-gold bg-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="h-12 border-2 border-gray-200 focus:border-gold bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 border-2 border-gray-200 focus:border-gold bg-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                      className="w-full h-12 px-4 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none bg-white text-primary-blue"
                    >
                      <option value="">Select type</option>
                      <option value="multifamily">Multi-Family</option>
                      <option value="mixeduse">Mixed-Use</option>
                      <option value="student">Student Housing</option>
                      <option value="senior">Senior Living</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-blue mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-sm focus:border-gold focus:outline-none resize-none bg-white"
                      placeholder="Tell us about your portfolio or inquiry..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full btn-premium bg-gold text-primary-blue hover:bg-gold-dark font-semibold h-12"
                  >
                    Submit Inquiry
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
