import { memo } from 'react';

// Ultra-optimized Celestial Background - Pure CSS, Zero JavaScript animations
const CelestialBackground = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Static Divine Light Rays - CSS only */}
      <div className="absolute inset-0 opacity-30">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-0 left-1/2 origin-top"
            style={{
              width: '2px',
              height: '100vh',
              background: `linear-gradient(180deg, rgba(212,175,55,${0.12 - i * 0.02}) 0%, transparent 60%)`,
              transform: `translateX(-50%) rotate(${-30 + i * 20}deg)`,
            }}
          />
        ))}
      </div>

      {/* Static Sacred Crosses - No animation */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`cross-${i}`}
          className="absolute opacity-[0.05]"
          style={{
            left: `${15 + i * 22}%`,
            top: `${20 + (i % 2) * 30}%`,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-12 md:h-12" style={{ color: 'rgba(212,175,55,1)' }}>
            <path fill="currentColor" d="M11 2v7H4v4h7v9h2v-9h7V9h-7V2z" />
          </svg>
        </div>
      ))}

      {/* Static Stars - No animation for performance */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${(i * 8) % 100}%`,
            top: `${(i * 11) % 100}%`,
            background: i % 3 === 0 ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.3)',
          }}
        />
      ))}

      {/* Static Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Sacred Geometry Pattern - Static */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle Divine Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,22,40,0.1) 100%)',
        }}
      />
    </div>
  );
});

CelestialBackground.displayName = 'CelestialBackground';

export default CelestialBackground;
