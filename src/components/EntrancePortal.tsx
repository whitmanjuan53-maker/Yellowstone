import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface EntrancePortalProps {
  onEnter: () => void;
}

export function EntrancePortal({ onEnter }: EntrancePortalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      onEnter();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {!isEntering ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-[#2B395F] overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(225, 184, 74, 0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            />
          </div>

          {/* Ambient Light Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isHovered 
                ? 'radial-gradient(circle at 50% 50%, rgba(225, 184, 74, 0.15) 0%, transparent 50%)'
                : 'radial-gradient(circle at 50% 50%, rgba(225, 184, 74, 0.05) 0%, transparent 40%)'
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Main Content Container */}
          <div 
            className="relative h-full flex flex-col items-center justify-center"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Logo and Title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-12 z-10"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <img 
                  src="/yellowstone-logo-icon.png" 
                  alt="Yellowstone" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-wide">
                YELLOWSTONE
              </h1>
              <p className="text-[#CFA54A] text-lg md:text-xl tracking-[0.3em] mt-2">
                ASSET MANAGEMENT
              </p>
            </motion.div>

            {/* Door Container */}
            <motion.div 
              className="relative w-[280px] h-[420px] md:w-[360px] md:h-[540px] cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleEnter}
              animate={{
                rotateX: mousePosition.y * 0.5,
                rotateY: mousePosition.x * 0.5,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Door Frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#3A4A70] to-[#2B395F] rounded-t-3xl shadow-2xl">
                <div className="absolute inset-2 border-2 border-[#CFA54A]/30 rounded-t-3xl" />
                <div className="absolute inset-4 border border-[#CFA54A]/20 rounded-t-3xl" />
              </div>

              {/* Light from Behind Doors */}
              <motion.div
                className="absolute inset-6 rounded-t-2xl overflow-hidden"
                animate={{
                  boxShadow: isHovered 
                    ? 'inset 0 0 100px rgba(225, 184, 74, 0.6), 0 0 80px rgba(225, 184, 74, 0.4)'
                    : 'inset 0 0 40px rgba(225, 184, 74, 0.2), 0 0 30px rgba(225, 184, 74, 0.1)'
                }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    opacity: isHovered ? 0.8 : 0.3,
                    scale: isHovered ? 1.2 : 1
                  }}
                  transition={{ duration: 1 }}
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(225, 184, 74, 0.8) 0%, rgba(225, 184, 74, 0.3) 40%, transparent 70%)'
                  }}
                />
              </motion.div>

              {/* Left Door */}
              <motion.div
                className="absolute left-0 top-0 w-1/2 h-full origin-left"
                animate={{ rotateY: isHovered ? -35 : 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2B395F] to-[#3A4A70] rounded-tl-2xl m-6 mr-0 border-r border-[#CFA54A]/20">
                  <div className="absolute inset-4 border border-[#CFA54A]/20 rounded-tl-xl" />
                  <div className="absolute inset-8 border border-[#CFA54A]/10 rounded-tl-lg" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-[#CFA54A] to-[#A8842E] rounded-full shadow-lg" />
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-[#CFA54A]/30 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border border-[#CFA54A]/40 rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Right Door */}
              <motion.div
                className="absolute right-0 top-0 w-1/2 h-full origin-right"
                animate={{ rotateY: isHovered ? 35 : 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-[#2B395F] to-[#3A4A70] rounded-tr-2xl m-6 ml-0 border-l border-[#CFA54A]/20">
                  <div className="absolute inset-4 border border-[#CFA54A]/20 rounded-tr-xl" />
                  <div className="absolute inset-8 border border-[#CFA54A]/10 rounded-tr-lg" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-[#CFA54A] to-[#A8842E] rounded-full shadow-lg" />
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-[#CFA54A]/30 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 border border-[#CFA54A]/40 rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Click Hint */}
              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.p
                  className="text-white/60 text-sm mb-2"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isHovered ? 'Click to enter' : 'Hover to peek inside'}
                </motion.p>
                <motion.div
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                  className="flex items-center justify-center gap-1 text-[#CFA54A]"
                >
                  <ChevronRight className="w-5 h-5" />
                  <ChevronRight className="w-5 h-5 -ml-3" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bottom Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute bottom-12 text-white/40 text-sm tracking-wider"
            >
              Premium Properties · Exceptional Living
            </motion.p>
          </div>
        </motion.div>
      ) : (
        /* Fly-through Animation */
        <motion.div
          className="fixed inset-0 z-[100] bg-[#2B395F]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: [1, 1.5, 3, 8],
              opacity: [1, 1, 0.5, 0]
            }}
            transition={{ 
              duration: 2.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, #CFA54A 0%, #E8C26A 20%, #2B395F 60%, #1a2340 100%)'
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 2, times: [0, 0.3, 1] }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-b from-transparent via-[#CFA54A]/60 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: '2px',
                  height: '100%',
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  y: ['-100%', '100%']
                }}
                transition={{
                  duration: 0.8,
                  delay: Math.random() * 0.5,
                  repeat: 2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
