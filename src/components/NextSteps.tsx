import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Mail, ArrowRight, ExternalLink, Sparkles, Navigation, Phone, Star, Globe2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { branches } from "@/data/branches";
import imoleExterior from "@/assets/imole-exterior.png";

const NextSteps = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const headquarters = branches.find(b => b.isHeadquarters);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleFindUs = () => {
    const address = headquarters?.address.full || "Pole 6, Nureni Yusuff Lane, Alagbado, Lagos, Nigeria";
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      "_blank"
    );
  };

  return (
    <>
      <section 
        ref={sectionRef}
        id="contact" 
        className="py-16 md:py-28 lg:py-36 relative overflow-hidden bg-background"
      >
        {/* Subtle background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: i % 2 === 0 ? 'hsl(var(--primary)/0.25)' : 'hsl(var(--accent)/0.2)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Subtle ambient glows */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute top-1/3 left-1/4 w-[400px] h-[400px] opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)/0.25) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          <div 
            className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent)/0.2) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
          {/* Header */}
          <ScrollReveal>
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Get Started
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-5 leading-[1.1]" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Take the{' '}
              <span 
                className="relative"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #D4AF37 50%, hsl(var(--primary)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Next Step
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15} direction="none">
            <motion.div 
              className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-5 md:mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p 
              className="text-muted-foreground text-base md:text-lg lg:text-xl mb-10 md:mb-14 max-w-lg mx-auto" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              You've visited, you've loved it — now discover where to find us
            </p>
          </ScrollReveal>
          
          {/* Premium CTA Button */}
          <ScrollReveal delay={0.25}>
            <motion.div
              className="inline-block relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute -inset-4 rounded-full opacity-60"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--primary)/0.35), transparent 70%)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.button
                onClick={() => setIsOpen(true)}
                className="relative inline-flex items-center justify-center gap-3 px-10 md:px-14 py-5 md:py-6 font-semibold text-sm md:text-base rounded-full overflow-hidden group touch-manipulation"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)), hsl(var(--primary)))',
                  color: 'white',
                  boxShadow: '0 15px 50px hsl(var(--primary)/0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 20px 60px hsl(var(--primary)/0.5), inset 0 1px 0 rgba(255,255,255,0.4)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Rotating ring around button on hover */}
                <motion.div
                  className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                />
                
                {/* Icon with glow */}
                <motion.div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                  }}
                  whileHover={{ rotate: 10 }}
                >
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </motion.div>
                
                <span className="relative z-10 font-bold tracking-wide">Find Us</span>
                
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={2} />
                </motion.span>
              </motion.button>
            </motion.div>
          </ScrollReveal>

          {/* Quick contact info */}
          <ScrollReveal delay={0.35}>
            <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-10">
              <motion.a
                href={`tel:${headquarters?.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Call Us</span>
              </motion.a>
              <motion.a
                href={`mailto:${headquarters?.contact.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Email Us</span>
              </motion.a>
              <motion.a
                href="#branches"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Globe2 className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>All Locations</span>
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Premium Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="sm:max-w-lg p-0 overflow-hidden rounded-3xl border-0 mx-4"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
            boxShadow: '0 30px 100px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
          }}
        >
          {/* Image header */}
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
            loading="lazy" decoding="async"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Badge on image */}
            <motion.div
              className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)/0.95), hsl(var(--primary)/0.8))',
                backdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-3.5 h-3.5 text-white" fill="currentColor" />
              <span className="text-white text-xs font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Headquarters
              </span>
            </motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <DialogHeader className="mb-6">
              <DialogTitle 
                className="text-2xl md:text-3xl text-foreground" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Visit{' '}
                <span 
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  CCC Light International
                </span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mb-6">
              {/* Address card */}
              <motion.div 
                className="group relative p-5 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(var(--accent)/0.1), hsl(var(--accent)/0.04))',
                  border: '1px solid hsl(var(--accent)/0.2)',
                }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent)/0.8))',
                      boxShadow: '0 8px 20px hsl(var(--accent)/0.3)',
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MapPin className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <p 
                      className="font-semibold text-foreground text-sm mb-1"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Address
                    </p>
                    <p 
                      className="text-muted-foreground text-sm leading-relaxed"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {headquarters?.address.full}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email card */}
              <motion.div 
                className="group relative p-5 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.04))',
                  border: '1px solid hsl(var(--primary)/0.2)',
                }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.8))',
                      boxShadow: '0 8px 20px hsl(var(--primary)/0.3)',
                    }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Mail className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <p 
                      className="font-semibold text-foreground text-sm mb-1"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Email
                    </p>
                    <a 
                      href={`mailto:${headquarters?.contact.email}`}
                      className="text-primary hover:text-primary/80 transition-colors text-sm"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {headquarters?.contact.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Premium CTA Button */}
            <motion.button 
              onClick={handleFindUs} 
              className="relative w-full py-4 rounded-xl overflow-hidden flex items-center justify-center gap-3 font-semibold text-white"
              style={{
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.85))',
                boxShadow: '0 10px 30px hsl(var(--primary)/0.35)',
              }}
              whileHover={{ 
                scale: 1.01, 
                boxShadow: "0 15px 40px hsl(var(--primary)/0.45)" 
              }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              
              <Navigation className="w-5 h-5 relative z-10" strokeWidth={1.5} />
              <span className="relative z-10">Open in Google Maps</span>
              <ExternalLink className="w-4 h-4 relative z-10" strokeWidth={1.5} />
            </motion.button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NextSteps;
