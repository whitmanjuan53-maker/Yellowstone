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
    <section className="w-full bg-secondary-blue">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 overflow-hidden border-y border-white/10">
          {actions.map((action, index) => (
            <Link key={action.label} to={action.path} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-4 py-8 px-4 sm:px-8 text-center cursor-pointer transition-all duration-500 ease-out hover:bg-white/5 min-h-[120px]"
              >
                {/* Gold icon container */}
                <div className="w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-500 ease-out bg-gold/10 group-hover:bg-gold/20 group-hover:-translate-y-1">
                  <action.icon
                    className="w-5 h-5 text-gold transition-colors duration-500 ease-out group-hover:text-white"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Label */}
                <span className="text-white/90 text-xs uppercase font-bold tracking-widest leading-tight group-hover:text-gold transition-colors duration-500 ease-out">
                  {action.label}
                </span>

                {/* Gold underline on hover */}
                <span className="block h-[2px] w-0 group-hover:w-8 bg-gold transition-all duration-500 ease-out" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
