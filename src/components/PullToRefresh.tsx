import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { PageRefreshSkeleton } from './ui/skeleton-card';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

const PullToRefresh = ({ onRefresh, children }: PullToRefreshProps) => {
  const { pullDistance, isRefreshing, progress } = usePullToRefresh({
    onRefresh,
    threshold: 80,
  });

  return (
    <div className="relative">
      {/* Full page skeleton overlay when refreshing */}
      <AnimatePresence>
        {isRefreshing && <PageRefreshSkeleton />}
      </AnimatePresence>

      {/* Pull indicator */}
      <AnimatePresence>
        {(pullDistance > 0 && !isRefreshing) && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: Math.min(pullDistance, 100),
            }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col items-center">
              {/* Glow effect */}
              <motion.div
                className="absolute w-20 h-20 rounded-full bg-primary/20 blur-xl"
                animate={{
                  scale: progress * 1.5,
                  opacity: progress * 0.5,
                }}
              />
              
              {/* Indicator circle */}
              <motion.div
                className="relative w-12 h-12 rounded-full bg-background border-2 border-primary/30 shadow-lg flex items-center justify-center backdrop-blur-sm"
                animate={{
                  borderColor: progress >= 1 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)',
                  scale: progress >= 1 ? 1.1 : 1,
                }}
              >
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="hsl(var(--primary) / 0.2)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={125.6}
                    animate={{
                      strokeDashoffset: 125.6 * (1 - progress),
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </svg>
                
                {/* Icon */}
                <motion.div
                  animate={{
                    rotate: progress * 180,
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <RefreshCw 
                    className={`w-5 h-5 ${progress >= 1 ? 'text-primary' : 'text-muted-foreground'}`}
                    strokeWidth={2}
                  />
                </motion.div>
              </motion.div>

              {/* Text indicator */}
              <motion.span
                className="mt-2 text-xs font-medium text-muted-foreground"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                animate={{ opacity: pullDistance > 20 ? 1 : 0 }}
              >
                {progress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull offset */}
      <motion.div
        animate={{
          y: isRefreshing ? 0 : pullDistance > 0 ? Math.min(pullDistance * 0.5, 40) : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
