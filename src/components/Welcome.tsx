import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import AnimatedCounter from "./AnimatedCounter";
import imoleExterior from "@/assets/imole-exterior.png";

// Optimized inline SVG icons
const TargetIcon = memo(() => (
  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
));

const EyeIcon = memo(() => (
  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
));

const HeartIcon = memo(() => (
  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
));

const SparklesIcon = memo(() => (
  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
));

const ChurchIcon = memo(() => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/>
  </svg>
));

const UsersIcon = memo(() => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
));

const GlobeIcon = memo(() => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
));

const ArrowRightIcon = memo(() => (
  <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
));

const Welcome = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const stats = [
    { label: "Global Parishes", value: 6, suffix: "", Icon: GlobeIcon, color: "hsl(var(--primary))" },
    { label: "Members", value: 5000, suffix: "+", Icon: UsersIcon, color: "hsl(var(--gold))" },
    { label: "Countries", value: 4, suffix: "", Icon: ChurchIcon, color: "hsl(var(--tertiary))" },
  ];

  const missions = [
    { 
      title: "Our Mission", 
      text: "Spreading the gospel of Jesus Christ and leading souls to salvation through worship, prayer, and fellowship.", 
      Icon: TargetIcon, 
      gradient: "from-primary to-primary-light"
    },
    { 
      title: "Our Vision", 
      text: "A divine beacon of light touching lives globally, as the last ark of salvation for humanity.", 
      Icon: EyeIcon, 
      gradient: "from-gold to-gold-bright"
    },
    { 
      title: "Our Values", 
      text: "Faith, holiness, love, unity, and dedicated service to God and humanity.", 
      Icon: HeartIcon, 
      gradient: "from-tertiary to-tertiary-light"
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--celestial-pale)/0.25) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Ambient Effects */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
      <motion.div 
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3 }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-5 md:px-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          
          {/* Left: Image with Premium Frame */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Outer Glow */}
            <div 
              className="absolute -inset-6 rounded-3xl opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            
            {/* Premium Border Frame */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl md:rounded-[2rem]"
              style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
              }}
            />
            
            {/* Image Container */}
            <div 
              className="relative rounded-3xl md:rounded-[2rem] overflow-hidden aspect-[4/3]"
              style={{
                boxShadow: '0 40px 80px rgba(14,116,144,0.15)',
              }}
            >
              <motion.div 
                className="absolute inset-0 will-change-transform"
                style={{ scale: imageScale, y: imageY }}
              >
                <img 
                  src={imoleExterior} 
                  alt="CCC Light International Parish Alagbado Headquarters" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep)/0.6)] via-transparent to-transparent" />
              
              {/* Stats Overlay */}
              <motion.div 
                className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div 
                  className="grid grid-cols-3 gap-3 md:gap-5 p-4 md:p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(255,255,255,0.5)',
                  }}
                >
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div 
                        className="text-2xl md:text-4xl font-medium"
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          color: stat.color,
                        }}
                      >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1800} />
                      </div>
                      <p 
                        className="text-[8px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Section Badge */}
            <motion.div 
              className="inline-flex items-center gap-2.5 mb-5"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))',
                  border: '1px solid rgba(14,165,233,0.25)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(14,165,233,0.15)',
                    '0 0 35px rgba(14,165,233,0.3)',
                    '0 0 20px rgba(14,165,233,0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <SparklesIcon />
              </motion.div>
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Welcome
              </span>
            </motion.div>
            
            {/* Heading */}
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-foreground leading-[1.08]" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              A Global Sanctuary of{' '}
              <span 
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gold)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Divine Light
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary via-gold to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed mb-8" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              CCC Light International Parish (Imole) stands as a beacon of divine light, 
              spreading across Nigeria, UAE, and Georgia. As part of the Celestial Church of Christ, 
              we carry the sacred mission of being the last ark of salvation.
            </motion.p>

            {/* Mission Cards */}
            <div className="space-y-4">
              {missions.map((item, index) => (
                <motion.div 
                  key={index}
                  className="group flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
                    border: '1px solid rgba(14,165,233,0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ 
                    x: 6,
                    boxShadow: '0 10px 40px rgba(14,165,233,0.1)',
                    borderColor: 'rgba(14,165,233,0.25)',
                  }}
                >
                  <motion.div 
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.gradient}`}
                    style={{
                      boxShadow: '0 8px 25px rgba(14,165,233,0.25)',
                    }}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                  >
                    <item.Icon />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-base md:text-lg font-medium text-foreground mb-1 flex items-center gap-2" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {item.title}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        <ArrowRightIcon />
                      </span>
                    </h3>
                    <p 
                      className="text-sm md:text-base text-muted-foreground leading-relaxed"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Welcome;