import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
  barCount?: number;
  color?: string;
}

const AudioVisualizer = memo(({ 
  isPlaying, 
  className = '', 
  barCount = 5,
  color = '#0ea5e9'
}: AudioVisualizerProps) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);
  
  return (
    <div className={`flex items-end justify-center gap-0.5 h-6 ${className}`}>
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full origin-bottom"
          style={{ 
            backgroundColor: color,
            minHeight: '4px'
          }}
          animate={isPlaying ? {
            height: ['4px', `${12 + Math.random() * 12}px`, '4px', `${8 + Math.random() * 16}px`, '4px'],
            opacity: [0.6, 1, 0.7, 1, 0.6]
          } : {
            height: '4px',
            opacity: 0.4
          }}
          transition={isPlaying ? {
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: index * 0.1
          } : {
            duration: 0.3
          }}
        />
      ))}
    </div>
  );
});

AudioVisualizer.displayName = 'AudioVisualizer';

export default AudioVisualizer;
