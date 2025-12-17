import { useRef } from "react";
import { Heart, CreditCard, Sparkles, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const DonationSystem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  const donationOptions = [
    { label: "Seed", description: "Plant a seed of faith" },
    { label: "Tithe", description: "Honor God's blessings" },
    { label: "Offering", description: "Support ministry work" },
    { label: "Any Amount", description: "Give as led" },
  ];

  return (
    <section 
      ref={sectionRef}
      id="donate" 
      className="py-14 md:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Ambient glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px]"
          style={{
            background: 'radial-gradient(ellipse, hsl(var(--primary)/0.1) 0%, transparent 60%)',
            filter: 'blur(50px)',
            opacity: glowOpacity,
          }}
        />
      </motion.div>

      <div className="max-w-lg mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <ScrollReveal>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05))',
                border: '1px solid hsl(var(--primary)/0.2)',
              }}
            >
              <Heart className="w-3.5 h-3.5 text-primary" />
              <span 
                className="text-[9px] font-semibold tracking-[0.18em] uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Give Generously
              </span>
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 
              className="text-2xl md:text-3xl font-medium mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Support Our{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ministry
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <p 
              className="text-muted-foreground text-sm max-w-sm mx-auto"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Your generous donations help spread the light of Christ
            </p>
          </ScrollReveal>
        </div>

        {/* Compact donation card */}
        <ScrollReveal delay={0.2}>
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--muted)/0.5) 100%)',
              border: '1px solid hsl(var(--border))',
              boxShadow: '0 15px 40px hsl(var(--primary)/0.08)',
            }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card header */}
            <div 
              className="p-4 border-b"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              <div className="flex items-center gap-2.5">
                <motion.div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05))',
                    border: '1px solid hsl(var(--primary)/0.2)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <CreditCard className="w-4 h-4 text-primary" />
                </motion.div>
                <div>
                  <h3 
                    className="text-base font-medium text-foreground" 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Secure Giving
                  </h3>
                  <p className="text-[10px] text-muted-foreground" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    All transactions encrypted
                  </p>
                </div>
              </div>
            </div>
            
            {/* Quick options - no price tags */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {donationOptions.map((option, index) => (
                  <motion.button
                    key={option.label}
                    className="group relative p-3 rounded-xl text-center transition-all"
                    style={{
                      background: 'hsl(var(--muted)/0.5)',
                      border: '1px solid hsl(var(--border))',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      background: 'hsl(var(--primary)/0.1)',
                      borderColor: 'hsl(var(--primary)/0.3)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span 
                      className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {option.label}
                    </span>
                    <span 
                      className="block text-[9px] text-muted-foreground mt-0.5"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {option.description}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href="mailto:ccclightimole@gmail.com?subject=Donation%20Inquiry"
                className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                  boxShadow: '0 8px 24px hsl(var(--primary)/0.25)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 32px hsl(var(--primary)/0.35)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="w-4 h-4 text-primary-foreground" />
                <span 
                  className="text-sm font-bold tracking-wide text-primary-foreground"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Give Now
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-primary-foreground/70 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Footer note */}
        <ScrollReveal delay={0.3}>
          <motion.p 
            className="mt-4 text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1.5"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            <Sparkles className="w-3 h-3 text-primary" />
            All donations are tax-deductible
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DonationSystem;
