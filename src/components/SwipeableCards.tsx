import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface SwipeableCardsProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  variant?: 'default' | 'premium';
}

function SwipeableCards<T>({
  items,
  renderItem,
  showDots = true,
  showArrows = false,
  className = '',
  variant = 'default',
}: SwipeableCardsProps<T>) {
  const { trigger } = useHapticFeedback();
  const {
    currentIndex,
    swipeOffset,
    isSwiping,
    handlers,
    goTo,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
  } = useSwipeNavigation({
    itemCount: items.length,
  });

  return (
    <div className={`relative ${className}`}>
      {/* Cards container */}
      <div
        className="overflow-hidden touch-pan-y"
        {...handlers}
      >
        <motion.div
          className="flex"
          animate={{
            x: `calc(-${currentIndex * 100}% + ${isSwiping ? swipeOffset : 0}px)`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 px-2"
              animate={{
                scale: index === currentIndex ? 1 : 0.95,
                opacity: index === currentIndex ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows (desktop) */}
      {showArrows && (
        <>
          <AnimatePresence>
            {canGoPrev && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => {
                  goPrev();
                  trigger('light');
                }}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:border-primary/30 transition-colors z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {canGoNext && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => {
                  goNext();
                  trigger('light');
                }}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:border-primary/30 transition-colors z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Premium Dots indicator with slide animation */}
      {showDots && items.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          {/* Left arrow indicator */}
          <motion.div
            className="flex items-center text-muted-foreground/40"
            animate={{ x: [-2, 0, -2], opacity: canGoPrev ? 1 : 0.3 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
          
          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {items.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  goTo(index);
                  trigger('light');
                }}
                className="relative p-1"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to slide ${index + 1}`}
              >
                <motion.div
                  className="relative w-2.5 h-2.5 rounded-full overflow-hidden"
                  style={{
                    background: index === currentIndex 
                      ? 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)'
                      : 'hsl(var(--muted-foreground)/0.2)',
                    boxShadow: index === currentIndex 
                      ? '0 0 12px hsl(var(--primary)/0.5)' 
                      : 'none',
                  }}
                  animate={{
                    scale: index === currentIndex ? [1, 1.15, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: index === currentIndex ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>
          
          {/* Right arrow indicator */}
          <motion.div
            className="flex items-center text-muted-foreground/40"
            animate={{ x: [0, 2, 0], opacity: canGoNext ? 1 : 0.3 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      )}

      {/* Premium swipe hint */}
      <motion.div
        className="md:hidden flex items-center justify-center gap-2 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          className="text-[9px] tracking-[0.15em] uppercase font-medium text-muted-foreground/50"
          style={{ fontFamily: 'Outfit, sans-serif' }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Swipe to explore
        </motion.span>
      </motion.div>
    </div>
  );
}

export default SwipeableCards;