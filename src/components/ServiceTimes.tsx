import { Sparkles, ChevronRight, Cross, MapPin, ArrowRight, Mail, ExternalLink, Phone, Star, Calendar, Clock, ChevronLeft } from "lucide-react";
import { memo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { serviceTimes } from "@/data/branches";
import imoleExterior from '@/assets/imole-exterior-1024.webp';
import { useIsMobile } from "@/hooks/use-mobile";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

const ServiceTimes = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const {
    currentIndex,
    swipeOffset,
    isSwiping,
    handlers,
    goTo,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
  } = useSwipeNavigation({ itemCount: serviceTimes.length });

  const handleFindUs = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Pole+6+Nureni+Yusuff+Lane+Alagbado+Lagos+Nigeria",
      "_blank"
    );
  };

  const renderServiceCard = (service: typeof serviceTimes[0], index: number, isCompact: boolean = false) => (
    <motion.div
      key={`${service.day}-${service.time}`}
      className={`group relative ${isCompact ? 'w-[260px] flex-shrink-0' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {/* Hover Glow Effect */}
      <motion.div 
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at center, ${service.glowColor}, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Featured Border Animation */}
      {service.featured && (
        <motion.div 
          className="absolute -inset-[2px] rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(14,165,233,0.6), rgba(212,175,55,0.4), rgba(14,165,233,0.6))',
          }}
          animate={{
            background: [
              'linear-gradient(0deg, rgba(14,165,233,0.6), rgba(212,175,55,0.4), rgba(14,165,233,0.6))',
              'linear-gradient(90deg, rgba(14,165,233,0.6), rgba(212,175,55,0.4), rgba(14,165,233,0.6))',
              'linear-gradient(180deg, rgba(14,165,233,0.6), rgba(212,175,55,0.4), rgba(14,165,233,0.6))',
              'linear-gradient(270deg, rgba(14,165,233,0.6), rgba(212,175,55,0.4), rgba(14,165,233,0.6))',
              'linear-gradient(360deg, rgba(14,165,233,0.6), rgba(212,175,55,0.4), rgba(14,165,233,0.6))',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {/* Card - Compact sizing */}
      <motion.div 
        className={`relative rounded-2xl ${isCompact ? 'p-4' : 'p-5 md:p-6'} h-full overflow-hidden transition-all duration-400 ${isCompact ? 'min-h-[180px]' : 'min-h-[200px] md:min-h-[240px]'} flex flex-col`}
        style={{
          background: service.featured 
            ? 'linear-gradient(160deg, hsl(var(--navy-deep)) 0%, hsl(var(--primary-dark)) 50%, hsl(var(--navy-deep)) 100%)'
            : 'linear-gradient(160deg, rgba(255,255,255,0.98), rgba(250,252,255,0.92))',
          boxShadow: service.featured 
            ? '0 20px 50px rgba(14,116,144,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 15px 40px rgba(14,116,144,0.06), inset 0 1px 0 rgba(255,255,255,1)',
          border: service.featured ? 'none' : '1px solid rgba(14,165,233,0.08)',
        }}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Featured Ribbon */}
        {service.featured && (
          <div className="absolute -right-8 top-4 z-20">
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <div 
                className="px-10 py-1.5 text-center rotate-45 transform origin-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)), hsl(var(--primary)))',
                  boxShadow: '0 4px 20px rgba(14,165,233,0.5)',
                }}
              >
                <span 
                  className="text-[7px] font-bold tracking-[0.1em] uppercase text-white whitespace-nowrap"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Lord's Day
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Time Display */}
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className={`${isCompact ? 'w-7 h-7' : 'w-8 h-8'} rounded-lg flex items-center justify-center`}
              style={{
                background: `linear-gradient(135deg, ${service.glowColor}40, ${service.glowColor}15)`,
                border: `1px solid ${service.glowColor}50`,
              }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Clock className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${service.featured ? 'text-primary-light' : ''}`} style={{ color: service.featured ? undefined : service.accent }} />
            </motion.div>
            <span 
              className={`${isCompact ? 'text-xl' : 'text-2xl md:text-3xl'} font-light tabular-nums tracking-tight ${service.featured ? 'text-white' : 'text-foreground'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {service.time}
            </span>
          </div>
          
          {/* Day Title */}
          <h3 
            className={`${isCompact ? 'text-lg' : 'text-xl md:text-2xl'} font-medium mb-1 ${service.featured ? 'text-white' : 'text-foreground'}`} 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {service.day}
          </h3>
          
          {/* Service Type Badge */}
          <div className="flex items-center gap-2 mb-2">
            <div 
              className={`${isCompact ? 'w-6' : 'w-8'} h-0.5 rounded-full bg-gradient-to-r ${service.iconGradient}`}
            />
            <p 
              className={`${isCompact ? 'text-[10px]' : 'text-xs'} font-semibold tracking-wide ${service.featured ? 'text-primary-light' : 'text-primary'}`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {service.type}
            </p>
          </div>
          
          {/* Description */}
          <p 
            className={`${isCompact ? 'text-[10px]' : 'text-xs md:text-[13px]'} leading-relaxed line-clamp-2 ${service.featured ? 'text-white/75' : 'text-muted-foreground'}`}
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {service.description}
          </p>
        </div>

        {/* Bottom Accent */}
        <motion.div 
          className={`${isCompact ? 'mt-3 pt-2' : 'mt-4 pt-3'} border-t`}
          style={{ borderColor: service.featured ? 'rgba(255,255,255,0.1)' : 'rgba(14,165,233,0.1)' }}
        >
          <div className="flex items-center justify-between">
            <span 
              className={`${isCompact ? 'text-[8px]' : 'text-[10px]'} font-medium tracking-wide ${service.featured ? 'text-white/50' : 'text-muted-foreground/60'}`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              All are welcome
            </span>
            <motion.div
              className={`flex items-center gap-1 ${isCompact ? 'text-[8px]' : 'text-[10px]'} font-medium ${service.featured ? 'text-primary-light' : 'text-primary'}`}
              whileHover={{ x: 3 }}
            >
              <Star className={`${isCompact ? 'w-2 h-2' : 'w-2.5 h-2.5'}`} fill="currentColor" />
              <span style={{ fontFamily: 'Outfit, sans-serif' }}>Join us</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
    <section 
      ref={sectionRef} 
      id="services" 
      className="py-16 md:py-24 lg:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--celestial-pale)/0.2) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Premium Ambient Effects */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      <div className="container max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Premium Badge */}
          <motion.div 
            className="inline-flex items-center gap-2.5 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(14,165,233,0.05))',
                border: '1px solid rgba(14,165,233,0.3)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(14,165,233,0.2)',
                  '0 0 40px rgba(14,165,233,0.4)',
                  '0 0 20px rgba(14,165,233,0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calendar className="w-4 h-4 text-primary" />
            </motion.div>
            <span 
              className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Weekly Schedule
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4 leading-[1.1]" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Service{' '}
            <span 
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 50%, hsl(var(--primary)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Times
              <motion.span 
                className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          
          <p 
            className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Join us in moments of divine encounter and spiritual renewal
          </p>
        </motion.div>

        {/* Services - Horizontal Scrollable on Mobile */}
        {isMobile ? (
          <div className="relative">
            {/* Swipe Container */}
            <div
              className="overflow-x-auto scrollbar-hide touch-pan-x pb-4 -mx-5 px-5"
              style={{ 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {serviceTimes.map((service, index) => (
                  <motion.div 
                    key={`${service.day}-${service.time}`} 
                    className="scroll-snap-align-start"
                    style={{ scrollSnapAlign: 'start' }}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 25
                    }}
                  >
                    {renderServiceCard(service, index, true)}
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Premium Swipe Indicator */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {/* Left Arrow Indicator */}
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(14,165,233,0.05))',
                  border: '1px solid rgba(14,165,233,0.2)',
                }}
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronLeft className="w-4 h-4 text-primary" />
              </motion.div>
              
              {/* Swipe Text */}
              <motion.div
                className="flex items-center gap-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <motion.div 
                  className="flex gap-1"
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)',
                      }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
                <span 
                  className="text-[10px] tracking-[0.15em] uppercase text-primary font-medium"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {serviceTimes.length} Services • Swipe
                </span>
                <motion.div 
                  className="flex gap-1"
                  animate={{ x: [5, -5, 5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, hsl(var(--primary)))',
                      }}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Right Arrow Indicator */}
              <motion.div
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4" style={{ color: '#D4AF37' }} />
              </motion.div>
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {serviceTimes.map((service, index) => renderServiceCard(service, index, false))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-12 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => setIsDialogOpen(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
              color: 'white',
              boxShadow: '0 15px 50px rgba(14,116,144,0.3)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 60px rgba(14,116,144,0.4)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Plan Your Visit</span>
            <motion.div
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>

    {/* Premium Dialog */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent 
        className="sm:max-w-lg p-0 overflow-hidden rounded-3xl border-0 mx-4"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
          boxShadow: '0 30px 100px rgba(14,116,144,0.2), 0 0 0 1px rgba(14,165,233,0.1)',
        }}
      >
        {/* Image Header */}
        <motion.div 
          className="aspect-video relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={imoleExterior} 
            alt="CCC Light International Parish Headquarters" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.9), rgba(14,116,144,0.9))',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-semibold tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Headquarters
            </span>
          </motion.div>
        </motion.div>
        
        <div className="p-6 md:p-7 space-y-5">
          <DialogHeader>
            <DialogTitle 
              className="text-xl md:text-2xl font-medium text-foreground"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Visit Our Headquarters
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Pole 6, Nureni Yusuff Lane
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Alagbado, Lagos, Nigeria
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a 
                href="tel:+2347035041566" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                +234 703 504 1566
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a 
                href="mailto:ccclightinternationalparish@gmail.com" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                ccclightinternationalparish@gmail.com
              </a>
            </div>
          </div>
          
          <motion.button
            onClick={handleFindUs}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
              color: 'white',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            Get Directions
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
});

ServiceTimes.displayName = 'ServiceTimes';

export default ServiceTimes;