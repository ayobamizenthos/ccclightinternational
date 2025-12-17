import { memo, useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2, Download } from "lucide-react";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface PremiumLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PremiumLightbox = memo(({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNavigate 
}: PremiumLightboxProps) => {
  const { trigger } = useHapticFeedback();
  const [zoom, setZoom] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const currentImage = images[currentIndex];
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrev) navigatePrev();
          break;
        case 'ArrowRight':
          if (hasNext) navigateNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasNext, hasPrev, currentIndex]);

  const navigateNext = useCallback(() => {
    if (hasNext) {
      trigger('light');
      onNavigate(currentIndex + 1);
      setZoom(1);
      setIsZoomed(false);
    }
  }, [currentIndex, hasNext, onNavigate, trigger]);

  const navigatePrev = useCallback(() => {
    if (hasPrev) {
      trigger('light');
      onNavigate(currentIndex - 1);
      setZoom(1);
      setIsZoomed(false);
    }
  }, [currentIndex, hasPrev, onNavigate, trigger]);

  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(zoom + 0.5, 3);
    setZoom(newZoom);
    setIsZoomed(newZoom > 1);
    trigger('light');
  }, [zoom, trigger]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoom - 0.5, 1);
    setZoom(newZoom);
    setIsZoomed(newZoom > 1);
    trigger('light');
  }, [zoom, trigger]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (!isZoomed) {
      if (offset > threshold || velocity > 500) {
        navigatePrev();
      } else if (offset < -threshold || velocity < -500) {
        navigateNext();
      }
    }
    x.set(0);
  }, [isZoomed, navigateNext, navigatePrev, x]);

  const handleClose = useCallback(() => {
    trigger('light');
    setZoom(1);
    setIsZoomed(false);
    onClose();
  }, [onClose, trigger]);

  const handleDoubleTap = useCallback(() => {
    if (zoom === 1) {
      setZoom(2);
      setIsZoomed(true);
    } else {
      setZoom(1);
      setIsZoomed(false);
    }
    trigger('medium');
  }, [zoom, trigger]);

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, rgba(5,10,20,0.98) 0%, rgba(10,22,40,0.98) 100%)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Premium glass header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(10,22,40,0.9) 0%, transparent 100%)',
            }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Image counter */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div 
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    color: 'hsl(45 90% 65%)',
                  }}
                >
                  {currentIndex + 1} / {images.length}
                </div>
                {currentImage.title && (
                  <span 
                    className="text-white/70 text-sm hidden md:block"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {currentImage.title}
                  </span>
                )}
              </motion.div>

              {/* Controls */}
              <motion.div
                className="flex items-center gap-2 md:gap-3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Zoom controls */}
                <motion.button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all touch-manipulation disabled:opacity-30"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomOut className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                </motion.button>
                <motion.button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all touch-manipulation disabled:opacity-30"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomIn className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                </motion.button>

                {/* Close button */}
                <motion.button
                  onClick={handleClose}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center ml-2 touch-manipulation"
                  style={{
                    background: 'linear-gradient(135deg, rgba(220,38,38,0.2), rgba(220,38,38,0.1))',
                    border: '1px solid rgba(220,38,38,0.3)',
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    background: 'linear-gradient(135deg, rgba(220,38,38,0.4), rgba(220,38,38,0.3))',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-red-400" strokeWidth={2} />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation arrows */}
          {hasPrev && (
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ delay: 0.15 }}
              onClick={navigatePrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center touch-manipulation"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
              whileHover={{ 
                scale: 1.1, 
                background: 'rgba(212,175,55,0.2)',
                borderColor: 'rgba(212,175,55,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gold-light" strokeWidth={2} />
            </motion.button>
          )}
          
          {hasNext && (
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ delay: 0.15 }}
              onClick={navigateNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center touch-manipulation"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
              whileHover={{ 
                scale: 1.1, 
                background: 'rgba(212,175,55,0.2)',
                borderColor: 'rgba(212,175,55,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gold-light" strokeWidth={2} />
            </motion.button>
          )}

          {/* Main image container with swipe */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center px-4 md:px-20 py-20"
            style={{ x, opacity }}
            drag={!isZoomed ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <motion.img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: zoom, 
                opacity: 1,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              onDoubleClick={handleDoubleTap}
              className="max-w-full max-h-[80vh] object-contain rounded-lg select-none"
              style={{
                boxShadow: '0 25px 100px rgba(0,0,0,0.5), 0 0 100px rgba(212,175,55,0.1)',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
              }}
              draggable={false}
            />
          </motion.div>

          {/* Thumbnail strip */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6"
            style={{
              background: 'linear-gradient(0deg, rgba(10,22,40,0.95) 0%, transparent 100%)',
            }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide">
                {images.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      trigger('light');
                      onNavigate(index);
                      setZoom(1);
                      setIsZoomed(false);
                    }}
                    className="flex-shrink-0 relative touch-manipulation"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                        index === currentIndex 
                          ? 'ring-2 ring-gold ring-offset-2 ring-offset-transparent' 
                          : 'opacity-50 hover:opacity-80'
                      }`}
                      style={{
                        boxShadow: index === currentIndex 
                          ? '0 4px 20px rgba(212,175,55,0.4)' 
                          : 'none',
                      }}
                    >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    {index === currentIndex && (
                      <motion.div
                        layoutId="activeThumbnail"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          border: '2px solid hsl(42 85% 50%)',
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Swipe hint for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 md:hidden"
          >
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/40 text-xs"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Swipe to navigate • Double tap to zoom
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PremiumLightbox.displayName = "PremiumLightbox";

export default PremiumLightbox;
