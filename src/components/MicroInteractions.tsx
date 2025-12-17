import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

// Ripple Effect Button
interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const RippleButton = ({ children, className = "", onClick }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick?.();
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

// Hover Glow Card
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowCard = ({ children, className = "", glowColor = "rgba(56, 129, 142, 0.4)" }: GlowCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="absolute pointer-events-none rounded-full blur-3xl"
        animate={{
          opacity: isHovering ? 0.6 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: glowColor,
          width: 200,
          height: 200,
          left: position.x - 100,
          top: position.y - 100,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Animated Icon
interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedIcon = ({ children, className = "" }: AnimatedIconProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.15,
        rotate: [0, -10, 10, -5, 0],
      }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// Text Reveal Animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal = ({ text, className = "", delay = 0 }: TextRevealProps) => {
  return (
    <motion.span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Stagger List Animation
interface StaggerListProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggerList = ({ children, className = "", staggerDelay = 0.1 }: StaggerListProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Pulse Indicator
interface PulseIndicatorProps {
  className?: string;
  color?: string;
  size?: number;
}

export const PulseIndicator = ({
  className = "",
  color = "hsl(var(--primary))",
  size = 12,
}: PulseIndicatorProps) => {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ backgroundColor: color, width: size, height: size }}
      />
      <span
        className="relative inline-flex rounded-full"
        style={{ backgroundColor: color, width: size, height: size }}
      />
    </span>
  );
};

// Shimmer Text
interface ShimmerTextProps {
  text: string;
  className?: string;
}

export const ShimmerText = ({ text, className = "" }: ShimmerTextProps) => {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] ${className}`}
      animate={{ backgroundPosition: ["0% center", "200% center"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
};
