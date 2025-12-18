import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Disc3, Music2, Headphones } from 'lucide-react';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { FaApple, FaYoutube } from 'react-icons/fa';
import { SiAudiomack } from 'react-icons/si';

// Import streaming platform icons and album cover
import boomplayIcon from '@/assets/boomplay-logo.png';
import choirAlbumCover from '@/assets/choir-album-cover.webp';

// Premium animated music bars
const MusicBars = () => (
  <div className="flex items-end gap-0.5 h-4">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full"
        style={{ background: 'hsl(var(--accent))' }}
        animate={{ 
          height: ['40%', '100%', '40%'],
        }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          delay: i * 0.15,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// Premium play button with glow
const PlayButton = ({ onClick }: { onClick?: () => void }) => (
  <motion.button
    onClick={onClick}
    className="relative group"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Outer glow */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: 'radial-gradient(circle, hsl(var(--accent) / 0.5), transparent 70%)',
        filter: 'blur(15px)',
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Button */}
    <div 
      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, hsl(var(--accent)), hsl(var(--accent-dark)))',
        boxShadow: '0 10px 40px hsl(var(--accent) / 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      <svg viewBox="0 0 24 24" fill="hsl(var(--secondary))" className="w-7 h-7 md:w-8 md:h-8 ml-1">
        <path d="M8 5.14v14l11-7-11-7z" />
      </svg>
    </div>
  </motion.button>
);

const ChoirSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handlePlayClick = () => {
    window.open('https://www.youtube.com/watch?v=dJYeiEP2Zmo', '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--secondary-dark)) 100%)',
      }}
    >
      {/* Premium parallax background effects */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {/* Gold glow - top left */}
        <motion.div 
          className="absolute -top-32 left-1/4 w-[500px] md:w-[700px] h-[500px] md:h-[700px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        {/* Primary glow - bottom right */}
        <motion.div 
          className="absolute -bottom-32 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        {/* Musical note pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>

      <div className="container max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <motion.div 
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--accent) / 0.15), hsl(var(--accent) / 0.08))',
                border: '1px solid hsl(var(--accent) / 0.25)',
                boxShadow: '0 4px 20px hsl(var(--accent) / 0.1)',
              }}
            >
              <Music2 className="w-4 h-4" style={{ color: 'hsl(var(--accent))' }} />
              <span 
                className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(var(--accent))',
                }}
              >
                Listen to Our Choir
              </span>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3" 
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: 'hsl(var(--secondary-foreground))',
              }}
            >
              CCC Light International <span style={{ color: 'hsl(var(--accent))' }}>Choir</span>
            </h2>
            <p 
              className="text-sm md:text-base max-w-lg mx-auto"
              style={{ color: 'hsl(var(--secondary-foreground) / 0.6)' }}
            >
              Experience the divine melodies of celestial worship
            </p>
          </ScrollReveal>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Album Cover with Play Button */}
          <ScrollReveal direction="left">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Outer glow effect */}
              <motion.div 
                className="absolute -inset-4 md:-inset-6 rounded-3xl opacity-50"
                style={{
                  background: 'radial-gradient(circle at center, hsl(var(--accent) / 0.3), transparent 70%)',
                  filter: 'blur(30px)',
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Album container with glassmorphism */}
              <div 
                className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                style={{ 
                  boxShadow: '0 25px 60px hsl(var(--foreground) / 0.3), 0 0 0 1px hsl(var(--accent) / 0.1)',
                }}
              >
                {/* Album image */}
                <img 
                  src={choirAlbumCover} 
                  alt="CCC Light International Choir - Lati Ona Jinjin"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />
                
                {/* Play button - centered, links to Apple Music */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <a 
                    href="https://music.apple.com/us/album/lati-ona-jinjin-single/1656382813" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <PlayButton />
                  </a>
                </div>
                
                {/* Now Playing indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MusicBars />
                    <div>
                      <p 
                        className="text-white text-sm font-medium"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        Now Playing
                      </p>
                      <p 
                        className="text-white/70 text-xs"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        Lati Ona Jinjin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Streaming Platforms & Info */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              {/* Featured track glass card */}
              <motion.div 
                className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(165deg, hsl(var(--secondary-light) / 0.6), hsl(var(--secondary) / 0.9))',
                  border: '1px solid hsl(var(--accent) / 0.15)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 50px hsl(var(--foreground) / 0.1)',
                }}
                whileHover={{ 
                  boxShadow: '0 25px 60px hsl(var(--accent) / 0.15)',
                  borderColor: 'hsl(var(--accent) / 0.3)',
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(120deg, transparent 30%, hsl(var(--accent) / 0.05) 50%, transparent 70%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                />
                
                {/* Featured track header */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-dark)))',
                      boxShadow: '0 4px 15px hsl(var(--accent) / 0.3)',
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Headphones className="w-5 h-5" style={{ color: 'hsl(var(--secondary))' }} />
                  </motion.div>
                  <div>
                    <span 
                      className="text-[10px] font-semibold tracking-wider uppercase"
                      style={{ fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--accent))' }}
                    >
                      Featured Track
                    </span>
                    <h3 
                      className="text-xl md:text-2xl font-medium"
                      style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(var(--secondary-foreground))' }}
                    >
                      "Lati Ona Jinjin"
                    </h3>
                  </div>
                </div>
                
                <p 
                  className="text-sm mb-6"
                  style={{ fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--secondary-foreground) / 0.7)' }}
                >
                  A heartfelt expression of faith and praise from the depths of celestial worship.
                </p>

                {/* Streaming platforms grid with modern icons */}
                <div className="space-y-3">
                  <p 
                    className="text-xs font-semibold tracking-wider uppercase flex items-center gap-2"
                    style={{ fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--secondary-foreground) / 0.5)' }}
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    Stream Now
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {/* Apple Music */}
                    <motion.a
                      href="https://music.apple.com/us/album/lati-ona-jinjin-single/1656382813"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl group relative overflow-hidden"
                      style={{
                        background: 'hsl(var(--secondary) / 0.7)',
                        border: '1px solid hsl(var(--accent) / 0.1)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: '#FC3C4440',
                        background: '#FC3C4415',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ 
                          background: 'linear-gradient(135deg, #FC3C44, #FA233B)',
                          boxShadow: '0 4px 15px rgba(252,60,68,0.3)',
                        }}
                      >
                        <FaApple className="w-5 h-5 text-white" />
                      </div>
                      <div className="relative z-10 min-w-0">
                        <span 
                          className="text-xs md:text-sm font-medium block truncate"
                          style={{ color: 'hsl(var(--secondary-foreground))' }}
                        >
                          Apple Music
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#FC3C44]" />
                    </motion.a>
                    
                    {/* Audiomack */}
                    <motion.a
                      href="https://audiomack.com/ccc-akoka-parish-choir/song/lati-ona-jinjin-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl group relative overflow-hidden"
                      style={{
                        background: 'hsl(var(--secondary) / 0.7)',
                        border: '1px solid hsl(var(--accent) / 0.1)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: '#FFA50040',
                        background: '#FFA50015',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ 
                          background: 'linear-gradient(135deg, #FFA500, #FF8C00)',
                          boxShadow: '0 4px 15px rgba(255,165,0,0.3)',
                        }}
                      >
                        <SiAudiomack className="w-5 h-5 text-white" />
                      </div>
                      <div className="relative z-10 min-w-0">
                        <span 
                          className="text-xs md:text-sm font-medium block truncate"
                          style={{ color: 'hsl(var(--secondary-foreground))' }}
                        >
                          Audiomack
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#FFA500]" />
                    </motion.a>
                    
                    {/* Boomplay */}
                    <motion.a
                      href="https://www.boomplay.com/songs/109557633"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl group relative overflow-hidden"
                      style={{
                        background: 'hsl(var(--secondary) / 0.7)',
                        border: '1px solid hsl(var(--accent) / 0.1)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: '#00CED140',
                        background: '#00CED115',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ 
                          background: 'linear-gradient(135deg, #00CED1, #00B4D8)',
                          boxShadow: '0 4px 15px rgba(0,206,209,0.3)',
                        }}
                      >
                        <img src={boomplayIcon} alt="Boomplay" className="w-5 h-5 object-contain" loading="lazy" decoding="async"/>
                      </div>
                      <div className="relative z-10 min-w-0">
                        <span 
                          className="text-xs md:text-sm font-medium block truncate"
                          style={{ color: 'hsl(var(--secondary-foreground))' }}
                        >
                          Boomplay
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#00CED1]" />
                    </motion.a>
                    
                    {/* YouTube Music */}
                    <motion.a
                      href="https://www.youtube.com/watch?v=dJYeiEP2Zmo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl group relative overflow-hidden"
                      style={{
                        background: 'hsl(var(--secondary) / 0.7)',
                        border: '1px solid hsl(var(--accent) / 0.1)',
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: '#FF000040',
                        background: '#FF000015',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ 
                          background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                          boxShadow: '0 4px 15px rgba(255,0,0,0.3)',
                        }}
                      >
                        <FaYoutube className="w-5 h-5 text-white" />
                      </div>
                      <div className="relative z-10 min-w-0">
                        <span 
                          className="text-xs md:text-sm font-medium block truncate"
                          style={{ color: 'hsl(var(--secondary-foreground))' }}
                        >
                          YouTube
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-[#FF0000]" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* View Full Choir Page Link */}
              <div className="flex items-center justify-center">
                <motion.a 
                  href="/choir-media"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all group"
                  style={{ 
                    color: 'hsl(var(--accent))',
                    background: 'hsl(var(--accent) / 0.1)',
                    border: '1px solid hsl(var(--accent) / 0.2)',
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    background: 'hsl(var(--accent) / 0.15)',
                    boxShadow: '0 10px 30px hsl(var(--accent) / 0.2)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Disc3 className="w-4 h-4" />
                  Explore Choir & Media
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ChoirSection;
