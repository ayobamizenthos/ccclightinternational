import { MapPin, Mail, ArrowUp, Phone, Globe2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { branches, serviceTimes } from "@/data/branches";
import imoleLogo from "@/assets/imole-logo.png";

const Footer = memo(() => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.7, 0.4]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const headquarters = branches.find(b => b.isHeadquarters);

  // Updated socials with TikTok and Instagram
  const socials = [
    { href: headquarters?.socials.facebook, icon: FaFacebookF, label: "Facebook" },
    { href: "https://www.instagram.com/ccclightintparishajman_uae/", icon: FaInstagram, label: "Instagram" },
    { href: headquarters?.socials.youtube, icon: FaYoutube, label: "YouTube" },
    { href: "https://www.tiktok.com/@ccclightinternational", icon: FaTiktok, label: "TikTok" },
  ].filter(s => s.href);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, hsl(200 40% 20%) 0%, hsl(200 45% 15%) 35%, hsl(200 50% 10%) 70%, hsl(200 55% 8%) 100%)',
      }}
    >
      {/* Parallax Divine Light Effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ scale: glowScale }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[250px] md:h-[400px]"
          style={{ 
            opacity: glowOpacity,
            background: 'radial-gradient(ellipse at center top, rgba(100,180,220,0.15) 0%, rgba(100,180,220,0.05) 40%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px]"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(212,175,55,0.1) 0%, transparent 60%)',
          }}
        />
      </motion.div>
      
      {/* Top Divider Line */}
      <motion.div 
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(200 60% 50%) 15%, hsl(200 70% 60%) 50%, hsl(200 60% 50%) 85%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      />
      
      <div className="relative z-10 px-5 md:px-8 py-14 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Logo */}
            <motion.div className="flex justify-center mb-4">
              <img 
                src={imoleLogo} 
                alt="CCC Light International Parish" 
                className="h-16 md:h-20 w-auto"
              loading="lazy" decoding="async"/>
            </motion.div>
            
            <motion.h3 
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-3 md:mb-4" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(100,180,220,0)",
                  "0 0 30px rgba(100,180,220,0.4)",
                  "0 0 0px rgba(100,180,220,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Imole International
            </motion.h3>
            <motion.p 
              className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold mb-3 md:mb-4"
              style={{ 
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, hsl(200 70% 65%) 0%, hsl(200 80% 75%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Light of the World
            </motion.p>
            <p 
              className="text-white/45 text-sm md:text-base max-w-lg mx-auto px-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Celestial Church of Christ — Spreading divine light across 6 parishes in 4 nations.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 mb-12 md:mb-18"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-4 md:mb-5"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(200 70% 65%)',
                }}
              >
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "About", icon: "✦", href: "#about" },
                  { name: "Services", icon: "◈", href: "#services" },
                  { name: "Branches", icon: "◇", href: "#branches" },
                  { name: "Sermons", icon: "▸", href: "/sermons" },
                  { name: "Events", icon: "◎", href: "#events" },
                  { name: "Contact", icon: "◐", href: "#contact" },
                ].map((link, index) => (
                  <motion.a 
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative px-3 py-2.5 rounded-xl overflow-hidden touch-manipulation"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(100, 180, 220, 0.1)',
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      borderColor: 'rgba(100, 180, 220, 0.35)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative flex items-center gap-2">
                      <span 
                        className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'hsl(200 70% 65%)' }}
                      >
                        {link.icon}
                      </span>
                      <span 
                        className="text-white/60 text-sm group-hover:text-primary-light transition-colors duration-300"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {link.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact - Headquarters */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-5 md:mb-6"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(200 70% 65%)',
                }}
              >
                Headquarters
              </h4>
              <div className="space-y-4 md:space-y-5">
                <motion.div 
                  className="flex items-start gap-3.5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(100, 180, 220, 0.15)', border: '1px solid rgba(100, 180, 220, 0.2)' }}>
                    <MapPin className="h-4 w-4 text-primary-light" strokeWidth={1.5} />
                  </div>
                  <span 
                    className="text-white/55 text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {headquarters?.address.full}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-3.5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(100, 180, 220, 0.15)', border: '1px solid rgba(100, 180, 220, 0.2)' }}>
                    <Mail className="h-4 w-4 text-primary-light" strokeWidth={1.5} />
                  </div>
                  <a 
                    href={`mailto:${headquarters?.contact.email}`}
                    className="text-white/55 text-sm md:text-base hover:text-primary-light transition-colors duration-300"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {headquarters?.contact.email}
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-3.5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(100, 180, 220, 0.15)', border: '1px solid rgba(100, 180, 220, 0.2)' }}>
                    <Phone className="h-4 w-4 text-primary-light" strokeWidth={1.5} />
                  </div>
                  <a 
                    href={`tel:${headquarters?.contact.phone.replace(/\s/g, '')}`}
                    className="text-white/55 text-sm md:text-base hover:text-primary-light transition-colors duration-300"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {headquarters?.contact.phone}
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Service Times */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-5 md:mb-6"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(200 70% 65%)',
                }}
              >
                Service Times
              </h4>
              <motion.div 
                className="rounded-2xl p-5 md:p-6"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(100, 180, 220, 0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
              >
                <div className="mb-4 md:mb-5">
                  <p 
                    className="text-primary-light/85 text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-semibold mb-1.5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Sunday Lord's Day
                  </p>
                  <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    10:00 AM
                  </p>
                </div>
                <div className="h-[1px] mb-4 md:mb-5" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(100, 180, 220, 0.25) 50%, transparent 100%)' }} />
                <div className="mb-4 md:mb-5">
                  <p 
                    className="text-primary-light/85 text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-semibold mb-1.5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Wednesday Mercy Day
                  </p>
                  <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    9:00 AM & 6:00 PM
                  </p>
                </div>
                <div className="h-[1px] mb-4 md:mb-5" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(100, 180, 220, 0.25) 50%, transparent 100%)' }} />
                <div>
                  <p 
                    className="text-primary-light/85 text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-semibold mb-1.5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Friday Power Day
                  </p>
                  <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    6:00 PM
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Social & Connect */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-5 md:mb-6"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(200 70% 65%)',
                }}
              >
                Connect With Us
              </h4>
              <div className="flex flex-wrap gap-2.5 md:gap-3 mb-6 md:mb-8">
                {socials.map((social, index) => (
                  <motion.a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white/55 transition-all duration-400 touch-manipulation" 
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.08,
                      background: 'linear-gradient(145deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                      borderColor: 'transparent',
                      color: '#fff',
                    }}
                    whileTap={{ scale: 0.94 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4.5 w-4.5" />
                  </motion.a>
                ))}
              </div>
              
              {/* All Locations Link */}
              <motion.a 
                href="#branches"
                className="inline-flex items-center gap-2 mb-4 text-white/60 hover:text-primary-light transition-colors"
                whileHover={{ x: 4 }}
              >
                <Globe2 className="w-4 h-4" />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>View All 6 Locations</span>
              </motion.a>
              
              <motion.a 
                href={`mailto:${headquarters?.contact.email}?subject=Donation Request`}
                className="inline-flex items-center justify-center w-full px-5 md:px-7 py-3.5 font-semibold text-sm md:text-base rounded-xl transition-all duration-400 touch-manipulation"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(145deg, hsl(200 70% 55%) 0%, hsl(200 65% 45%) 50%, hsl(200 60% 40%) 100%)',
                  color: '#fff',
                  boxShadow: '0 6px 24px rgba(100, 180, 220, 0.25)',
                }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 12px 40px rgba(100, 180, 220, 0.35)" 
                }}
                whileTap={{ scale: 0.97 }}
              >
                Support Our Ministry
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            className="pt-8 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-5"
            style={{
              borderTop: '1px solid rgba(100, 180, 220, 0.12)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p 
              className="text-white/35 text-xs md:text-sm text-center md:text-left"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              © {new Date().getFullYear()} CCC Light International Parish. All rights reserved.
            </p>
            
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(100, 180, 220, 0.15)',
              }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: 'rgba(100, 180, 220, 0.35)',
                background: 'rgba(100, 180, 220, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white/50 text-xs group-hover:text-primary-light transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Back to Top
              </span>
              <ArrowUp className="w-4 h-4 text-white/50 group-hover:text-primary-light transition-all group-hover:-translate-y-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
