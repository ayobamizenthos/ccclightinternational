import { useState, useEffect, memo } from 'react';
import { Wifi } from 'lucide-react';

// Service schedule - matches LiveService.tsx
const SERVICE_SCHEDULE = [
  { day: 0, startHour: 10, endHour: 14 }, // Sunday 10 AM - 2 PM
  { day: 3, startHour: 9, endHour: 10 },  // Wednesday 9 AM - 10 AM
  { day: 3, startHour: 18, endHour: 20 }, // Wednesday 6 PM - 8 PM
  { day: 5, startHour: 15, endHour: 16 }, // Friday 3 PM - 4 PM (Pregnant Women)
  { day: 5, startHour: 18, endHour: 21 }, // Friday 6 PM - 9 PM (Power Day)
];

const isServiceLive = (): boolean => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  
  return SERVICE_SCHEDULE.some(schedule => 
    schedule.day === currentDay && 
    currentHour >= schedule.startHour && 
    currentHour < schedule.endHour
  );
};

interface LiveServiceIndicatorProps {
  className?: string;
  compact?: boolean;
}

const LiveServiceIndicator = memo(({ className = '', compact = false }: LiveServiceIndicatorProps) => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    setIsLive(isServiceLive());
    // Check every 5 minutes instead of every minute for performance
    const interval = setInterval(() => {
      setIsLive(isServiceLive());
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return (
    <a
      href="#live"
      className={`relative flex items-center gap-2 ${className} active:scale-95 transition-transform`}
    >
      {/* Main indicator - simplified, no framer-motion */}
      <div 
        className={`relative flex items-center gap-1.5 ${compact ? 'px-2.5 py-1' : 'px-3.5 py-2'} rounded-full`}
        style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          boxShadow: '0 4px 20px rgba(239,68,68,0.5)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        {/* Simple pulsing dot with CSS */}
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
        
        {!compact && (
          <span 
            className="text-[10px] font-bold tracking-wider uppercase text-white"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            LIVE NOW
          </span>
        )}
        
        {!compact && (
          <Wifi className="w-3 h-3 text-white opacity-80" />
        )}
      </div>
    </a>
  );
});

LiveServiceIndicator.displayName = 'LiveServiceIndicator';

export default LiveServiceIndicator;
