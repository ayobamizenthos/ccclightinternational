import { Link } from "react-router-dom";
import { sermons } from "@/data/sermons";
import { Play, ArrowRight, Video, Clock, Book, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { SermonsGridSkeleton } from "./ui/skeleton-card";
import { useIsMobile } from "@/hooks/use-mobile";

const SermonsGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const isInView = useInView(gridRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  // Use ALL sermons for swipeable view
  const allSermons = sermons;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const cardWidth = isMobile ? 280 : 340;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = isMobile ? 280 : 340;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      },
    }),
  };

  const renderSermonCard = (sermon: typeof allSermons[0], index: number) => (
    <motion.div
      key={sermon.id}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex-shrink-0 w-[260px] md:w-[320px] snap-start"
    >
      <motion.div 
        className="h-full relative group"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow */}
        <motion.div 
          className="absolute -inset-2 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: 'radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        
        {/* Border gradient */}
        <div 
          className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(16,185,129,0.2), rgba(212,175,55,0.3))',
          }}
        />
        
        {/* Card */}
        <div 
          className="relative h-full rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
            boxShadow: '0 15px 50px rgba(0,0,0,0.06)',
          }}
        >
          {/* Thumbnail */}
          <motion.div 
            className="relative aspect-[16/10] overflow-hidden"
          >
            <LazyImage
              src={sermon.thumbnail}
              alt={sermon.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(0deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.3) 50%, transparent 100%)',
              }}
            />
            
            {/* Play button */}
            <Link 
              to={`/sermon/${sermon.id}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div className="relative">
                {[0, 1].map((i) => (
                  <motion.div 
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ border: '2px solid rgba(212,175,55,0.4)' }}
                    animate={{ 
                      scale: [1, 1.4 + i * 0.2],
                      opacity: [0.6, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
                
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                    boxShadow: '0 8px 25px rgba(212,175,55,0.5)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4 text-[#0a1628] ml-0.5 relative z-10" fill="currentColor" />
                </motion.div>
              </motion.div>
            </Link>
            
            {/* Latest Badge */}
            {index === 0 && (
              <motion.div 
                className="absolute top-3 left-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span 
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-[8px] font-bold tracking-[0.15em] uppercase rounded-full"
                  style={{ 
                    background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                    color: '#0a1628',
                    boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                  }}
                >
                  <motion.div
                    className="w-1 h-1 rounded-full bg-[#0a1628]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Latest
                </span>
              </motion.div>
            )}

            {/* Duration */}
            <div className="absolute bottom-3 right-3">
              <div 
                className="flex items-center gap-1 px-2.5 py-1 backdrop-blur-md rounded-lg"
                style={{
                  background: 'rgba(10,22,40,0.8)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <Clock className="w-2.5 h-2.5 text-gold" />
                <span className="text-[9px] font-semibold text-white">45:00</span>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <div className="p-4 relative">
            {/* Accent line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), #D4AF37, hsl(var(--primary)), transparent)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
            
            {/* Bible reference */}
            <div className="flex items-center gap-1.5 mb-2">
              <div 
                className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))' }}
              >
                <Book className="w-2.5 h-2.5 text-gold" />
              </div>
              <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-gold">
                {sermon.bibleReference}
              </span>
            </div>
            
            {/* Title */}
            <h3 
              className="text-base font-medium mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {sermon.title}
            </h3>
            
            {/* Date */}
            <p className="text-[10px] text-muted-foreground mb-2">
              {sermon.date}
            </p>
            
            {/* Theme */}
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {sermon.theme}
            </p>
            
            {/* CTA */}
            <Link to={`/sermon/${sermon.id}`}>
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{ x: 4 }}
              >
                <span 
                  className="text-xs font-semibold"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Watch Now
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-28 relative overflow-hidden bg-background">
      {/* Background effects */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <motion.div 
          className="absolute top-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px]"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px]"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${25 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          >
            <Star className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'text-gold/40' : 'text-primary/30'}`} fill="currentColor" />
          </motion.div>
        ))}
      </motion.div>

      <div className="container max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <ScrollReveal>
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(212,175,55,0.2)',
                    '0 0 25px rgba(212,175,55,0.4)',
                    '0 0 12px rgba(212,175,55,0.2)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Video className="w-3.5 h-3.5 text-gold" />
              </motion.div>
              <span 
                className="text-[9px] md:text-xs font-bold tracking-[0.25em] uppercase"
                style={{ 
                  background: 'linear-gradient(90deg, hsl(var(--primary)), #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Watch & Listen
              </span>
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))',
                  border: '1px solid rgba(16,185,129,0.3)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              </motion.div>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-2xl sm:text-3xl md:text-5xl font-medium mb-4 leading-[1.1]" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Recent{" "}
              <span 
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10B981 50%, hsl(var(--primary)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sermons
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <p 
              className="text-base max-w-md mx-auto text-muted-foreground"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Swipe through powerful messages of faith
            </p>
          </ScrollReveal>
        </div>

        {/* Swipeable Sermons */}
        <div ref={gridRef} className="relative">
          {isLoading ? (
            <SermonsGridSkeleton count={3} />
          ) : (
            <>
              {/* Scroll Container */}
              <div className="relative -mx-4 md:-mx-8">
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4 snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {allSermons.map((sermon, index) => renderSermonCard(sermon, index))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {/* Prev Button */}
                <motion.button
                  onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: currentIndex > 0 
                      ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))' 
                      : 'hsl(var(--muted))',
                    opacity: currentIndex > 0 ? 1 : 0.5,
                  }}
                  whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className={`w-5 h-5 ${currentIndex > 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </motion.button>

                {/* Premium Dot Indicators */}
                <div className="flex items-center gap-2">
                  {allSermons.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className="relative"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          background: index === currentIndex 
                            ? 'linear-gradient(135deg, #D4AF37, #FFF8E1)' 
                            : 'hsl(var(--muted-foreground)/0.3)',
                          boxShadow: index === currentIndex 
                            ? '0 0 10px rgba(212,175,55,0.5)' 
                            : 'none',
                        }}
                        animate={index === currentIndex ? {
                          scale: [1, 1.3, 1],
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Next Button */}
                <motion.button
                  onClick={() => scrollToIndex(Math.min(allSermons.length - 1, currentIndex + 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: currentIndex < allSermons.length - 1 
                      ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))' 
                      : 'hsl(var(--muted))',
                    opacity: currentIndex < allSermons.length - 1 ? 1 : 0.5,
                  }}
                  whileHover={currentIndex < allSermons.length - 1 ? { scale: 1.1 } : {}}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentIndex === allSermons.length - 1}
                >
                  <ChevronRight className={`w-5 h-5 ${currentIndex < allSermons.length - 1 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </motion.button>
              </div>

              {/* Sermon count indicator */}
              <motion.p 
                className="text-center text-xs text-muted-foreground mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {currentIndex + 1} of {allSermons.length} sermons
              </motion.p>
            </>
          )}
        </div>

        {/* View All CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link to="/sermons">
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05))',
                  border: '1px solid hsl(var(--primary)/0.3)',
                  color: 'hsl(var(--primary))',
                }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: '0 10px 30px hsl(var(--primary)/0.15)',
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                  color: 'hsl(var(--primary-foreground))',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View All Sermons</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SermonsGrid;
