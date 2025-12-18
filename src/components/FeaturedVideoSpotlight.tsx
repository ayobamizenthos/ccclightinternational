import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Play, Calendar, Sparkles, Clock, Eye, ExternalLink } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import YouTubeLightbox from "./YouTubeLightbox";
import generalOverseerImage from "@/assets/general-overseer.png";

const FeaturedVideoSpotlight = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Featured video data - Updated with correct General Overseer
  const featuredVideo = {
    title: "Divine Mandate - Sup. Evang. FA Alebiosu",
    date: "December 8, 2024",
    duration: "1:45:22",
    views: "5.8K",
    youtubeUrl: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL",
    description: "Experience a powerful prophetic sermon on walking in divine purpose and answering God's calling upon your life. The General Overseer delivers an anointed message for the nations.",
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="py-16 md:py-28 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--secondary-dark)) 50%, hsl(var(--secondary)) 100%)',
        }}
      >
        {/* Ambient background effects */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
          {/* Primary glow */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px]"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          {/* Accent glow */}
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px]"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent)/0.12) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </motion.div>

        <div className="container max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <ScrollReveal>
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,0,0,0.05))',
                  border: '1px solid rgba(255,0,0,0.25)',
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span
                  className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-red-500"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Featured Video of the Week
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
                Watch{' '}
                <span style={{ color: 'hsl(var(--accent))' }}>Now</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Featured video card */}
          <motion.div
            ref={contentRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(165deg, hsl(var(--secondary-light) / 0.8), hsl(var(--secondary) / 0.95))',
                border: '1px solid hsl(var(--accent) / 0.2)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.2), 0 0 60px hsl(var(--primary)/0.1)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(120deg, transparent 30%, hsl(var(--primary)/0.08) 50%, transparent 70%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
              />

              <div className="grid md:grid-cols-2 gap-0">
                {/* Video thumbnail with play button */}
                <motion.div
                  className="relative aspect-video md:aspect-auto cursor-pointer group"
                  onClick={() => setLightboxOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={generalOverseerImage}
                    alt="Sup. Evang. FA Alebiosu - General Overseer"
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
                    }}
                  />

                  {/* Central play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Pulse rings */}
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full"
                          style={{ border: '2px solid rgba(255,0,0,0.4)' }}
                          animate={{
                            scale: [1, 1.5 + i * 0.3],
                            opacity: [0.6, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}

                      {/* Play button */}
                      <motion.div
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                          boxShadow: '0 15px 50px rgba(255,0,0,0.5)',
                        }}
                      >
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                          }}
                          animate={{ x: ['-150%', '150%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        />
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 relative z-10" fill="currentColor" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Duration badge */}
                  <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {featuredVideo.duration}
                    </span>
                  </motion.div>

                  {/* Live indicator style badge */}
                  <motion.div
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,0,0,0.9), rgba(200,0,0,0.9))',
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Featured
                    </span>
                  </motion.div>
                </motion.div>

                {/* Video info */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  {/* Title */}
                  <h3
                    className="text-xl md:text-2xl lg:text-3xl font-medium mb-4"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      color: 'hsl(var(--secondary-foreground))',
                    }}
                  >
                    {featuredVideo.title}
                  </h3>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'hsl(var(--accent))' }} />
                      <span
                        className="text-sm"
                        style={{ fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--secondary-foreground) / 0.7)' }}
                      >
                        {featuredVideo.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" style={{ color: 'hsl(var(--accent))' }} />
                      <span
                        className="text-sm"
                        style={{ fontFamily: 'Outfit, sans-serif', color: 'hsl(var(--secondary-foreground) / 0.7)' }}
                      >
                        {featuredVideo.views} views
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base mb-6"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      color: 'hsl(var(--secondary-foreground) / 0.6)',
                      lineHeight: 1.7,
                    }}
                  >
                    {featuredVideo.description}
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      onClick={() => setLightboxOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                        color: '#FFFFFF',
                        boxShadow: '0 10px 30px rgba(255,0,0,0.3)',
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(255,0,0,0.4)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      Watch Now
                    </motion.button>

                    <motion.a
                      href={featuredVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'hsl(var(--secondary-foreground))',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                      whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      YouTube
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Lightbox */}
      <YouTubeLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        videoUrl={featuredVideo.youtubeUrl}
        title={featuredVideo.title}
      />
    </>
  );
};

export default FeaturedVideoSpotlight;
