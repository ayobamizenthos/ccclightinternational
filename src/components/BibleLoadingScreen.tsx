import { memo, useEffect, useState } from 'react';

interface BibleLoadingScreenProps {
  onLoadingComplete: () => void;
}

const BibleLoadingScreen = memo(({ onLoadingComplete }: BibleLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress animation over 400ms for instant feel
    const duration = 400;
    const interval = 20;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 50);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300"
      style={{
        background: 'linear-gradient(180deg, #FEFEFE 0%, #F8F6F0 50%, #F5F3EB 100%)'
      }}
    >
      {/* Main Content */}
      <div className="text-center px-8 relative z-10">
        {/* Logo Mark - Simple Book Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Soft glow behind */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ 
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)'
            }}
          />
          
          {/* Icon container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Simple book SVG - no animations */}
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none">
              <path
                d="M8 12C8 10.8954 8.89543 10 10 10H30V52H10C8.89543 52 8 51.1046 8 50V12Z"
                fill="#1A1A1A"
              />
              <path
                d="M56 12C56 10.8954 55.1046 10 54 10H34V52H54C55.1046 52 56 51.1046 56 50V12Z"
                fill="#2A2A2A"
              />
              <rect x="30" y="8" width="4" height="46" fill="#0A0A0A" />
              <g>
                <path d="M32 20L35 14L32 16L29 14L32 20Z" fill="#D4AF37" opacity="0.8" />
                <path d="M32 20L38 18L34 20L38 22L32 20Z" fill="#D4AF37" opacity="0.6" />
                <path d="M32 20L26 18L30 20L26 22L32 20Z" fill="#D4AF37" opacity="0.6" />
              </g>
            </svg>
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <h1 
            className="text-3xl font-light tracking-[0.3em] text-neutral-800 mb-2"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            THE LIGHT
          </h1>
          <p 
            className="text-lg tracking-[0.5em] text-neutral-500 uppercase"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Bible
          </p>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-neutral-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-600/60" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-neutral-300" />
        </div>

        {/* Tagline */}
        <p
          className="text-sm text-neutral-500 italic tracking-wide"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          "Thy word is a lamp unto my feet"
        </p>

        {/* Progress Bar */}
        <div className="mt-10 w-48 mx-auto">
          <div className="h-[2px] bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ 
                background: 'linear-gradient(90deg, #D4AF37, #B8860B)',
                width: `${progress}%`
              }}
            />
          </div>
          <p className="text-[10px] text-neutral-400 mt-3 tracking-widest uppercase">
            Loading Scripture
          </p>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <p className="text-[10px] text-neutral-400 tracking-[0.2em]">
          CCC LIGHT INTERNATIONAL
        </p>
      </div>
    </div>
  );
});

BibleLoadingScreen.displayName = 'BibleLoadingScreen';

export default BibleLoadingScreen;