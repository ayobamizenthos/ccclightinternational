import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  webpSrc?: string;
  srcSet?: string;
  webpSrcSet?: string;
  sizes?: string;
  priority?: boolean; // Load immediately without lazy loading
}

const LazyImage = memo(({
  src,
  alt,
  className = '',
  placeholder,
  webpSrc,
  srcSet,
  webpSrcSet,
  sizes,
  priority = false,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '200px' // Preload images 200px before they enter viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Minimal shimmer placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            className="absolute inset-0 bg-muted/40 rounded-lg overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Faster shimmer */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.06) 50%, transparent 100%)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {isInView && (
        <motion.picture
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          {webpSrcSet && <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />}
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={handleLoad}
            className={className}
            fetchPriority={priority ? "high" : "auto"}
          />
        </motion.picture>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;