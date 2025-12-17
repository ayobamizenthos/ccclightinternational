import { memo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Quote, Star, Heart, ChevronLeft, ChevronRight, Globe2, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: "Chief Mrs. Adebola Okonkwo",
    role: "Business Executive",
    quote: "Joining CCC Light International was the turning point of my life. The prophetic guidance led to divine connections that transformed my business empire.",
    highlight: "Divine Transformation",
    location: "Lagos, Nigeria",
  },
  {
    id: 2,
    name: "Dr. Emmanuel Bassey",
    role: "Consultant Surgeon",
    quote: "As a medical professional, I've witnessed countless miracles here that science cannot explain. CCC Light is a portal to the divine.",
    highlight: "Miraculous Encounters",
    location: "Dubai, UAE",
  },
  {
    id: 3,
    name: "Barrister Funke Ademola",
    role: "Legal Practitioner",
    quote: "The integrity taught here has elevated my career beyond imagination. Every prophecy spoken over my family has manifested.",
    highlight: "Destiny Fulfilled",
    location: "Alagbado, Nigeria",
  },
  {
    id: 4,
    name: "Engr. Solomon Adeyinka",
    role: "CEO, Tech Firm",
    quote: "From financial breakthrough to spiritual enlightenment, my testimony is endless. A truly celestial family across nations.",
    highlight: "Global Blessings",
    location: "Tbilisi, Georgia",
  },
  {
    id: 5,
    name: "Lady Evang. Chioma Obi",
    role: "Philanthropist",
    quote: "The women's fellowship has produced queens. Barren women have become mothers, broken marriages restored.",
    highlight: "Divine Restoration",
    location: "Ikorodu, Nigeria",
  },
  {
    id: 6,
    name: "Pastor David Akintunde",
    role: "International Missionary",
    quote: "I've served in churches across three continents, but the spiritual depth here is unparalleled. The fire of God burns brightest.",
    highlight: "Prophetic Excellence",
    location: "Abu Dhabi, UAE",
  },
];

const Testimonials = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  }, [goToNext, goToPrev]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];
  const nextIndex = (currentIndex + 1) % testimonials.length;
  const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;

  return (
    <section 
      className="py-12 md:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)/0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header - Compact */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <motion.div className="inline-flex items-center gap-2 mb-3">
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--primary)/0.08))',
                  border: '1px solid hsl(var(--primary)/0.3)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 15px hsl(var(--primary)/0.2)',
                    '0 0 30px hsl(var(--primary)/0.4)',
                    '0 0 15px hsl(var(--primary)/0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              </motion.div>
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Testimonies
              </span>
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <Globe2 className="w-4 h-4 text-gold" />
              </motion.div>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2 leading-tight" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Lives{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Transformed
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Testimonial Card Container - Mobile Optimized with Peek Effect */}
        <div ref={containerRef} className="relative max-w-md mx-auto">
          {/* Peek indicators showing more content */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-24 bg-gradient-to-r from-muted/20 to-transparent rounded-r-xl opacity-60 -translate-x-2 pointer-events-none z-0" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-24 bg-gradient-to-l from-muted/20 to-transparent rounded-l-xl opacity-60 translate-x-2 pointer-events-none z-0" />

          {/* Main Swipeable Card */}
          <div className="relative h-[320px] md:h-[340px] touch-pan-y">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                {/* Premium Glass Card */}
                <div 
                  className="h-full mx-2 p-5 md:p-6 rounded-2xl overflow-hidden backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
                    border: '1px solid hsl(var(--primary)/0.15)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.8) inset',
                  }}
                >
                  {/* Header with Quote and Stars */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05))',
                        border: '1px solid hsl(var(--primary)/0.2)',
                      }}
                    >
                      <Quote className="w-4 h-4 text-primary" />
                    </motion.div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  {/* Highlight Badge */}
                  <div className="mb-3">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--accent)/0.15), hsl(var(--accent)/0.05))',
                        color: 'hsl(var(--accent))',
                        fontFamily: 'Outfit, sans-serif',
                        border: '1px solid hsl(var(--accent)/0.2)',
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      {currentTestimonial.highlight}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p 
                    className="text-foreground/85 mb-4 leading-relaxed line-clamp-4"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}
                  >
                    "{currentTestimonial.quote}"
                  </p>

                  {/* Author Section */}
                  <div className="flex items-center gap-3 pt-3 border-t border-primary/10 mt-auto">
                    <motion.div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.8))',
                        color: 'white',
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: '0 4px 16px hsl(var(--primary)/0.3)',
                      }}
                    >
                      {currentTestimonial.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p 
                        className="text-sm font-semibold text-foreground truncate"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {currentTestimonial.name}
                      </p>
                      <p 
                        className="text-[10px] text-muted-foreground"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {currentTestimonial.role}
                      </p>
                      <p 
                        className="text-[9px] text-primary/70 mt-0.5"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        📍 {currentTestimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Swipe hint */}
                  <motion.div 
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground/60 flex items-center gap-1"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    <span>Swipe</span>
                    <ChevronRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Aesthetic Design */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={goToPrev}
              className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                border: '1px solid hsl(var(--primary)/0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </motion.button>

            {/* Dot Indicators - Aesthetic */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className="relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: index === currentIndex 
                        ? 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)'
                        : 'hsl(var(--muted-foreground)/0.3)',
                    }}
                    animate={index === currentIndex ? {
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        '0 0 0 0 hsl(var(--primary)/0.3)',
                        '0 0 0 6px hsl(var(--primary)/0)',
                        '0 0 0 0 hsl(var(--primary)/0.3)',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: index === currentIndex ? Infinity : 0 }}
                  />
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                border: '1px solid hsl(var(--primary)/0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <span 
              className="text-xs text-muted-foreground"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {currentIndex + 1} of {testimonials.length} testimonies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
