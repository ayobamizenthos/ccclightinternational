import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, ExternalLink, ArrowLeft, Calendar, Clock, 
  Users, Globe, Facebook, Instagram, Youtube, Music2, Church, 
  Sparkles, Crown, ChevronRight, Play
} from "lucide-react";
import { getBranchBySlug, serviceTimes, branches, Branch } from "@/data/branches";
import { Button } from "@/components/ui/button";
import imoleLogo from "@/assets/imole-logo.png";
import imoleExterior from "@/assets/imole-exterior.png";
import generalOverseer from "@/assets/general-overseer.png";

// Branch Preloader Component
const BranchPreloader = ({ branch, onComplete }: { branch: Branch; onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(200 80% 8%) 0%, hsl(210 65% 12%) 50%, hsl(197 85% 15%) 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Divine Light Rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(14,165,233,0.03) 60deg, transparent 120deg, rgba(212,175,55,0.02) 180deg, transparent 240deg, rgba(14,165,233,0.03) 300deg, transparent 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo with Divine Glow */}
        <motion.div
          className="relative inline-block mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="absolute -inset-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 60%)',
              filter: 'blur(30px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <img 
            src={imoleLogo} 
            alt={branch.name}
            className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(14,165,233,0.4))',
            }}
          loading="lazy" decoding="async"/>
        </motion.div>
        
        {/* Branch Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 
            className="text-3xl md:text-5xl font-medium text-white mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {branch.shortName}
          </h1>
          <p className="text-primary-light text-sm md:text-base tracking-widest uppercase">
            {branch.address.country}
          </p>
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div
          className="mt-12 w-64 md:w-80 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold)))',
                boxShadow: '0 0 20px rgba(14,165,233,0.5)',
              }}
            />
          </div>
          <p className="text-white/50 text-xs mt-3 tracking-wider">
            Loading divine experience...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Branch Page
const BranchPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const branch = getBranchBySlug(slug || "");

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-foreground mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Branch Not Found
          </h1>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const socialIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Music2,
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <BranchPreloader branch={branch} onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={imoleExterior} 
              alt={branch.name}
              className="w-full h-full object-cover"
            loading="lazy" decoding="async"/>
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.7) 50%, rgba(10,22,40,0.95) 100%)',
              }}
            />
          </div>
          
          {/* Ambient Effects */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(14,165,233,0.15) 0%, transparent 60%)',
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          {/* Navigation Bar */}
          <motion.nav
            className="absolute top-0 left-0 right-0 z-30 py-6 px-6 md:px-12"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </motion.div>
                <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                  All Locations
                </span>
              </Link>
              
              <img 
                src={imoleLogo} 
                alt="CCC Light Logo" 
                className="w-12 h-12 object-contain"
              loading="lazy" decoding="async"/>
            </div>
          </motion.nav>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl mx-auto">
              {/* Location Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'rgba(14,165,233,0.15)',
                  border: '1px solid rgba(14,165,233,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium tracking-wide">
                  {branch.address.country}
                </span>
                {branch.isHeadquarters && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-gold text-sm font-medium">Headquarters</span>
                  </>
                )}
              </motion.div>
              
              {/* Branch Name */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 leading-[0.95]"
                style={{ fontFamily: 'Playfair Display, serif' }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {branch.shortName}
              </motion.h1>
              
              {/* Address */}
              <motion.div
                className="flex items-center justify-center gap-2 text-white/60 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm md:text-base">{branch.address.full}</span>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="gap-2 px-8 py-6 text-base rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                    boxShadow: '0 10px 40px rgba(14,165,233,0.4)',
                  }}
                >
                  <Play className="w-5 h-5" /> Watch Service
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 px-8 py-6 text-base rounded-full border-white/20 text-white hover:bg-white/10"
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address.full)}`, '_blank')}
                >
                  <MapPin className="w-5 h-5" /> Get Directions
                </Button>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Shepherd Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Shepherd Info */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <Crown className="w-5 h-5 text-gold" />
                  <span className="text-gold text-sm font-bold tracking-widest uppercase">
                    {branch.shepherd.title}
                  </span>
                </div>
                
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {branch.shepherd.name}
                </h2>
                
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                  Leading our congregation with divine wisdom and unwavering faith, 
                  guiding souls towards spiritual enlightenment and eternal salvation.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-4">
                  <a 
                    href={`tel:${branch.contact.phone}`}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-muted"
                    style={{ border: '1px solid hsl(var(--border))' }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05))' }}
                    >
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                      <p className="text-foreground font-medium">{branch.contact.phone}</p>
                    </div>
                  </a>
                  
                  <a 
                    href={`mailto:${branch.contact.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-muted"
                    style={{ border: '1px solid hsl(var(--border))' }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, hsl(var(--gold)/0.1), hsl(var(--gold)/0.05))' }}
                    >
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                      <p className="text-foreground font-medium">{branch.contact.email}</p>
                    </div>
                  </a>
                </div>
                
                {/* Social Links */}
                {Object.keys(branch.socials).length > 0 && (
                  <div className="flex items-center gap-3 mt-8">
                    {Object.entries(branch.socials).map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      if (!Icon || !url) return null;
                      return (
                        <motion.a
                          key={platform}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: 'hsl(var(--muted))',
                            border: '1px solid hsl(var(--border))',
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-5 h-5 text-foreground" />
                        </motion.a>
                      );
                    })}
                  </div>
                )}
              </motion.div>
              
              {/* Right: Image Placeholder */}
              <motion.div
                className="relative"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="aspect-[4/5] rounded-3xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(160deg, hsl(var(--navy-deep)), hsl(var(--primary-dark)))',
                    boxShadow: '0 40px 80px rgba(14,116,144,0.2)',
                  }}
                >
                  {/* General Overseer Image for HQ, logo for others */}
                  <div className="absolute inset-0">
                    {branch.isHeadquarters ? (
                      <img 
                        src={generalOverseer} 
                        alt={branch.shepherd.name}
                        className="w-full h-full object-cover object-top"
                      loading="lazy" decoding="async"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-12">
                        <motion.img 
                          src={imoleLogo} 
                          alt={branch.shepherd.name}
                          className="w-full max-w-[280px] object-contain opacity-80"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 6, repeat: Infinity }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep))] via-transparent to-transparent" />
                  
                  {/* Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-gold text-xs uppercase tracking-widest mb-2">{branch.shepherd.title}</p>
                    <h3 className="text-white text-2xl font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {branch.shepherd.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Times Section */}
        <section 
          className="py-20 md:py-32 relative"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--celestial-pale)/0.3) 0%, hsl(var(--background)) 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-bold tracking-widest uppercase">
                  Service Schedule
                </span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-medium text-foreground"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Join Us in{' '}
                <span className="text-primary">Worship</span>
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTimes.map((service, index) => (
                <motion.div
                  key={index}
                  className={`relative p-6 md:p-8 rounded-3xl ${service.featured ? 'lg:row-span-2' : ''}`}
                  style={{
                    background: service.featured 
                      ? 'linear-gradient(160deg, hsl(var(--navy-deep)), hsl(var(--primary-dark)))'
                      : 'white',
                    border: service.featured ? 'none' : '1px solid hsl(var(--border))',
                    boxShadow: service.featured 
                      ? '0 30px 60px rgba(14,116,144,0.25)'
                      : '0 10px 40px rgba(0,0,0,0.05)',
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {service.featured && (
                    <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-gold text-navy-deep text-xs font-bold uppercase tracking-wide">
                      Primary Service
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className={`text-3xl md:text-4xl font-light tabular-nums ${service.featured ? 'text-gold' : 'text-foreground'}`}
                       style={{ fontFamily: 'Playfair Display, serif' }}>
                      {service.time}
                    </p>
                  </div>
                  
                  <h3 className={`text-xl md:text-2xl font-medium mb-2 ${service.featured ? 'text-white' : 'text-foreground'}`}
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    {service.day}
                  </h3>
                  
                  <div className={`flex items-center gap-2 mb-4 ${service.featured ? 'text-primary-light' : 'text-primary'}`}>
                    <div className={`w-8 h-0.5 rounded-full bg-gradient-to-r ${service.iconGradient}`} />
                    <span className="text-sm font-medium">{service.type}</span>
                  </div>
                  
                  <p className={`text-sm leading-relaxed ${service.featured ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Branches */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-gold" />
                <span className="text-gold text-sm font-bold tracking-widest uppercase">
                  Explore More
                </span>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-medium text-foreground"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Other <span className="text-gold">Parishes</span>
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.filter(b => b.slug !== slug).slice(0, 3).map((otherBranch, index) => (
                <motion.div
                  key={otherBranch.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/branch/${otherBranch.slug}`}>
                    <motion.div
                      className="group p-6 rounded-3xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
                      whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(14,165,233,0.1)' }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img src={imoleLogo} alt="" className="w-12 h-12 object-contain" loading="lazy" decoding="async"/>
                        <div>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                            {otherBranch.shortName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{otherBranch.address.country}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{otherBranch.address.full}</p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        Visit Parish <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-12 border-t border-border"
          style={{ background: 'hsl(var(--muted)/0.5)' }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <img src={imoleLogo} alt="CCC Light" className="w-16 h-16 mx-auto mb-4 object-contain" loading="lazy" decoding="async"/>
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} CCC Light International Parish. All rights reserved.
            </p>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default BranchPage;
