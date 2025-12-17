import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Floating Cross Component
const FloatingCross = ({ 
  size, 
  delay, 
  duration, 
  left, 
  top 
}: { 
  size: number; 
  delay: number; 
  duration: number; 
  left: string; 
  top: string; 
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left, top }}
    initial={{ opacity: 0, scale: 0, rotate: -15 }}
    animate={{ 
      opacity: [0, 0.6, 0.4, 0.6, 0],
      scale: [0.5, 1, 1, 1, 0.5],
      rotate: [0, 5, -5, 5, 0],
      y: [0, -30, -60, -30, 0],
    }}
    transition={{ 
      delay, 
      duration, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none"
      className="drop-shadow-[0_0_15px_rgba(218,165,32,0.5)]"
    >
      {/* Cross with glow */}
      <path 
        d="M20 4V36M12 12H28" 
        stroke="url(#crossGradient)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" />
          <stop offset="50%" stopColor="hsl(51, 100%, 70%)" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

// Divine Light Ray Component
const LightRay = ({ 
  angle, 
  delay, 
  width 
}: { 
  angle: number; 
  delay: number; 
  width: number;
}) => (
  <motion.div
    className="absolute top-0 left-1/2 origin-top pointer-events-none"
    style={{
      transform: `translateX(-50%) rotate(${angle}deg)`,
      width: `${width}px`,
      height: '120vh',
    }}
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0.15, 0.08, 0.15, 0],
    }}
    transition={{
      delay,
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div 
      className="w-full h-full"
      style={{
        background: `linear-gradient(180deg, 
          hsl(var(--accent) / 0.4) 0%, 
          hsl(51, 100%, 70% / 0.2) 30%, 
          transparent 100%
        )`,
        filter: 'blur(20px)',
      }}
    />
  </motion.div>
);

// Particle/Star Component
const CelestialParticle = ({ 
  left, 
  top, 
  delay, 
  size 
}: { 
  left: string; 
  top: string; 
  delay: number; 
  size: number; 
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left,
      top,
      width: size,
      height: size,
      background: 'radial-gradient(circle, hsl(51, 100%, 80%) 0%, hsl(var(--accent)) 50%, transparent 100%)',
      boxShadow: `0 0 ${size * 2}px hsl(var(--accent)), 0 0 ${size * 4}px hsl(var(--accent) / 0.5)`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0.5, 1, 0],
      scale: [0, 1.2, 0.8, 1.2, 0],
    }}
    transition={{
      delay,
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Central Divine Glow
const DivineGlow = () => (
  <motion.div
    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
  >
    <motion.div
      className="absolute inset-0"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        background: `radial-gradient(ellipse at center top, 
          hsl(var(--accent) / 0.25) 0%, 
          hsl(51, 100%, 70% / 0.1) 30%,
          transparent 70%
        )`,
        filter: 'blur(40px)',
      }}
    />
  </motion.div>
);

// Ascending Orbs
const AscendingOrb = ({ 
  left, 
  delay, 
  size 
}: { 
  left: string; 
  delay: number; 
  size: number; 
}) => (
  <motion.div
    className="absolute bottom-0 pointer-events-none"
    style={{ left }}
    initial={{ opacity: 0, y: 100 }}
    animate={{
      opacity: [0, 0.6, 0.4, 0.2, 0],
      y: [100, 0, -200, -400, -600],
      x: [0, 10, -10, 10, 0],
    }}
    transition={{
      delay,
      duration: 12,
      repeat: Infinity,
      ease: "easeOut"
    }}
  >
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, 
          hsl(51, 100%, 85%) 0%, 
          hsl(var(--accent)) 40%, 
          transparent 70%
        )`,
        boxShadow: `
          0 0 ${size}px hsl(var(--accent) / 0.5),
          0 0 ${size * 2}px hsl(var(--accent) / 0.3),
          inset 0 0 ${size / 2}px hsl(51, 100%, 90% / 0.3)
        `,
      }}
    />
  </motion.div>
);

// Ethereal Cross Pattern (Large Background)
const EtherealCross = () => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.04 }}
    transition={{ duration: 3 }}
  >
    <motion.svg
      width="600"
      height="800"
      viewBox="0 0 100 140"
      className="absolute"
      animate={{
        scale: [1, 1.02, 1],
        opacity: [0.04, 0.06, 0.04],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path
        d="M50 5 L50 135 M20 35 L80 35"
        stroke="hsl(var(--accent))"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        style={{ filter: 'blur(2px)' }}
      />
    </motion.svg>
  </motion.div>
);

const CelestialEffects = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; delay: number; size: number }>>([]);
  
  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80}%`,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {/* Divine Central Glow */}
      <DivineGlow />
      
      {/* Ethereal Background Cross */}
      <EtherealCross />
      
      {/* Light Rays from Above */}
      <LightRay angle={-25} delay={0} width={80} />
      <LightRay angle={-10} delay={1} width={60} />
      <LightRay angle={5} delay={2} width={70} />
      <LightRay angle={20} delay={1.5} width={50} />
      <LightRay angle={35} delay={3} width={65} />
      
      {/* Floating Crosses */}
      <FloatingCross size={28} delay={0} duration={10} left="10%" top="20%" />
      <FloatingCross size={22} delay={2} duration={12} left="85%" top="30%" />
      <FloatingCross size={32} delay={4} duration={11} left="75%" top="15%" />
      <FloatingCross size={20} delay={1} duration={9} left="20%" top="60%" />
      <FloatingCross size={26} delay={3} duration={13} left="90%" top="55%" />
      <FloatingCross size={18} delay={5} duration={10} left="5%" top="45%" />
      <FloatingCross size={24} delay={2.5} duration={11} left="60%" top="70%" />
      
      {/* Celestial Particles */}
      {particles.map((particle) => (
        <CelestialParticle
          key={particle.id}
          left={particle.left}
          top={particle.top}
          delay={particle.delay}
          size={particle.size}
        />
      ))}
      
      {/* Ascending Orbs */}
      <AscendingOrb left="15%" delay={0} size={12} />
      <AscendingOrb left="35%" delay={4} size={8} />
      <AscendingOrb left="65%" delay={2} size={10} />
      <AscendingOrb left="80%" delay={6} size={14} />
      <AscendingOrb left="50%" delay={8} size={6} />
      
      {/* Ambient Light Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 20%, hsl(var(--accent) / 0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 30%, hsl(var(--accent) / 0.05) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 20%, hsl(var(--accent) / 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default CelestialEffects;
