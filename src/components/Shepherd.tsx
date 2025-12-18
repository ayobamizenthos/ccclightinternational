import { Quote, Sparkles, Crown, Star, Church, Users, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import generalOverseer from '@/assets/general-overseer-1024.webp';

const Shepherd = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "3%"]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const highlights = [
    { label: "Divine Guidance", icon: BookOpen },
    { label: "Global Vision", icon: Church },
    { label: "Spiritual Growth", icon: Users },
  ];

  return (
    <section 
      ref={sectionRef}
      id="shepherd" 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--celestial-pale)/0.3) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Premium Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Divine Light Rays */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[150%]"
          style={{
            background: 'conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(14,165,233,0.03) 30deg, transparent 60deg, rgba(212,175,55,0.02) 90deg, transparent 120deg)',
            y: parallaxY,
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Main Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Outer Premium Glow */}
          <div 
            className="absolute -inset-4 md:-inset-6 rounded-[2rem] md:rounded-[3rem] opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(212,175,55,0.1), rgba(14,165,233,0.15))',
              filter: 'blur(40px)',
            }}
          />
          
          {/* Animated Border */}
          <motion.div 
            className="absolute -inset-[2px] rounded-[2rem] md:rounded-[3rem]"
            style={{ 
              background: 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
            }}
            animate={{
              background: [
                'linear-gradient(0deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
                'linear-gradient(90deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
                'linear-gradient(180deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
                'linear-gradient(270deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
                'linear-gradient(360deg, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(14,165,233,0.4))',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Main Card Body */}
          <div 
            className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.98), rgba(250,252,255,0.95))',
              boxShadow: '0 40px 100px rgba(14,116,144,0.1), 0 0 0 1px rgba(255,255,255,0.5) inset',
            }}
          >
            <div className="flex flex-col lg:grid lg:grid-cols-5 min-h-[auto] lg:min-h-[560px]">
              {/* Left: General Overseer Image Section */}
              <motion.div 
                className="relative h-[400px] sm:h-[450px] lg:h-auto lg:col-span-2 overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, hsl(var(--navy-deep)) 0%, hsl(var(--primary-dark)) 100%)',
                }}
              >
                {/* General Overseer Photo */}
                <motion.div 
                  className="absolute inset-0 flex items-end justify-center"
                  style={{ scale: imageScale }}
                >
                  <div className="relative w-full h-full">
                    {/* Divine Glow Behind Image */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%]"
                      style={{
                        background: 'radial-gradient(ellipse at bottom center, rgba(14,165,233,0.3) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                      }}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <img 
                      src={generalOverseer} 
                      alt="Sup. Evang. FA Alebiosu (JP) - General Overseer of CCC Light International Parish" 
                      className="w-full h-full object-cover object-top"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                      }}
                    loading="lazy" decoding="async"/>
                  </div>
                </motion.div>
                
                {/* Divine Light Particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-gold/60"
                    style={{
                      left: `${10 + i * 7}%`,
                      top: `${20 + (i % 4) * 15}%`,
                    }}
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.2, 0.9, 0.2],
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 4 + i * 0.4,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  />
                ))}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep))] via-transparent to-transparent opacity-80" />
                
                {/* Leader Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(212,175,55,0.2))',
                      border: '1px solid rgba(212,175,55,0.5)',
                      backdropFilter: 'blur(10px)',
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Crown className="w-4 h-4 text-gold" />
                    <span 
                      className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-gold"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      General Overseer
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Sup. Evang. FA Alebiosu (JP)
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/70 text-sm md:text-base"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    CCC Light International Parish
                  </motion.p>
                </div>
              </motion.div>
              
              {/* Right: Content Section */}
              <motion.div 
                className="lg:col-span-3 p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center"
                style={{ y: contentY }}
              >
                {/* Section Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2.5 mb-4"
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))',
                      border: '1px solid rgba(14,165,233,0.25)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(14,165,233,0.15)',
                        '0 0 40px rgba(14,165,233,0.35)',
                        '0 0 20px rgba(14,165,233,0.15)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span 
                    className="text-xs md:text-sm font-bold tracking-[0.18em] uppercase text-primary"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Spiritual Leadership
                  </span>
                </motion.div>
                
                {/* Heading */}
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-5 text-foreground leading-[1.1]" 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Led by{' '}
                  <span 
                    className="relative inline-block"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold)))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Divine Light
                  </span>
                </motion.h2>
                
                {/* Decorative Line */}
                <motion.div 
                  className="w-20 md:w-24 h-[3px] bg-gradient-to-r from-primary via-gold to-transparent mb-6 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                
                {/* Quote Block */}
                <motion.div 
                  className="relative mb-6 p-5 md:p-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(145deg, hsl(var(--celestial-pale)/0.4), hsl(var(--celestial-pale)/0.15))',
                    border: '1px solid rgba(14,165,233,0.15)',
                  }}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Quote className="absolute top-3 left-3 h-7 w-7 text-primary/15" strokeWidth={1} />
                  <p 
                    className="pl-7 text-lg sm:text-xl md:text-2xl italic leading-relaxed text-foreground/80" 
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    "Welcome to CCC Light International Parish, where God's divine light illuminates every soul and transforms lives through His boundless grace."
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed text-base sm:text-lg md:text-xl mb-6"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  Join us every Wednesday and Sunday as we gather in worship, seeking the face of the Almighty together. Experience divine encounters across our global parishes.
                </motion.p>

                {/* Service Highlights */}
                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  {highlights.map((item, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-2.5 px-5 py-2.5 rounded-full cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05))',
                        border: '1px solid hsl(var(--primary)/0.2)',
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.08))',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <span 
                        className="text-sm md:text-base font-medium text-primary"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Shepherd;
