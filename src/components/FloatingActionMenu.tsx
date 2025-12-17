import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Play, Gift, PhoneCall, Send, Navigation } from "lucide-react";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface ActionItem {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  glow: string;
  action: () => void;
}

interface FloatingActionMenuProps {
  isVisible?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const FloatingActionMenu = memo(({ isVisible = true, onOpenChange }: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { trigger } = useHapticFeedback();

  // Metallic gold gradient
  const goldGradient = "linear-gradient(145deg, #A07C32 0%, #D4AF37 25%, #FFF8E1 50%, #D4AF37 75%, #A07C32 100%)";

  const handleToggle = () => {
    trigger(isOpen ? 'light' : 'medium');
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const handleAction = (action: () => void) => {
    trigger('success');
    action();
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const actions: ActionItem[] = [
    {
      icon: <Play className="w-4.5 h-4.5" strokeWidth={2.5} fill="currentColor" />,
      label: "Watch Live",
      gradient: "linear-gradient(135deg, #B91C1C 0%, #DC2626 100%)",
      glow: "rgba(185,28,28,0.5)",
      action: () => window.open("https://www.youtube.com/@CCCLIGHTINTERNATIONAL", "_blank"),
    },
    {
      icon: <Gift className="w-4.5 h-4.5" strokeWidth={2} />,
      label: "Give/Donate",
      gradient: "linear-gradient(135deg, #92702A 0%, #D4AF37 100%)",
      glow: "rgba(212,175,55,0.5)",
      action: () => window.location.href = "mailto:ccclightinternationalparish@gmail.com?subject=Donation Request",
    },
    {
      icon: <PhoneCall className="w-4.5 h-4.5" strokeWidth={2} />,
      label: "Call Parish",
      gradient: "linear-gradient(135deg, #047857 0%, #059669 100%)",
      glow: "rgba(5,150,105,0.5)",
      action: () => window.location.href = "tel:+2347035041566",
    },
    {
      icon: <Send className="w-4.5 h-4.5" strokeWidth={2} />,
      label: "Send Email",
      gradient: "linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)",
      glow: "rgba(109,40,217,0.5)",
      action: () => window.location.href = "mailto:ccclightinternationalparish@gmail.com",
    },
    {
      icon: <Navigation className="w-4.5 h-4.5" strokeWidth={2} />,
      label: "Get Directions",
      gradient: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)",
      glow: "rgba(37,99,235,0.5)",
      action: () => window.open("https://maps.google.com/?q=Pole+6+Nureni+Yusuff+Lane+Alagbado+Lagos+Nigeria", "_blank"),
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, scale: 0, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
        >
          {/* Action Items */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Premium Backdrop with enhanced blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 -z-10"
                  style={{
                    background: 'linear-gradient(180deg, rgba(5,10,20,0.85) 0%, rgba(10,15,25,0.92) 100%)',
                    backdropFilter: 'blur(16px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                  }}
                  onClick={() => {
                    trigger('light');
                    setIsOpen(false);
                  }}
                />
                
                {/* Action Buttons */}
                <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
                  {actions.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 50, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        scale: 1,
                        transition: { delay: index * 0.06, type: "spring", stiffness: 400, damping: 25 }
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: 50, 
                        scale: 0.8,
                        transition: { delay: (actions.length - index) * 0.03 }
                      }}
                      whileHover={{ scale: 1.05, x: -8 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(item.action)}
                      className="group flex items-center gap-3 touch-manipulation"
                    >
                      {/* Label */}
                      <motion.span 
                        className="px-4 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Icon button */}
                      <div className="relative">
                        {/* Glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: item.glow,
                            filter: 'blur(12px)',
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        <div 
                          className="relative w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: item.gradient,
                            boxShadow: `0 8px 24px ${item.glow}`,
                          }}
                        >
                          <span className="text-white">{item.icon}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Main FAB Button - Premium Gold */}
          <motion.button
            onClick={handleToggle}
            className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center touch-manipulation overflow-hidden"
            style={{
              background: isOpen 
                ? "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)"
                : goldGradient,
              boxShadow: isOpen
                ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 6px 24px rgba(160, 124, 50, 0.5), 0 0 0 1px rgba(255,248,225,0.3) inset",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Rotating metallic ring */}
            {!isOpen && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #A07C32, #FFF8E1, #D4AF37, #A07C32)",
                  opacity: 0.3,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            )}
            
            {/* Pulsing glow ring */}
            {!isOpen && (
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
            )}
            
            {/* Shimmer sweep */}
            {!isOpen && (
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
            )}
            
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10"
                >
                  <X className="w-6 h-6 text-white" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-10"
                >
                  <Plus className="w-5 h-5 md:w-7 md:h-7 text-[#0a1628]" strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          {/* Premium Label - only visible on hover with smooth animation */}
          <AnimatePresence>
            {!isOpen && isHovered && (
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
                Actions
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingActionMenu.displayName = "FloatingActionMenu";

export default FloatingActionMenu;
