import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { Star, Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description?: string;
  icon?: ReactNode;
}

const PageHeader = ({ badge, title, titleHighlight, description, icon }: PageHeaderProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  return (
    <div 
      ref={heroRef}
      className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
      }}
    >
      {/* Ambient effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)',
            filter: 'blur(70px)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] opacity-35"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Floating stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 7}%`,
              top: `${20 + (i % 4) * 18}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Star className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'text-gold/50' : 'text-emerald-500/40'}`} fill="currentColor" />
          </motion.div>
        ))}
      </motion.div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-5 md:px-8 relative z-10 text-center">
        {/* Badge */}
        <motion.div 
          className="inline-flex items-center gap-2.5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
              border: '1px solid rgba(212,175,55,0.4)',
            }}
            animate={{
              boxShadow: [
                '0 0 12px rgba(212,175,55,0.25)',
                '0 0 20px rgba(212,175,55,0.45)',
                '0 0 12px rgba(212,175,55,0.25)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {icon || <Sparkles className="w-3.5 h-3.5 text-gold" />}
          </motion.div>
          <span 
            className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase"
            style={{ 
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(90deg, #D4AF37, #FFF8E1, #10B981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 leading-[1.1]"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {title}{' '}
          <span 
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFF8E1 50%, #A07C32 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {titleHighlight}
          </span>
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p 
            className="text-white/60 text-base md:text-lg max-w-xl mx-auto"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
