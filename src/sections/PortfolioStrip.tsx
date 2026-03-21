import { Link } from 'react-router-dom';
import { MapPin, Bed, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { properties } from '@/data/properties';

const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

export function PortfolioStrip() {
  return (
    <section className="section-padding section-breathe bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <span className="text-gold text-xs tracking-widest uppercase font-bold">
                Featured Communities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-blue mt-4 tracking-tighter">
                Explore Our Communities
              </h2>
            </div>
            <Link to="/properties" className="hidden lg:block">
              <Button
                variant="outline"
                className="border border-primary-blue/20 text-primary-blue hover:bg-primary-blue hover:text-white hover:border-primary-blue font-bold tracking-widest uppercase text-xs px-8 py-6 rounded-sm transition-all duration-500 ease-out group"
              >
                View All Communities
                <ArrowRight className="w-4 h-4 ml-3 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-out" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((property, index) => (
            <ScrollReveal key={property.id} delay={index * 0.12}>
              <div
                className="group bg-white overflow-hidden flex flex-col h-full border border-black/5 ring-1 ring-inset ring-black/5 shadow-card hover:shadow-card-hover rounded-sm transition-all duration-500 ease-out hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={property.heroImage}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-blue/0 group-hover:bg-primary-blue/10 transition-colors duration-500 ease-out" />

                  {/* Starting price badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 border border-black/5 shadow-sm rounded-sm">
                    <span className="text-primary-blue font-bold text-sm tracking-tighter">
                      ${property.priceRange.min}
                    </span>
                    <span className="text-muted-blue text-xs uppercase tracking-widest ml-1 font-semibold">
                      /mo
                    </span>
                  </div>
                  
                  {/* Status Badge */}
                  {property.availabilityStatus === 'available' ? (
                     <div className="absolute top-4 left-4 bg-gold px-3 py-1.5 rounded-sm shadow-sm">
                        <span className="text-primary-blue text-[10px] font-bold tracking-widest uppercase">Available</span>
                     </div>
                  ) : (
                     <div className="absolute top-4 left-4 bg-primary-blue px-3 py-1.5 rounded-sm shadow-sm">
                        <span className="text-white text-[10px] font-bold tracking-widest uppercase">Coming Soon</span>
                     </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  {/* Name */}
                  <h3 className="text-2xl font-display font-bold text-primary-blue mb-2 tracking-tighter group-hover:text-gold transition-colors duration-500 ease-out">
                    {property.name}
                  </h3>

                  {/* Location & Details - Bento Box internal layout */}
                  <div className="flex flex-col gap-3 py-4 my-2 border-y border-black/5 flex-1">
                      <div className="flex items-center gap-3 text-muted-blue">
                        <div className="w-8 h-8 rounded-sm bg-slate-50 flex items-center justify-center border border-black/5">
                            <MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-medium">
                          {property.city}, {property.state}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-muted-blue">
                         <div className="w-8 h-8 rounded-sm bg-slate-50 flex items-center justify-center border border-black/5">
                            <Bed className="w-4 h-4 text-gold" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-medium">
                          {property.floorPlans && property.floorPlans.length > 0
                            ? `${Math.min(...property.floorPlans.map((f) => f.bedrooms))}–${Math.max(...property.floorPlans.map((f) => f.bedrooms))} Bedrooms`
                            : `${property.bedrooms} Bedrooms`}
                        </span>
                      </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-4 pt-2">
                    <Link to={`/properties/${property.slug}`} className="w-full">
                      <Button
                        className="w-full bg-primary-blue text-white hover:bg-gold hover:text-primary-blue font-bold tracking-widest uppercase text-xs py-5 rounded-sm transition-all duration-500 ease-out"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center lg:hidden">
          <Link to="/properties">
            <Button
              variant="outline"
              className="w-full border border-primary-blue/20 text-primary-blue hover:bg-primary-blue hover:text-white font-bold tracking-widest uppercase text-xs px-8 py-6 rounded-sm transition-all duration-500 ease-out"
            >
              View All Communities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
