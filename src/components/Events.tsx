import { Calendar, MapPin, Clock, ArrowRight, Wheat, PartyPopper, HandHeart, Sparkles, X, Info } from "lucide-react";
import SEO from "@/components/SEO";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface EventModalProps {
  event: typeof upcomingEvents[0] | null;
  onClose: () => void;
}

const upcomingEvents = [
  {
    title: "Harvest Thanksgiving",
    date: "December 8, 2024",
    time: "10:00 AM",
    location: "CCC Light HQ, Alagbado",
    featured: true,
    icon: Wheat,
    description: "Annual celebration of God's faithfulness and blessings.",
    fullDescription: "Join us for our annual Harvest Thanksgiving celebration where we come together as a spiritual family to give thanks to God for His abundant blessings throughout the year. This is a time of joyful worship, testimonies, and celebration of God's faithfulness.",
    gradient: "from-amber-500 to-yellow-500",
    glowColor: "rgba(212,175,55,0.4)",
  },
  {
    title: "New Year Crossover",
    date: "December 31, 2024",
    time: "10:00 PM",
    location: "CCC Light HQ, Alagbado",
    featured: true,
    icon: PartyPopper,
    description: "Usher in the new year with prayers and worship.",
    fullDescription: "End the year in the presence of God and step into the new year with divine blessings. Our Crossover Night service features powerful worship, prophetic declarations for the coming year, and midnight prayers that will set the tone for your entire year ahead.",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.4)",
  },
  {
    title: "Monthly Prayer Vigil",
    date: "First Thursday",
    time: "10:00 PM – 4:00 AM",
    location: "All Branches",
    icon: HandHeart,
    description: "A night of intensive prayer and breakthrough.",
    fullDescription: "Based on Ezekiel 46:1-6, our monthly New Moon Service is a powerful night of intensive prayer and spiritual warfare. Experience breakthrough, deliverance, and divine encounters as we gather to seek the face of God from 10 PM until the early hours of the morning.",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.4)",
  },
];

const EventModal = ({ event, onClose }: EventModalProps) => {
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
        className="relative w-full max-w-[340px] max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
          boxShadow: `0 20px 60px ${event.glowColor}`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${event.gradient}`} />
        
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-muted"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-4 h-4 text-foreground" />
        </motion.button>

        {/* Header */}
        <div className="p-5 pb-0">
          {/* Featured badge */}
          {event.featured && (
            <span 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase mb-4"
              style={{ background: event.glowColor, color: '#0a1628' }}
            >
              <Sparkles className="w-2.5 h-2.5" />
              Featured
            </span>
          )}

          {/* Icon */}
          <motion.div 
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${event.gradient}`}
            style={{ boxShadow: `0 10px 30px ${event.glowColor}` }}
          >
            <event.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
          </motion.div>

          <h3 
            className="text-xl font-medium text-foreground mb-2" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {event.title}
          </h3>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p 
            className="text-sm text-muted-foreground leading-relaxed"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {event.fullDescription}
          </p>

          {/* Info grid */}
          <div className="space-y-2">
            {[
              { icon: Calendar, text: event.date },
              { icon: Clock, text: event.time },
              { icon: MapPin, text: event.location },
            ].map((info, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'hsl(var(--muted)/0.5)' }}
              >
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${event.gradient}`}
                >
                  <info.icon className="h-4 w-4 text-white" />
                </div>
                <span 
                  className="text-sm text-foreground"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {info.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Card animation variants - cinematic slam
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      y: -80,
      rotateX: 40,
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
        delay: index * 0.1,
      },
    }),
  };

  return (
    <>
      <SEO
        title="Upcoming Events - CCC Light International Parish"
        description="Join us for special services and events"
        url="/#events"
      />
      <section 
        ref={sectionRef} 
        id="events" 
        className="py-14 md:py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--muted)/0.2) 0%, hsl(var(--background)) 50%, hsl(var(--muted)/0.2) 100%)',
        }}
      >
        {/* Background effects */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
          <div 
            className="absolute top-0 right-0 w-[300px] h-[300px]"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent)/0.08) 0%, transparent 60%)',
              filter: 'blur(50px)',
            }}
          />
        </motion.div>

        <div className="container max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div className="inline-flex items-center gap-2 mb-3">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Mark Your Calendar
              </span>
            </motion.div>
            
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-[1.1] mb-2" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Upcoming{' '}
              <span className="text-primary">Events</span>
            </h2>
            
            <p 
              className="text-sm text-muted-foreground"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Tap each event to learn more
            </p>
          </motion.div>

          {/* Events Grid - Mobile optimized */}
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                className="group relative cursor-pointer"
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Card glow */}
                <motion.div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${event.glowColor}, transparent 70%)`,
                    filter: 'blur(15px)',
                  }}
                />
                
                {/* Border */}
                <div 
                  className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${event.glowColor}, transparent 60%)` }}
                />
                
                {/* Card */}
                <div 
                  className="relative h-full rounded-2xl p-4 md:p-5 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.9))',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.gradient}`} />
                  
                  {/* Clickable indicator */}
                  <motion.div 
                    className="absolute top-3 right-3"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Info className="w-4 h-4 text-muted-foreground opacity-50 group-hover:opacity-100" />
                  </motion.div>
                  
                  {/* Featured badge */}
                  {event.featured && (
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase mb-3"
                      style={{ background: event.glowColor, color: '#0a1628' }}
                    >
                      <Sparkles className="w-2 h-2" />
                      Featured
                    </span>
                  )}
                  
                  {/* Icon */}
                  <motion.div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${event.gradient}`}
                    style={{ boxShadow: `0 6px 20px ${event.glowColor}` }}
                  >
                    <event.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 
                    className="text-base font-medium text-foreground mb-1.5" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {event.title}
                  </h3>
                  
                  {/* Description */}
                  <p 
                    className="text-xs text-muted-foreground mb-3 line-clamp-2"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {event.description}
                  </p>
                  
                  {/* Quick info */}
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time.split(' ')[0]}</span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <motion.div 
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase"
                    style={{ color: event.glowColor.replace('0.4', '1') }}
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span>Tap for details</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Events;
