import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Clock, 
  ArrowRight,
  Users,
  Home,
  Leaf,
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe strong communities are built on respect, consistency, and genuine care for the people who live there.',
  },
  {
    icon: Shield,
    title: 'Operational Integrity',
    description: 'Every action we take is guided by honesty, transparency, and a commitment to doing what is right.',
  },
  {
    icon: Clock,
    title: 'Long-Term Stewardship',
    description: 'We manage properties not for quick returns, but for sustained value and lasting community health.',
  },
  {
    icon: Home,
    title: 'Family-Friendly Living',
    description: 'Our properties are designed and maintained with families in mind—safe, welcoming, and comfortable.',
  },
];

const residentExpectations = [
  'Responsive maintenance and timely repairs',
  'Safe, clean, and well-maintained communities',
  'Transparent communication and clear policies',
  'Respectful, professional management staff',
  'Pet-friendly policies where possible',
  'Consistent care across all touchpoints',
];

const testimonials = [
  {
    quote: "Yellowstone has managed our community for five years. The consistency and care they bring is exactly what we needed.",
    author: "Resident, The French Quarter",
  },
  {
    quote: "Finally, a management company that actually listens to residents and follows through.",
    author: "Resident, Royal Oak Apartments",
  },
  {
    quote: "They treat this place like it's their own home. That makes all the difference.",
    author: "Resident, Skyline Tower",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Warm & Welcoming */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center pt-20 sm:pt-24">
        <div className="absolute inset-0">
          <img
            src="/lifestyle-community.jpg"
            alt="Community"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'rgba(43, 57, 95, 0.75)' }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
          <ScrollReveal>
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
              Our Commitment
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4 mb-4">
              Building Communities.
              <br className="hidden sm:block" />
              Managing with Care.
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-2xl leading-relaxed mb-6 sm:mb-10">
              Family-focused residential property management rooted in long-term relationships and community well-being.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link to="/properties">
                <Button className="btn-premium bg-gold text-primary-blue hover:bg-gold-dark font-semibold px-8 h-12">
                  Explore Our Communities
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  className="h-12 px-8 border border-white/40 text-white hover:bg-white hover:text-primary-blue font-semibold bg-transparent transition-all duration-300"
                >
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="executive-divider mb-16">
            <div className="executive-divider-diamond" />
          </div>
          
          <ScrollReveal>
            <div className="text-center">
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-4 mb-6 sm:mb-8">
                Our Story
              </h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="space-y-4 sm:space-y-6 text-muted-blue leading-relaxed text-base sm:text-lg">
              <p>
                Yellowstone Asset Management began with a simple belief: that property management should be about people first, and properties second. Founded by professionals with deep roots in the communities we serve, we set out to build something different—a management company that treats residents as neighbors and properties as homes.
              </p>
              <p>
                Over the years, that philosophy has guided everything we do. We have grown from a small local operation to managing thousands of homes across multiple markets, but our core approach remains unchanged. We prioritize long-term relationships over quick transactions, community stability over rapid turnover, and genuine care over corporate efficiency metrics.
              </p>
              <p>
                Our team understands that when families choose one of our properties, they are not just renting an apartment—they are choosing a place to build their lives. That is a responsibility we take seriously. From responsive maintenance to transparent communication, we work every day to earn the trust placed in us.
              </p>
              <p>
                Today, Yellowstone Asset Management stands as a stable, community-focused partner for both residents and property owners. We are proud of the communities we have helped build and the relationships we have sustained over the years. And we remain committed to the simple principle that started it all: manage with care, treat people with respect, and build communities that last.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                What Guides Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-4">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 sm:p-8 rounded-sm text-center h-full"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-primary-blue mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-blue text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Residents Can Expect */}
      <section className="py-12 sm:py-20 lg:py-28 bg-secondary-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal>
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                The Resident Experience
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mt-4 mb-6">
                What Residents Can Expect
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We believe that quality property management comes down to consistent execution on the fundamentals. Here is what every resident can count on when they choose a Yellowstone-managed community.
              </p>
              
              <ul className="space-y-4">
                {residentExpectations.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-sm mt-8 lg:mt-0">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-gold" />
                  <span className="text-white font-semibold">Resident-Focused Approach</span>
                </div>
                <p className="text-white/70 leading-relaxed mb-6">
                  We understand that our success is directly tied to resident satisfaction. That is why we prioritize responsive service, maintain open lines of communication, and work continuously to improve the living experience in every community we manage.
                </p>
                <div className="flex items-center gap-3">
                  <Leaf className="w-6 h-6 text-gold" />
                  <span className="text-white font-semibold">Sustainable Communities</span>
                </div>
                <p className="text-white/70 leading-relaxed mt-3">
                  We invest in sustainable practices and long-term property improvements that benefit both residents and the environment, ensuring our communities remain vibrant for years to come.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">
                Resident Voices
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mt-4">
                Community Feedback
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-background p-6 sm:p-8 rounded-sm relative">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-gold/30 absolute top-4 left-4 sm:top-6 sm:left-6" />
                  <p className="text-primary-blue leading-relaxed relative z-10 pt-6 sm:pt-8 mb-4 sm:mb-6 italic text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-muted-blue text-xs sm:text-sm">
                    — {testimonial.author}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <ScrollReveal>
            <div className="executive-divider mb-12">
              <div className="executive-divider-diamond" />
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-blue mb-6">
              More Than Management
            </h2>
            <p className="text-muted-blue text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              At Yellowstone Asset Management, we believe strong communities begin with consistent care, clear communication, and a commitment to the families who call our properties home. We are not just managing buildings—we are helping build neighborhoods where people want to stay.
            </p>
            <Link to="/properties">
              <Button className="btn-premium bg-gold text-primary-blue hover:bg-gold-dark font-semibold px-10 h-12">
                View Our Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
