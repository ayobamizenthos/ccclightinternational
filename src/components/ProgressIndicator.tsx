import { motion, useScroll, useSpring } from "framer-motion";
import { memo } from "react";

const ProgressIndicator = memo(() => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{ 
          scaleX,
          background: `linear-gradient(90deg, 
            hsl(var(--primary)) 0%, 
            hsl(var(--accent)) 50%, 
            hsl(var(--secondary)) 100%
          )`,
        }}
      />
      
      {/* Glow effect overlay */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[6px] z-[59] origin-left blur-sm"
        style={{ 
          scaleX,
          background: `linear-gradient(90deg, 
            hsl(var(--primary) / 0.6) 0%, 
            hsl(var(--accent) / 0.8) 50%, 
            hsl(var(--secondary) / 0.6) 100%
          )`,
        }}
      />
      
      {/* Animated pulse at the leading edge */}
      <motion.div
        className="fixed top-0 h-[3px] w-3 z-[61] origin-left"
        style={{ 
          left: 0,
          scaleX: 1,
          x: useSpring(
            scrollYProgress.get() * (typeof window !== 'undefined' ? window.innerWidth : 0),
            { stiffness: 100, damping: 30 }
          ),
          background: 'hsl(var(--accent))',
          boxShadow: '0 0 12px 2px hsl(var(--accent) / 0.8)',
        }}
      />
    </>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
