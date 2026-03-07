import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/properties', label: 'View Properties' },
    { path: '/tour', label: 'Tour Now' },
    { path: '/residents', label: 'Residents' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isHomePage = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-primary-blue shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 sm:gap-4">
              <img 
                src="/yellowstone-logo-icon.png" 
                alt="Yellowstone" 
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain drop-shadow-lg"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-white text-xl sm:text-2xl lg:text-3xl tracking-tight leading-none drop-shadow-md">
                  YELLOWSTONE
                </span>
                <span className="text-white text-[0.65rem] sm:text-xs lg:text-sm tracking-[0.25em] uppercase font-bold mt-1 drop-shadow-md" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  Asset Management
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide pb-1 transition-colors nav-link-premium ${
                    isActive(link.path)
                      ? 'text-gold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-gold" />
                  )}
                </Link>
              ))}
            </div>

            {/* Apply CTA — gold */}
            <div className="hidden lg:flex items-center">
              <Link to="/contact">
                <Button
                  size="sm"
                  className="bg-gold text-primary-blue hover:bg-gold-light font-semibold px-6 h-10 text-sm transition-all duration-300"
                >
                  Apply
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors -mr-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-primary-blue/95 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 bottom-0 w-[280px] sm:w-72 bg-primary-blue border-l border-white/10"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                <div className="mb-8 flex items-center gap-4">
                  <img 
                    src="/yellowstone-logo-icon.png" 
                    alt="Yellowstone" 
                    className="w-14 h-14 object-contain"
                  />
                  <div>
                    <span className="font-display font-bold text-white text-2xl tracking-tight block">
                      YELLOWSTONE
                    </span>
                    <span className="text-white text-xs tracking-[0.25em] uppercase font-bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                      Asset Management
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-3.5 text-base font-medium border-b border-white/10 transition-colors ${
                          isActive(link.path)
                            ? 'text-gold'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gold text-primary-blue hover:bg-gold-light font-semibold h-12 mt-4">
                    Apply Online
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
