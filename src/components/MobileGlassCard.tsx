import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MobileGlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "teal" | "gold" | "burgundy";
  tilt?: boolean;
  glow?: boolean;
}

const MobileGlassCard = ({
  children,
  className = "",
  variant = "default",
  tilt = false,
  glow = false,
}: MobileGlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tilt) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "teal":
        return "glass-card-mobile-teal";
      case "gold":
        return "glass-card-mobile-gold";
      case "burgundy":
        return "glass-card-mobile-burgundy";
      default:
        return "glass-card-mobile";
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      className={`${getVariantStyles()} ${glow ? "glass-glow" : ""} ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default MobileGlassCard;
