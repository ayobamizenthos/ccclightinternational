import { Youtube, Facebook, Instagram, Play, Radio, Wifi, Tv, Signal, Zap } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { branches, serviceTimes } from "@/data/branches";

// Service schedule check
const SERVICE_SCHEDULE = [
  { day: 0, startHour: 10, endHour: 14 }, // Sunday 10 AM - 2 PM
  { day: 3, startHour: 9, endHour: 10 },  // Wednesday 9 AM - 10 AM
  { day: 3, startHour: 18, endHour: 20 }, // Wednesday 6 PM - 8 PM
  { day: 5, startHour: 15, endHour: 16 }, // Friday 3 PM - 4 PM (Pregnant Women)
  { day: 5, startHour: 18, endHour: 21 }, // Friday 6 PM - 9 PM (Power Day)
];

const isServiceLive = (): boolean => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  
  return SERVICE_SCHEDULE.some(schedule => 
    schedule.day === currentDay && 
    currentHour >= schedule.startHour && 
    currentHour < schedule.endHour
  );
};

const getNextService = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  
  // Find next service from serviceTimes
  const sundayService = serviceTimes.find(s => s.day === "Sunday");
  if (sundayService) {
    if (currentDay === 0 && currentHour < 10) {
      return "Today at 10:00 AM";
    } else if (currentDay < 3) {
      return "Wednesday at 9:00 AM";
    } else if (currentDay === 3 && currentHour < 9) {
      return "Today at 9:00 AM";
    } else if (currentDay < 5) {
      return "Friday at 6:00 PM";
    } else if (currentDay === 5 && currentHour < 18) {
      return "Today at 6:00 PM";
    } else {
      return "Sunday at 10:00 AM";
    }
  }
  return "Sunday at 10:00 AM";
};

const LiveService = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLive, setIsLive] = useState(false);
  const [nextService, setNextService] = useState("Sunday at 10:00 AM");
  
  const headquarters = branches.find(b => b.isHeadquarters);
  
  useEffect(() => {
    setIsLive(isServiceLive());
    setNextService(getNextService());
    const interval = setInterval(() => {
      setIsLive(isServiceLive());
      setNextService(getNextService());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Updated social platforms with correct CCC Light International links
  const platforms = [
    { 
      name: "YouTube", 
      icon: Youtube, 
      href: headquarters?.socials.youtube || "https://www.youtube.com/@CCCLIGHTINTERNATIONAL", 
      gradient: "from-red-600 to-red-500", 
      glow: "rgba(239,68,68,0.4)" 
    },
    { 
      name: "Facebook", 
      icon: Facebook, 
      href: headquarters?.socials.facebook || "https://www.facebook.com/ImoleGlobalMediaccc/about", 
      gradient: "from-blue-600 to-blue-500", 
      glow: "rgba(59,130,246,0.4)" 
    },
    { 
      name: "TikTok", 
      icon: FaTiktok, 
      href: headquarters?.socials.tiktok || "https://www.tiktok.com/@ccc_lightfamilyngn", 
      gradient: "from-slate-800 to-slate-700", 
      glow: "rgba(100,116,139,0.4)" 
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: headquarters?.socials.instagram || "https://www.instagram.com/ccclightintparishajman_uae/", 
      gradient: "from-pink-600 to-purple-600", 
      glow: "rgba(236,72,153,0.4)" 
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="live" 
      className="py-20 md:py-32 lg:py-40 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050d1a 0%, #0a1628 30%, #0d1f3c 50%, #0a1628 70%, #050d1a 100%)",
      }}
    >
      {/* Live Service Glow Effect */}
      {isLive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              'inset 0 0 100px rgba(16,185,129,0.1)',
              'inset 0 0 200px rgba(16,185,129,0.2)',
              'inset 0 0 100px rgba(16,185,129,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      
      {/* Cinematic ambient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main central glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[500px] md:h-[800px]"
          style={{ 
            opacity: glowOpacity,
            background: "radial-gradient(ellipse at center, hsl(var(--primary)/0.2) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        
        {/* Floating ethereal orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 22}%`,
              background: i % 2 === 0 
                ? `radial-gradient(circle, hsl(var(--primary)/${0.08 - i * 0.005}) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(16,185,129,${0.05 - i * 0.003}) 0%, transparent 70%)`,
              filter: 'blur(30px)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated grid lines */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary)/0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.4) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            y: backgroundY,
          }}
        />

        {/* Cinematic light rays */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--primary)/0.4), transparent 30%, transparent 70%, hsl(var(--primary)/0.3))',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-14 md:mb-20">
          <ScrollReveal>
            <motion.div 
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: isLive 
                    ? 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))'
                    : 'linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--primary)/0.1))',
                  border: isLive 
                    ? '1px solid rgba(16,185,129,0.4)'
                    : '1px solid hsl(var(--primary)/0.4)',
                }}
                animate={{
                  boxShadow: isLive ? [
                    '0 0 15px rgba(16,185,129,0.3)',
                    '0 0 30px rgba(16,185,129,0.6)',
                    '0 0 15px rgba(16,185,129,0.3)',
                  ] : [
                    '0 0 15px hsl(var(--primary)/0.2)',
                    '0 0 25px hsl(var(--primary)/0.4)',
                    '0 0 15px hsl(var(--primary)/0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Signal className={`w-4 h-4 ${isLive ? 'text-emerald-400' : 'text-primary-light'}`} />
              </motion.div>
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: isLive 
                    ? 'linear-gradient(90deg, #10B981, #34D399, #10B981)'
                    : 'linear-gradient(90deg, hsl(var(--primary)), #D4AF37, hsl(var(--primary)))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isLive ? '🔴 Live Now' : 'Live Streaming'}
              </span>
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
                  border: '1px solid rgba(212,175,55,0.4)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(212,175,55,0.3)',
                    '0 0 25px rgba(212,175,55,0.5)',
                    '0 0 15px rgba(212,175,55,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Tv className="w-4 h-4 text-gold" />
              </motion.div>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-[1.05]" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Join Our{" "}
              <span className="relative inline-block">
                <span
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 50%, hsl(var(--primary)) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Live Service
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[3px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), #D4AF37, transparent)',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <p 
              className="text-white/50 text-lg md:text-2xl max-w-xl mx-auto leading-relaxed" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Experience divine worship from anywhere in the world
            </p>
          </ScrollReveal>
        </div>

        {/* Premium Video Card */}
        <ScrollReveal delay={0.2}>
          <motion.div 
            className="relative max-w-4xl mx-auto mb-16 md:mb-24"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            {/* Outer glow ring */}
            <motion.div 
              className="absolute -inset-4 rounded-[2rem] opacity-60"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)/0.3), transparent 40%, transparent 60%, rgba(16,185,129,0.25))',
                filter: 'blur(30px)',
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Card border glow */}
            <div 
              className="absolute -inset-[1px] rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)/0.6), rgba(16,185,129,0.4), hsl(var(--primary)/0.5))',
                opacity: 0.6,
              }}
            />
            
            {/* Main card */}
            <div 
              className="relative aspect-[16/10] md:aspect-video rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(10,22,40,0.98), rgba(15,30,55,0.95), rgba(10,22,40,0.98))',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* Animated grid pattern */}
              <motion.div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'linear-gradient(hsl(var(--primary)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.5) 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '50px 50px'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Radial spotlight effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(var(--primary)/0.1) 0%, transparent 60%)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12">
                {/* Status badge */}
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
                  style={{
                    background: isLive 
                      ? 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.15))'
                      : 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))',
                    border: isLive 
                      ? '1px solid rgba(239,68,68,0.5)'
                      : '1px solid rgba(16,185,129,0.4)',
                    boxShadow: isLive 
                      ? '0 10px 40px rgba(239,68,68,0.2)'
                      : '0 10px 40px rgba(16,185,129,0.15)',
                  }}
                  animate={{ 
                    boxShadow: isLive ? [
                      '0 10px 40px rgba(239,68,68,0.15)',
                      '0 10px 50px rgba(239,68,68,0.3)',
                      '0 10px 40px rgba(239,68,68,0.15)',
                    ] : [
                      '0 10px 40px rgba(16,185,129,0.15)',
                      '0 10px 50px rgba(16,185,129,0.25)',
                      '0 10px 40px rgba(16,185,129,0.15)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <motion.div 
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${isLive ? 'bg-red-500' : 'bg-emerald-400'}`}
                    animate={{ 
                      scale: [1, 1.4, 1],
                      boxShadow: isLive ? [
                        '0 0 0 0 rgba(239,68,68,0.4)',
                        '0 0 0 8px rgba(239,68,68,0)',
                        '0 0 0 0 rgba(239,68,68,0)',
                      ] : [
                        '0 0 0 0 rgba(16,185,129,0.4)',
                        '0 0 0 8px rgba(16,185,129,0)',
                        '0 0 0 0 rgba(16,185,129,0)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className={`${isLive ? 'text-red-400' : 'text-emerald-400'} text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase`}>
                    {isLive ? 'Live Now' : 'Coming Soon'}
                  </span>
                </motion.div>
                
                {/* Premium Play button */}
                <motion.a
                  href={headquarters?.socials.youtube || "https://www.youtube.com/@CCCLIGHTINTERNATIONAL"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mb-4 sm:mb-6 md:mb-10"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Outer pulse rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `2px solid ${isLive ? 'rgba(239,68,68,0.3)' : 'hsl(var(--primary)/0.35)'}`,
                      }}
                      animate={{
                        scale: [1, 2 + i * 0.5],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                  
                  {/* Main play button */}
                  <div 
                    className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      background: isLive 
                        ? 'linear-gradient(135deg, #DC2626, #EF4444)'
                        : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))',
                      boxShadow: isLive 
                        ? '0 15px 50px rgba(239,68,68,0.5), inset 0 -2px 10px rgba(0,0,0,0.1)'
                        : '0 15px 50px hsl(var(--primary)/0.5), inset 0 -2px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/* Shimmer overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                        }}
                        animate={{
                          x: ['-150%', '150%'],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>
                    
                    <Play className="w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white ml-0.5 sm:ml-1 relative z-10" fill="currentColor" />
                  </div>
                </motion.a>
                
                {/* Next service info */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <p 
                    className="text-[9px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold mb-1.5 sm:mb-2 md:mb-3"
                    style={{ 
                      fontFamily: 'Outfit, sans-serif',
                      color: 'hsl(var(--primary)/0.9)',
                    }}
                  >
                    {isLive ? 'Join Now' : 'Next Service'}
                  </p>
                  <p 
                    className="text-white text-lg sm:text-2xl md:text-4xl font-light" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {isLive ? 'Service in Progress' : nextService}
                  </p>
                </motion.div>
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-5 left-5 w-12 h-12 border-l-2 border-t-2 border-primary/50 rounded-tl-xl" />
              <div className="absolute top-5 right-5 w-12 h-12 border-r-2 border-t-2 border-primary/50 rounded-tr-xl" />
              <div className="absolute bottom-5 left-5 w-12 h-12 border-l-2 border-b-2 border-primary/50 rounded-bl-xl" />
              <div className="absolute bottom-5 right-5 w-12 h-12 border-r-2 border-b-2 border-primary/50 rounded-br-xl" />
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Platform buttons section */}
        <ScrollReveal delay={0.3}>
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Radio className="w-4 h-4 text-primary-light" />
              <span 
                className="text-xs md:text-sm font-medium tracking-wider uppercase text-white/60"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Available On All Platforms
              </span>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {platforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -4,
                    background: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    boxShadow: `0 15px 40px ${platform.glow}`,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Icon container with gradient */}
                  <div 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${platform.gradient}`}
                    style={{
                      boxShadow: `0 6px 20px ${platform.glow}`,
                    }}
                  >
                    <platform.icon className="w-4 h-4 text-white" />
                  </div>
                  <span 
                    className="text-sm font-medium text-white/80 group-hover:text-white transition-colors"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {platform.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LiveService;
