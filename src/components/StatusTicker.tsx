import { motion } from 'framer-motion';

const tickerItems = [
  { label: 'Managed Units', value: '2,500+' },
  { label: 'Current Availability', value: '156' },
  { label: 'Properties', value: '18' },
  { label: 'Cities', value: '12' },
  { label: 'Now Leasing in Houston, TX', value: 'Active', highlight: true },
];

export function StatusTicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-secondary-blue border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-center md:justify-start h-12 overflow-hidden">
          <div className="flex items-center gap-8 md:gap-12">
            {tickerItems.map((item, index) => (
              <div key={item.label} className="flex items-center gap-2 shrink-0">
                <span className="text-white/60 text-xs uppercase tracking-wider hidden sm:inline">
                  {item.label}:
                </span>
                <span className={`text-sm font-semibold ${item.highlight ? 'text-gold' : 'text-white'}`}>
                  {item.value}
                </span>
                {index < tickerItems.length - 1 && (
                  <span className="text-gold/40 ml-4 hidden md:inline">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
