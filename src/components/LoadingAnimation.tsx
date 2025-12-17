import { motion } from "framer-motion";
import { memo } from "react";

// Minimal loading animation for route transitions - optimized for speed
const LoadingAnimation = memo(() => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, hsl(200 50% 8%) 0%, hsl(200 55% 12%) 50%, hsl(200 50% 8%) 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Simple loading dots - super fast */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

LoadingAnimation.displayName = 'LoadingAnimation';

export default LoadingAnimation;
