import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface NavTooltipProps {
  children: ReactNode;
  content: {
    title: string;
    description: string;
    icon?: ReactNode;
  };
  isVisible: boolean;
}

const NavTooltip = ({ children, content, isVisible }: NavTooltipProps) => {
  return (
    <div className="relative group">
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 pointer-events-none"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Arrow */}
            <div 
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)',
                borderTop: '1px solid hsl(var(--border))',
                borderLeft: '1px solid hsl(var(--border))',
              }}
            />
            
            {/* Tooltip Content */}
            <div 
              className="relative min-w-[200px] max-w-[280px] p-4 rounded-xl"
              style={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px hsl(var(--gold) / 0.1)',
              }}
            >
              {/* Gold accent line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              
              <div className="flex items-start gap-3">
                {content.icon && (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 border border-gold/20">
                    {content.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 
                    className="text-sm font-semibold text-foreground mb-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {content.title}
                  </h4>
                  <p 
                    className="text-xs text-muted-foreground leading-relaxed"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {content.description}
                  </p>
                </div>
              </div>
              
              {/* Subtle shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, hsl(var(--gold) / 0.05) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavTooltip;