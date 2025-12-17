import { useEffect, useState, useRef, memo } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Play, MapPin, ChevronDown, Sparkles, Globe, X, Church } from "lucide-react";
import { branches } from "@/data/branches";

// Import hero image as module for Vite optimization
import imoleExterior from "@/assets/imole-exterior.png";
import akokaExterior from "@/assets/church-exterior-glade.jpg";

// Service schedule for live detection
const SERVICE_SCHEDULE = [
  { day: 0, start: 10, end: 14, name: "Sunday Service" },
  { day: 2, start: 9, end: 10, name: "Tuesday Morning Prayer" },
  { day: 3, start: 9, end: 10, name: "Wednesday Seekers Service" },
  { day: 3, start: 18, end: 20, name: "Wednesday Mercy Day" },
  { day: 5, start: 18, end: 21, name: "Friday Power Day" },
];

const Hero = memo(() => {
  const [showTitle, setShowTitle] = useState(false);
  const [titleSlammed, setTitleSlammed] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const shakeControls = useAnimation();

  const headquarters = branches.find(b => b.isHeadquarters);

  // Group branches by country
  const branchesByCountry = branches.reduce((acc, branch) => {
    const country = branch.address.country || 'Nigeria';
    if (!acc[country]) acc[country] = [];
    acc[country].push(branch);
    return acc;
  }, {} as Record<string, typeof branches>);

  // Preload hero image immediately
  useEffect(() => {
    const img = new Image();
    img.src = imoleExterior;
    img.onload = () => setHeroImageLoaded(true);
    const timeout = setTimeout(() => setHeroImageLoaded(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Check if currently live - only once on mount
  useEffect(() => {
    const checkIfLive = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const liveService = SERVICE_SCHEDULE.find(
        (service) => service.day === currentDay && currentHour >= service.start && currentHour < service.end
      );
      const isLiveNow = !!liveService;
      console.log('[Hero] Live service check:', { currentDay, currentHour, liveService, isLiveNow });
      setIsLive(isLiveNow);
    };
    checkIfLive();
    // Check only every 5 minutes instead of every minute
    const interval = setInterval(checkIfLive, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Simple shake on title slam - no vibration
  useEffect(() => {
    if (titleSlammed) {
      shakeControls.start({
        x: [0, -4, 4, -2, 2, 0],
        transition: { duration: 0.3, ease: "easeOut" }
      });
    }
  }, [titleSlammed, shakeControls]);

  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBranches = () => {
    document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      ref={heroRef} 
      className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center"
      animate={shakeControls}
    >
      {/* Background - No parallax for performance */}
      <div className="absolute inset-0">
        {/* Placeholder gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          style={{ opacity: heroImageLoaded ? 0 : 1, transition: 'opacity 0.5s ease-out' }}
        />
        
        {/* Hero image */}
        <img 
          src={imoleExterior} 
          alt="CCC Light International Parish - Headquarters" 
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          style={{ opacity: heroImageLoaded ? 1 : 0 }}
          onLoad={() => setHeroImageLoaded(true)}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{
          background: 'linear-gradient(to top, rgba(139,90,43,0.35) 0%, transparent 100%)'
        }} />
      </div>

      {/* Simple impact flash on slam */}
      {titleSlammed && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.6) 0%, transparent 50%)' }}
        />
      )}

      <div className="relative z-10 w-full px-4 pt-16 pb-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Church Badge - Compact */}
          <motion.div 
            className="mb-4" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span 
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase bg-black/50 backdrop-blur-xl border border-white/25 text-white/90 shadow-lg" 
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Celestial Church of Christ
            </span>
          </motion.div>

          {/* IMOLE Title - Enhanced Premium Design */}
          <div className="relative mb-1">
            <motion.h1
              className="relative"
              initial={{ opacity: 0, scale: 1.5, y: -50 }}
              animate={showTitle ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 0.03, 0.26, 1] }}
              onAnimationComplete={() => setTitleSlammed(true)}
            >
              {/* Decorative elements around IMOLE */}
              <motion.div 
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-[2px] hidden sm:block"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8))' }}
                initial={{ scaleX: 0 }}
                animate={titleSlammed ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <motion.div 
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-[2px] hidden sm:block"
                style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.8))' }}
                initial={{ scaleX: 0 }}
                animate={titleSlammed ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              
              <span
                className="block text-[4.5rem] xs:text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-[0.85] font-black tracking-[-0.02em]"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.95) 25%, rgba(100,180,220,0.95) 70%, rgba(59,130,246,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(59,130,246,0.5)',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
                }}
              >
                IMOLE
              </span>
              
              {/* Glow effect behind text */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.2) 0%, transparent 60%)',
                  filter: 'blur(40px)',
                }}
                animate={titleSlammed ? { opacity: [0.5, 0.8, 0.5] } : { opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.h1>
          </div>

          {/* INTERNATIONAL subtitle */}
          <motion.div
            className="mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={titleSlammed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span 
              className="block text-[0.85rem] xs:text-[1rem] sm:text-[1.3rem] md:text-[1.8rem] leading-[1.1] font-medium tracking-[0.3em] sm:tracking-[0.5em] text-white/80" 
              style={{ fontFamily: 'Cinzel, serif', textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
            >
              INTERNATIONAL
            </span>
          </motion.div>

          {/* Decorative divider */}
          <motion.div 
            className="flex items-center justify-center gap-2 sm:gap-3 my-4" 
            initial={{ opacity: 0, scaleX: 0 }} 
            animate={titleSlammed ? { opacity: 1, scaleX: 1 } : {}} 
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent via-gold/50 to-gold/80" />
            <div className="w-2 h-2 rotate-45 bg-gold/70 shadow-lg shadow-gold/30" />
            <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent via-gold/50 to-gold/80" />
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-white/70 text-[clamp(0.85rem,3vw,1.5rem)] max-w-md mx-auto mb-5 font-light tracking-wide" 
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }} 
            initial={{ opacity: 0, y: 20 }} 
            animate={titleSlammed ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            "The Light of the World"
          </motion.p>

          {/* Global Locations Button with Premium Dropdown */}
          <motion.div 
            className="relative mb-5" 
            initial={{ opacity: 0, y: 20 }} 
            animate={titleSlammed ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <button 
              onClick={() => setShowLocations(!showLocations)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(30,30,30,0.7) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.4)',
                boxShadow: showLocations 
                  ? '0 8px 32px rgba(212,175,55,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
                  : '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-semibold tracking-wide text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                6 Global Locations
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-gold/80 transition-transform duration-300 ${showLocations ? 'rotate-180' : ''}`} />
            </button>

            {/* Premium Dropdown */}
            <AnimatePresence>
              {showLocations && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={() => setShowLocations(false)}
                  />
                  
                  {/* Dropdown Panel - Mobile Optimized */}
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-[260px] max-w-[calc(100vw-2rem)]"
                  >
                    <div 
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: 'linear-gradient(165deg, rgba(25,20,15,0.98) 0%, rgba(35,28,20,0.98) 50%, rgba(20,15,10,0.98) 100%)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                      }}
                    >
                      {/* Header - Compact */}
                      <div 
                        className="flex items-center justify-between px-2.5 py-1.5"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                          borderBottom: '1px solid rgba(212,175,55,0.2)',
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <Church className="w-3 h-3 text-gold" />
                          <span className="text-[10px] font-bold text-white tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            Our Parishes
                          </span>
                        </div>
                        <button 
                          onClick={() => setShowLocations(false)}
                          className="p-0.5 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <X className="w-3 h-3 text-white/60" />
                        </button>
                      </div>

                      {/* Locations List - Ultra Compact for Mobile */}
                      <div className="max-h-[200px] overflow-y-auto">
                        {Object.entries(branchesByCountry).map(([country, countryBranches]) => (
                          <div key={country}>
                            {/* Country Header */}
                            <div 
                              className="px-3 py-1"
                              style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.08) 0%, transparent 100%)' }}
                            >
                              <span className="text-[8px] font-bold tracking-[0.12em] uppercase text-gold/80" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                {country}
                              </span>
                            </div>
                            {/* Branches */}
                            {countryBranches.map((branch) => (
                              <motion.button
                                key={branch.id}
                                onClick={() => {
                                  setShowLocations(false);
                                  scrollToBranches();
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 transition-all duration-200"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                whileHover={{ 
                                  backgroundColor: 'rgba(212,175,55,0.1)',
                                  x: 2,
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {/* Compact abbreviation icon for all branches */}
                                <div 
                                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background: branch.isHeadquarters 
                                      ? 'linear-gradient(135deg, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.15) 100%)'
                                      : 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                  }}
                                >
                                  <span className="text-[9px] font-bold text-gold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {branch.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                  </span>
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                  <p className="text-[11px] font-medium text-white leading-tight truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {branch.shortName || branch.name}
                                  </p>
                                  <p className="text-[9px] text-white/45 truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                    {branch.address.city}
                                  </p>
                                </div>
                                {branch.isHeadquarters && (
                                  <span 
                                    className="px-1 py-0.5 rounded text-[7px] font-bold tracking-wider uppercase flex-shrink-0"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.15) 100%)',
                                      color: '#D4AF37',
                                      border: '1px solid rgba(212,175,55,0.4)',
                                    }}
                                  >
                                    HQ
                                  </span>
                                )}
                              </motion.button>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Footer - Compact */}
                      <div 
                        className="px-3 py-2"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 100%)',
                          borderTop: '1px solid rgba(212,175,55,0.15)',
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowLocations(false);
                            scrollToBranches();
                          }}
                          className="w-full py-2 rounded-lg text-gold text-[10px] font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                          style={{ 
                            fontFamily: 'Outfit, sans-serif',
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)',
                            border: '1px solid rgba(212,175,55,0.3)',
                          }}
                        >
                          View All Locations
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action Buttons - Glass-morphism style */}
          <motion.div 
            className="flex items-center justify-center gap-3" 
            initial={{ opacity: 0, y: 20 }} 
            animate={titleSlammed ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <button 
              onClick={() => {
                document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="group relative flex items-center justify-center gap-2 py-3 px-6 rounded-xl overflow-hidden active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.95) 0%, rgba(184,134,11,0.95) 100%)',
                boxShadow: '0 8px 32px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Live Now Indicator */}
              {isLive && (
                <div className="relative mr-0.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ boxShadow: '0 0 8px rgba(239,68,68,0.8)' }} />
                </div>
              )}
              
              <Play className="relative w-4 h-4 fill-black/80 text-black/80" />
              <span className="relative text-black/90 font-bold text-xs tracking-wide uppercase" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.1em' }}>
                {isLive ? "Watch Live" : "Watch Service"}
              </span>
            </button>

            <button 
              onClick={scrollToContent}
              className="group flex items-center justify-center gap-2 py-3 px-6 rounded-xl transition-all duration-300 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(30,30,30,0.7) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <Sparkles className="w-4 h-4 text-gold/80" />
              <span className="text-white font-semibold text-xs tracking-wide uppercase" style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.1em' }}>
                Explore Parish
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Simple scroll indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={titleSlammed ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/25 flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </motion.section>
  );
});

Hero.displayName = 'Hero';

export default Hero;