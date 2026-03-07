import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, FileText, MessageCircle } from 'lucide-react';

const actions = [
  {
    icon: Home,
    label: 'Browse Communities',
    path: '/properties',
  },
  {
    icon: Calendar,
    label: 'Schedule a Tour',
    path: '/tour',
  },
  {
    icon: FileText,
    label: 'Apply Online',
    path: '/contact',
  },
  {
    icon: MessageCircle,
    label: 'Ask a Question',
    path: '/contact',
  },
];

export function HubGrid() {
  return (
    <section
      className="w-full"
      style={{ background: 'var(--secondary-blue)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 overflow-hidden">
          {actions.map((action, index) => (
            <Link key={action.label} to={action.path} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center justify-center gap-2 lg:gap-3 py-5 sm:py-7 px-3 sm:px-6 text-center cursor-pointer transition-all duration-300 group-hover:bg-white/5 min-h-[100px] sm:min-h-0"
                style={{ borderBottom: 'none' }}
              >
                {/* Gold icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-sm transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(207, 165, 74, 0.15)' }}
                >
                  <action.icon
                    className="w-5 h-5 transition-colors duration-300"
                    style={{ color: 'var(--gold)' }}
                    strokeWidth={1.75}
                  />
                </div>

                {/* Label */}
                <span className="text-white text-xs sm:text-sm font-semibold tracking-wide leading-tight group-hover:text-gold transition-colors duration-300"
                  style={{ color: 'rgba(255,255,255,0.92)' }}
                >
                  {action.label}
                </span>

                {/* Gold underline on hover */}
                <span
                  className="block h-px w-0 group-hover:w-8 transition-all duration-300"
                  style={{ background: 'var(--gold)' }}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
