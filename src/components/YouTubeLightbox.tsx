import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import generalOverseer from "@/assets/general-overseer.png";

interface YouTubeLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

// Extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const YouTubeLightbox = ({ isOpen, onClose, videoUrl, title }: YouTubeLightboxProps) => {
  const videoId = getYouTubeVideoId(videoUrl);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!videoId) return null;

  const handleWatchOnYouTube = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Premium blur backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(5,15,30,0.95) 100%)',
              backdropFilter: 'blur(24px)',
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Divine light effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 60%)',
              }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          {/* Video container */}
          <motion.div
            className="relative w-full max-w-4xl z-10"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
            }}
          >
            {/* Header with title and close */}
            <div className="flex items-center justify-between mb-4">
              {title && (
                <motion.h3
                  className="text-white text-lg md:text-xl font-medium truncate pr-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {title}
                </motion.h3>
              )}
              
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors ml-auto"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                whileHover={{ 
                  scale: 1.1, 
                  background: 'rgba(239,68,68,0.3)',
                  borderColor: 'rgba(239,68,68,0.5)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-white/70" />
              </motion.button>
            </div>

            {/* Video thumbnail - clickable to YouTube */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
              onClick={handleWatchOnYouTube}
              whileHover={{ scale: 1.01 }}
            >
              <div className="aspect-video relative bg-secondary">
                {/* Loading skeleton */}
                <AnimatePresence>
                  {!imageLoaded && (
                    <motion.div
                      className="absolute inset-0 z-10"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-secondary via-secondary-dark to-secondary" />
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 animate-pulse" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sermon thumbnail - General Overseer image */}
                <img
                  src={generalOverseer}
                  alt={title || "Video thumbnail"}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                
                {/* Central play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div className="relative" whileHover={{ scale: 1.1 }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full"
                        style={{ border: '2px solid rgba(255,0,0,0.4)' }}
                        animate={{
                          scale: [1, 1.5 + i * 0.3],
                          opacity: [0.6, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}

                    <motion.div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                        boxShadow: '0 15px 50px rgba(255,0,0,0.5)',
                      }}
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 relative z-10" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Click to watch label */}
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full flex items-center gap-2"
                  style={{
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-white text-sm font-medium">
                    Click to watch on YouTube
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/70" />
                </motion.div>
              </div>
            </motion.div>

            {/* Watch on YouTube button */}
            <motion.button
              onClick={handleWatchOnYouTube}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                color: '#FFFFFF',
                boxShadow: '0 10px 30px rgba(255,0,0,0.3)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(255,0,0,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default YouTubeLightbox;
