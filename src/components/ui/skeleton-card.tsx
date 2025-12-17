import { motion } from "framer-motion";

// Premium shimmer effect component
const ShimmerEffect = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
    animate={{ x: ["-100%", "100%"] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  />
);

// Generic Section Skeleton for loading states
export const SectionSkeleton = ({ height = "h-64" }: { height?: string }) => (
  <motion.div 
    className={`relative ${height} bg-muted/20 rounded-2xl overflow-hidden`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <ShimmerEffect />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </motion.div>
);

// Sermon Card Skeleton with enhanced animations
export const SermonCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div 
    className="bg-muted/20 rounded-xl md:rounded-2xl overflow-hidden border border-border/50 relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
  >
    {/* Thumbnail skeleton */}
    <div className="relative aspect-video bg-muted/40 overflow-hidden">
      <ShimmerEffect />
      {/* Play button skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted/50"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
    {/* Content skeleton */}
    <div className="p-3 md:p-4 space-y-2.5">
      <motion.div 
        className="h-2.5 w-16 bg-muted/50 rounded-full"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.div 
        className="h-4 w-full bg-muted/50 rounded-lg"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div 
        className="h-3 w-3/4 bg-muted/40 rounded-lg"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </div>
  </motion.div>
);

// Event Card Skeleton
export const EventCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div 
    className="bg-background/80 rounded-xl md:rounded-2xl p-4 md:p-5 border border-border/50 relative overflow-hidden min-w-[260px] md:min-w-[280px]"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <ShimmerEffect />
    
    {/* Badge skeleton */}
    <motion.div 
      className="h-4 w-14 bg-muted/40 rounded-full mb-3"
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    
    {/* Icon skeleton */}
    <motion.div 
      className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-muted/40 mb-4"
      animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Title skeleton */}
    <motion.div 
      className="h-5 w-3/4 bg-muted/50 rounded-lg mb-2"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
    />
    
    {/* Description skeleton */}
    <div className="space-y-1.5 mb-4">
      <motion.div 
        className="h-3 w-full bg-muted/35 rounded"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div 
        className="h-3 w-5/6 bg-muted/35 rounded"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </div>
    
    {/* Details skeleton */}
    <div className="space-y-2">
      {[0, 1].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-muted/40"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
          <motion.div 
            className="h-2.5 bg-muted/40 rounded-full"
            style={{ width: `${50 + i * 15}px` }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        </div>
      ))}
    </div>
  </motion.div>
);

// Social Card Skeleton
export const SocialCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div 
    className="bg-background/80 rounded-xl p-4 border border-border/50 relative overflow-hidden"
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <ShimmerEffect />
    
    <div className="flex items-start justify-between mb-4">
      <motion.div 
        className="w-10 h-10 rounded-xl bg-muted/50"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div 
        className="w-6 h-6 rounded-full bg-muted/30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
    </div>
    
    <motion.div 
      className="h-4 w-20 bg-muted/50 rounded mb-2"
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    />
    
    <motion.div 
      className="h-3 w-16 bg-muted/40 rounded"
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
    />
  </motion.div>
);

// Full Page Loading Skeleton
export const PageRefreshSkeleton = () => (
  <motion.div
    className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-md flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {/* Animated spinner */}
      <motion.div
        className="relative w-14 h-14"
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid hsl(var(--muted))',
          }}
        />
        {/* Spinning arc */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: 'transparent',
            borderTopColor: '#D4AF37',
            borderRightColor: '#D4AF37',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #10B981)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Loading text */}
      <motion.span
        className="text-xs text-muted-foreground font-medium tracking-wider uppercase"
        style={{ fontFamily: 'Outfit, sans-serif' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Refreshing...
      </motion.span>
    </motion.div>
  </motion.div>
);

// Grid of skeletons with staggered animations
export const SermonsGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SermonCardSkeleton key={i} index={i} />
    ))}
  </div>
);

export const EventsGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="flex gap-3 md:gap-4 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <EventCardSkeleton key={i} index={i} />
    ))}
  </div>
);

export const SocialGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SocialCardSkeleton key={i} index={i} />
    ))}
  </div>
);
