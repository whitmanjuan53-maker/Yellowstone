import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, User, Phone } from 'lucide-react';

const quickActions = [
  { icon: FileText, label: 'Apply', path: '/apply', description: 'Submit Application' },
  { icon: Calendar, label: 'Tour', path: '/properties', description: 'Schedule Tour' },
  { icon: User, label: 'Resident', path: '/residents', description: 'Resident Login' },
  { icon: Phone, label: 'Contact', path: '/contact', description: 'Get in Touch' },
];

export function QuickAccessBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
    >
      {quickActions.map((action, index) => (
        <Link
          key={action.label}
          to={action.path}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex items-center justify-end">
            {/* Expanded Label */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, x: 10, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: 10, width: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden mr-3"
                >
                  <div className="bg-primary-blue text-white text-xs px-4 py-3 rounded-sm whitespace-nowrap border border-black/5 shadow-card tracking-widest uppercase">
                    <span className="font-bold text-gold">{action.label}</span>
                    <span className="text-white/70 ml-2 font-medium">{action.description}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Icon Button */}
            <div
              className={`w-12 h-12 rounded-sm flex items-center justify-center transition-all duration-500 ease-out shadow-card hover:-translate-x-1 ${
                hoveredIndex === index
                  ? 'bg-gold text-primary-blue ring-1 ring-inset ring-black/5'
                  : 'bg-primary-blue text-gold border border-gold/30 ring-1 ring-inset ring-white/5'
              }`}
            >
              <action.icon className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </div>
        </Link>
      ))}

      {/* Decorative line */}
      <div className="w-px h-8 bg-gold/30 mx-auto mt-1" />
    </motion.div>
  );
}
