import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const footerLinks = {
  communities: [
    { label: 'View All Communities', path: '/properties' },
    { label: 'The French Quarter', path: '/properties' },
    { label: 'Royal Oak Apartments', path: '/properties' },
    { label: 'Available Units', path: '/properties' },
  ],
  residents: [
    { label: 'Resident Portal', path: '/residents' },
    { label: 'Pay Rent', path: '/residents' },
    { label: 'Maintenance Request', path: '/residents' },
    { label: 'Lease Information', path: '/residents' },
  ],
  leasing: [
    { label: 'Schedule a Tour', path: '/contact' },
    { label: 'Apply Online', path: '/contact' },
    { label: 'Pricing & Availability', path: '/properties' },
    { label: 'Floor Plans', path: '/floor-plans' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary-blue border-t border-gold/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
        {/* Brand Block */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="/yellowstone-logo-icon.png" 
                alt="Yellowstone" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h2 className="font-display font-bold text-white text-2xl tracking-tight leading-none">
                  YELLOWSTONE
                </h2>
                <p className="text-gold/70 text-[0.65rem] tracking-[0.32em] uppercase mt-1">
                  Asset Management
                </p>
              </div>
            </div>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed">
              Professionally managed communities built for comfort, convenience,
              and long-term living.
            </p>
            <div className="w-12 h-px bg-gold mt-5" />
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/properties"
              className="text-xs font-bold tracking-widest uppercase px-6 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-primary-blue transition-all duration-500 ease-out rounded-sm"
            >
              View Communities
            </Link>
            <Link
              to="/contact"
              className="text-xs font-bold tracking-widest uppercase px-6 py-4 bg-gold text-primary-blue hover:bg-white transition-all duration-500 ease-out shadow-gold hover:shadow-gold-glow hover:-translate-y-1 rounded-sm"
            >
              Schedule Tour
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-8">
          {/* Communities */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5">
              Communities
            </h3>
            <ul className="space-y-3">
              {footerLinks.communities.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/55 hover:text-gold text-sm transition-colors duration-500 ease-out inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Residents */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5">
              Residents
            </h3>
            <ul className="space-y-3">
              {footerLinks.residents.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/55 hover:text-gold text-sm transition-colors duration-500 ease-out inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Leasing */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5">
              Leasing
            </h3>
            <ul className="space-y-3">
              {footerLinks.leasing.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/55 hover:text-gold text-sm transition-colors duration-500 ease-out inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-gold/60 mt-0.5 shrink-0" />
                <span className="text-white/55 text-sm">
                  Alvin, TX &amp; Surrounding Areas
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                <a
                  href="tel:+17135551234"
                  className="text-white/55 hover:text-gold text-sm transition-colors duration-500 ease-out"
                >
                  (713) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                <a
                  href="mailto:info@yellowstone.com"
                  className="text-white/55 hover:text-gold text-sm transition-colors duration-500 ease-out"
                >
                  info@yellowstone.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-3.5 h-3.5 text-gold/60 mt-0.5 shrink-0" />
                <span className="text-white/55 text-sm">
                  Mon–Fri: 9am–6pm
                  <br />
                  Sat: 10am–4pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 pt-6 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs tracking-wider uppercase">
            Serving Alvin, TX &amp; Surrounding Communities
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold tracking-widest uppercase text-white/30">
            <p className="tracking-widest">
              © 2026 Yellowstone
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link to="/privacy" className="hover:text-gold transition-colors duration-500 ease-out">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-gold transition-colors duration-500 ease-out">
                Terms
              </Link>
              <Link to="/fair-housing" className="hover:text-gold transition-colors duration-500 ease-out">
                Fair Housing
              </Link>
              <Link to="/accessibility" className="hover:text-gold transition-colors duration-500 ease-out">
                ADA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
