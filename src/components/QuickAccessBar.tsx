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
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mr-3"
                >
                  <div className="bg-primary-blue text-white text-xs px-3 py-2 rounded-sm whitespace-nowrap border border-gold/30">
                    <span className="font-semibold text-gold">{action.label}</span>
                    <span className="text-white/70 ml-1">{action.description}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Icon Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-11 h-11 rounded-sm flex items-center justify-center transition-all duration-300 ${
                hoveredIndex === index
                  ? 'bg-gold text-primary-blue'
                  : 'bg-primary-blue text-gold border border-gold/30'
              }`}
            >
              <action.icon className="w-4 h-4" strokeWidth={1.5} />
            </motion.div>
          </div>
        </Link>
      ))}

      {/* Decorative line */}
      <div className="w-px h-8 bg-gold/30 mx-auto mt-1" />
    </motion.div>
  );
}
