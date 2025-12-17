import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useHapticFeedback from "@/hooks/useHapticFeedback";
import AudioPlayer from "./AudioPlayer";

// Premium music waveform icon
const MusicWaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 relative z-10">
    <motion.rect
      x="2" y="8" width="2" height="8" rx="1"
      fill="#D4AF37"
      animate={{ height: [8, 14, 8], y: [8, 5, 8] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.rect
      x="6" y="5" width="2" height="14" rx="1"
      fill="#D4AF37"
      animate={{ height: [14, 8, 14], y: [5, 8, 5] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
    />
    <motion.rect
      x="10" y="3" width="2" height="18" rx="1"
      fill="#D4AF37"
      animate={{ height: [18, 10, 18], y: [3, 7, 3] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
    />
    <motion.rect
      x="14" y="6" width="2" height="12" rx="1"
      fill="#D4AF37"
      animate={{ height: [12, 16, 12], y: [6, 4, 6] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
    />
    <motion.rect
      x="18" y="4" width="2" height="16" rx="1"
      fill="#D4AF37"
      animate={{ height: [16, 10, 16], y: [4, 7, 4] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
    />
    <motion.rect
      x="22" y="7" width="2" height="10" rx="1"
      fill="#D4AF37"
      animate={{ height: [10, 14, 10], y: [7, 5, 7] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
  </svg>
);

interface FloatingChoirButtonProps {
  isVisible?: boolean;
  hideForMenu?: boolean;
}

const FloatingChoirButton = memo(({ isVisible = true, hideForMenu = false }: FloatingChoirButtonProps) => {
  const { trigger } = useHapticFeedback();
  const [isHovered, setIsHovered] = useState(false);
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);

  const handleClick = () => {
    trigger('medium');
    setAudioPlayerOpen(!audioPlayerOpen);
  };

  // Metallic gold gradient colors
  const goldGradient = "linear-gradient(145deg, #A07C32 0%, #D4AF37 25%, #FFF8E1 50%, #D4AF37 75%, #A07C32 100%)";
  const goldShadow = "0 8px 32px rgba(160, 124, 50, 0.5), 0 0 0 1px rgba(255,248,225,0.3) inset, 0 2px 4px rgba(0,0,0,0.2)";

  return (
    <>
      <AnimatePresence>
        {isVisible && !hideForMenu && (
          <motion.div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.button
              onClick={handleClick}
              className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center touch-manipulation overflow-hidden group"
              style={{
                background: goldGradient,
                boxShadow: goldShadow,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              {/* Rotating metallic ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #A07C32, #FFF8E1, #D4AF37, #A07C32)",
                  opacity: 0.4,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Pulsing glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(212, 175, 55, 0.6)",
                    "0 0 0 12px rgba(212, 175, 55, 0)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                />
              </motion.div>
              
              {/* Inner circle with animated waveform icon */}
              <motion.div 
                className="relative z-10 w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,248,225,0.3)",
                }}
              >
                <div className="w-4 h-4 md:w-5 md:h-5">
                  <MusicWaveIcon />
                </div>
              </motion.div>
              
              {/* Floating musical notes with gold color */}
              <motion.span
                className="absolute -top-1 -right-0 text-xs md:text-sm font-bold pointer-events-none"
                style={{ color: "#D4AF37", textShadow: "0 0 8px rgba(212,175,55,0.6)" }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, 15, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ♪
              </motion.span>
              <motion.span
                className="absolute -top-2 left-0 text-[10px] md:text-xs font-bold pointer-events-none"
                style={{ color: "#FFF8E1", textShadow: "0 0 6px rgba(255,248,225,0.5)" }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 0.9, 0.4],
                  rotate: [0, -20, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                ♫
              </motion.span>
            </motion.button>
            
            {/* Premium label - only visible on hover with smooth animation */}
            <AnimatePresence>
              {isHovered && !audioPlayerOpen && (
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.25 
                  }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase whitespace-nowrap"
                  style={{ 
                    fontFamily: "Outfit, sans-serif",
                    background: "linear-gradient(135deg, rgba(10,22,40,0.95), rgba(15,30,55,0.9))",
                    border: "1px solid rgba(212,175,55,0.4)",
                    color: "#D4AF37",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.15)",
                  }}
                >
                  Music
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Player Panel */}
      <AudioPlayer isOpen={audioPlayerOpen} onClose={() => setAudioPlayerOpen(false)} />
    </>
  );
});

FloatingChoirButton.displayName = "FloatingChoirButton";

export default FloatingChoirButton;
