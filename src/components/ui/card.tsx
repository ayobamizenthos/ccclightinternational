import * as React from "react";

import { cn } from "@/lib/utils";

// Haptic feedback function for cards
const triggerCardHaptic = () => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(5);
  }
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  haptic?: boolean;
  variant?: 'default' | 'glass' | 'glass-celestial' | 'glass-gold' | 'glass-mahogany' | 'glass-premium';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, haptic = true, variant = 'default', onTouchStart, ...props }, ref) => {
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      if (haptic) {
        triggerCardHaptic();
      }
      onTouchStart?.(e);
    };

    const variantClasses = {
      default: "bg-card/95 backdrop-blur-[32px] border-white/20 shadow-[0_8px_40px_rgba(46,74,82,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_20px_60px_rgba(46,74,82,0.12),0_0_0_1px_rgba(212,175,55,0.15)] hover:border-gold/20",
      glass: "bg-white/90 backdrop-blur-[40px] saturate-[180%] border-[rgba(70,120,135,0.12)] shadow-[0_12px_60px_rgba(46,74,82,0.1),inset_0_2px_0_rgba(255,255,255,0.95)] hover:shadow-[0_25px_80px_rgba(46,74,82,0.15),0_0_40px_rgba(212,175,55,0.08)] hover:border-gold/25",
      'glass-celestial': "bg-gradient-to-br from-primary/90 to-primary-dark/95 backdrop-blur-[32px] border-accent/20 text-primary-foreground shadow-[0_12px_60px_rgba(70,120,135,0.25),0_0_80px_rgba(148,115,55,0.1)] hover:shadow-[0_20px_80px_rgba(70,120,135,0.35),0_0_100px_rgba(212,175,55,0.15)] hover:border-gold/40",
      'glass-gold': "bg-gradient-to-br from-white/98 to-amber-50/95 backdrop-blur-[28px] border-accent/25 shadow-[0_12px_50px_rgba(148,115,55,0.15),inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_20px_70px_rgba(212,175,55,0.25),0_0_60px_rgba(212,175,55,0.1)] hover:border-gold/50",
      'glass-mahogany': "bg-gradient-to-br from-secondary/90 to-secondary-dark/95 backdrop-blur-[32px] border-accent/15 text-secondary-foreground shadow-[0_12px_60px_rgba(65,48,38,0.3)] hover:shadow-[0_20px_80px_rgba(65,48,38,0.4),0_0_40px_rgba(212,175,55,0.1)] hover:border-gold/30",
      'glass-premium': "bg-gradient-to-br from-white/98 via-white/95 to-white/90 backdrop-blur-[40px] saturate-[200%] border-[rgba(212,175,55,0.15)] shadow-[0_16px_70px_rgba(46,74,82,0.1),inset_0_2px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(212,175,55,0.05)] hover:shadow-[0_30px_100px_rgba(46,74,82,0.15),0_0_50px_rgba(212,175,55,0.12),inset_0_2px_0_rgba(255,255,255,1)] hover:border-gold/35 hover:-translate-y-2",
    };

    return (
      <div 
        ref={ref} 
        onTouchStart={handleTouchStart}
        className={cn(
          "group relative rounded-2xl border text-card-foreground transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] touch-manipulation overflow-hidden",
          variantClasses[variant],
          className
        )} 
        {...props}
      >
        {/* Glassmorphism shimmer effect on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.08) 50%, transparent 60%)',
            animation: 'shimmer 3s infinite',
          }}
        />
        {/* Gradient border glow on hover */}
        <div 
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(16,185,129,0.2), rgba(212,175,55,0.2))',
            filter: 'blur(8px)',
          }}
        />
        {props.children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
