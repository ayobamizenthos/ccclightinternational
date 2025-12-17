import { useState, useRef } from "react";
import { Send, CheckCircle, Mail, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { toast } = useToast();

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      toast({ title: "Subscribed!", description: "Thank you for joining our newsletter." });
      setEmail("");
    } catch {
      toast({ title: "Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 md:py-28 lg:py-36 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.4) 50%, hsl(var(--background)) 100%)',
          }}
        />
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center relative z-10">
          <motion.div 
            className="relative p-10 md:p-14 lg:p-20 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.08)',
            }}
          >
            {/* Success glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 60%)',
              }}
            />
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #D4AF37)',
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
            
            <motion.div
              className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
                border: '2px solid rgba(16,185,129,0.3)',
              }}
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 30px rgba(16,185,129,0.2)',
                  '0 0 50px rgba(16,185,129,0.4)',
                  '0 0 30px rgba(16,185,129,0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="h-9 w-9 md:h-11 md:w-11 text-emerald-500" strokeWidth={1.5} />
            </motion.div>
            
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-3 md:mb-4" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Welcome to the Family
            </h3>
            <p 
              className="text-muted-foreground text-base md:text-lg"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              You've successfully subscribed to our newsletter
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.4) 50%, hsl(var(--background)) 100%)',
        }}
      />
      
      {/* Premium ambient effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden" 
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute top-1/3 left-1/4 w-[350px] h-[350px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
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
              Stay Connected
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </motion.div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-5 md:mb-6 text-foreground leading-[1.1]" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Join Our{' '}
            <span className="relative">
              <span 
                className="relative z-10"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10B981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Newsletter
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.15}>
          <p 
            className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-10 md:mb-14" 
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Get updates on events, sermons, and spiritual inspiration delivered to your inbox
          </p>
        </ScrollReveal>

        {/* Premium Form Card */}
        <ScrollReveal delay={0.2}>
          <motion.div
            className="group relative max-w-2xl mx-auto"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card glow on hover */}
            <motion.div 
              className="absolute -inset-2 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), transparent, rgba(16,185,129,0.1))',
                filter: 'blur(20px)',
              }}
            />
            
            {/* Focus glow */}
            <motion.div 
              className="absolute -inset-2 rounded-[2rem] transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.2), transparent, rgba(16,185,129,0.15))',
                filter: 'blur(25px)',
                opacity: isFocused ? 1 : 0,
              }}
            />
            
            {/* Card */}
            <form 
              onSubmit={handleSubmit} 
              className="relative p-7 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-500 to-primary opacity-60" />
              
              {/* Corner accents */}
              <div 
                className="absolute top-4 right-4 w-20 h-20 opacity-20"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(212,175,55,0.3), transparent 70%)',
                }}
              />
              <div 
                className="absolute bottom-4 left-4 w-20 h-20 opacity-20"
                style={{
                  background: 'radial-gradient(circle at bottom left, rgba(16,185,129,0.3), transparent 70%)',
                }}
              />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Email input with premium styling */}
                  <div className="flex-1 relative group/input">
                    <motion.div 
                      className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      animate={isFocused ? { scale: 1.1, color: 'hsl(var(--primary))' } : { scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    </motion.div>
                    
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 md:pl-14 pr-5 py-4 md:py-5 text-sm md:text-base rounded-xl md:rounded-2xl transition-all duration-300 text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                      style={{ 
                        fontFamily: 'Outfit, sans-serif',
                        background: 'rgba(0,0,0,0.03)',
                        border: isFocused ? '2px solid rgba(212,175,55,0.4)' : '2px solid transparent',
                        boxShadow: isFocused ? '0 0 20px rgba(212,175,55,0.1)' : 'none',
                      }}
                    />
                  </div>
                  
                  {/* Premium submit button */}
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="relative overflow-hidden px-7 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold text-white flex items-center justify-center gap-2.5 disabled:opacity-70"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #A07C32 100%)',
                      boxShadow: '0 10px 30px rgba(160,124,50,0.25)',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 15px 40px rgba(160,124,50,0.35)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 hover:opacity-100"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      }}
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    
                    <motion.span
                      animate={isSubmitting ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0, ease: "linear" }}
                    >
                      <Send className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
                    </motion.span>
                    <span>{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                  </motion.button>
                </div>
                
                <motion.p 
                  className="text-[11px] md:text-xs text-muted-foreground mt-5 md:mt-6 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                  We respect your privacy. Unsubscribe anytime.
                </motion.p>
              </div>
            </form>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSignup;
