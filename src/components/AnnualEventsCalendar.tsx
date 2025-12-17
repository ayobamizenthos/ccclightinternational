import { memo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Calendar, Star, Sparkles, X, Info } from "lucide-react";
import { annualEvents } from "@/data/branches";

interface EventModalProps {
  event: typeof annualEvents[0] | null;
  onClose: () => void;
  color: { bg: string; glow: string; accent: string };
}

const EventModal = ({ event, onClose, color }: EventModalProps) => {
  if (!event) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
      />
      
      {/* Modal */}
      <motion.div
        className="relative w-full max-w-[320px] rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
          boxShadow: `0 20px 60px ${color.glow}`,
          border: `1px solid ${color.glow.replace('0.3', '0.5')}`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div 
          className={`relative h-20 flex items-end p-4 bg-gradient-to-r ${color.bg}`}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4 text-foreground" />
          </motion.button>

          {/* Month badge */}
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm"
            >
              <Calendar className={`w-4 h-4 ${color.accent}`} />
            </div>
            <span className={`text-xs font-bold tracking-wider uppercase ${color.accent}`}>
              {event.month}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <h3 
            className="text-xl font-medium text-foreground leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {event.name}
          </h3>

          <p 
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {event.description}
          </p>

          <div 
            className="p-3 rounded-xl"
            style={{ background: 'hsl(var(--muted)/0.5)' }}
          >
            <p 
              className="text-xs text-muted-foreground/80 italic leading-relaxed"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              <strong className="text-foreground not-italic">Significance:</strong> {event.significance}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnnualEventsCalendar = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });
  const [selectedEvent, setSelectedEvent] = useState<typeof annualEvents[0] | null>(null);
  const [selectedColor, setSelectedColor] = useState({ bg: '', glow: '', accent: '' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.4, 0.15]);

  const eventColors = [
    { bg: 'from-amber-500/30 to-yellow-500/20', glow: 'rgba(245,158,11,0.3)', accent: 'text-amber-500' },
    { bg: 'from-emerald-500/30 to-teal-500/20', glow: 'rgba(16,185,129,0.3)', accent: 'text-emerald-500' },
    { bg: 'from-violet-500/30 to-purple-500/20', glow: 'rgba(139,92,246,0.3)', accent: 'text-violet-500' },
    { bg: 'from-rose-500/30 to-pink-500/20', glow: 'rgba(244,63,94,0.3)', accent: 'text-rose-500' },
    { bg: 'from-blue-500/30 to-cyan-500/20', glow: 'rgba(59,130,246,0.3)', accent: 'text-blue-500' },
    { bg: 'from-orange-500/30 to-amber-500/20', glow: 'rgba(249,115,22,0.3)', accent: 'text-orange-500' },
    { bg: 'from-gold/35 to-amber-500/25', glow: 'rgba(212,175,55,0.4)', accent: 'text-gold' },
    { bg: 'from-indigo-500/30 to-blue-500/20', glow: 'rgba(99,102,241,0.3)', accent: 'text-indigo-500' },
  ];

  // Card animation variants - cinematic slam effect
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      y: -60,
      rotateX: 30,
    },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 15,
        delay: index * 0.08,
      },
    }),
  };

  const handleEventClick = (event: typeof annualEvents[0], index: number) => {
    setSelectedEvent(event);
    setSelectedColor(eventColors[index % eventColors.length]);
  };

  return (
    <>
      <section 
        ref={sectionRef}
        id="events-calendar" 
        className="py-14 md:py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(var(--secondary)/0.08) 0%, hsl(var(--background)) 50%, hsl(var(--secondary)/0.08) 100%)",
        }}
      >
        {/* Ambient glow */}
        <motion.div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="container max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-8 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                  border: '1px solid rgba(212,175,55,0.25)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(212,175,55,0.15)',
                    '0 0 25px rgba(212,175,55,0.3)',
                    '0 0 12px rgba(212,175,55,0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Calendar className="w-3.5 h-3.5 text-gold" />
              </motion.div>
              <span 
                className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-gold"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Sacred Calendar
              </span>
            </motion.div>

            <h2 
              className="text-3xl md:text-5xl font-medium text-foreground mb-3 leading-[1.1]" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Annual{' '}
              <span 
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Celebrations
              </span>
            </h2>
            
            <p 
              className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Tap to learn more about each sacred celebration
            </p>
          </motion.div>

          {/* Events Grid - Mobile optimized 2x4 grid */}
          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {annualEvents.map((event, index) => {
              const color = eventColors[index % eventColors.length];
              
              return (
                <motion.div
                  key={event.id}
                  className="group relative cursor-pointer"
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  onClick={() => handleEventClick(event, index)}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Hover glow */}
                  <motion.div 
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${color.glow}, transparent 70%)`,
                      filter: 'blur(15px)',
                    }}
                  />

                  <motion.div
                    className="relative h-full rounded-xl p-3 md:p-4 overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
                      border: '1px solid hsl(var(--border))',
                    }}
                  >
                    {/* Clickable indicator - pulsing info icon */}
                    <motion.div 
                      className="absolute top-2 right-2"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Info className={`w-3.5 h-3.5 ${color.accent} opacity-60 group-hover:opacity-100`} />
                    </motion.div>

                    {/* Date badge */}
                    <div 
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full mb-2 bg-gradient-to-r ${color.bg}`}
                    >
                      <Star className={`w-2.5 h-2.5 ${color.accent}`} />
                      <span 
                        className={`text-[8px] md:text-[9px] font-bold tracking-[0.08em] uppercase ${color.accent}`}
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {event.month}
                      </span>
                    </div>

                    <h3 
                      className="text-sm md:text-base font-medium text-foreground mb-1 leading-tight line-clamp-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {event.name}
                    </h3>

                    <p 
                      className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {event.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom decorative element */}
          <motion.div 
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
            <Sparkles className="w-3.5 h-3.5 text-gold/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
          </motion.div>
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)}
            color={selectedColor}
          />
        )}
      </AnimatePresence>
    </>
  );
});

AnnualEventsCalendar.displayName = 'AnnualEventsCalendar';

export default AnnualEventsCalendar;
