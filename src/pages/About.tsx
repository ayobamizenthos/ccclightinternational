import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Calendar, Globe2, Heart, BookOpen, X, Phone, Mail, Building2, Crown } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";
import { branches, Branch } from "@/data/branches";
import generalOverseer from "@/assets/general-overseer.png";
import imoleExterior from "@/assets/imole-exterior.png";

// Branch accent colors
const branchAccents = [
  { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', light: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b' },
  { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', light: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981' },
  { bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', light: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', text: '#8b5cf6' },
  { bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', light: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', text: '#ec4899' },
  { bg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', light: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', text: '#06b6d4' },
];

// Branch Modal Component
const BranchModal = ({ branch, onClose, accentIndex = 0 }: { branch: Branch | null; onClose: () => void; accentIndex?: number }) => {
  if (!branch) return null;
  
  const accent = branch.isHeadquarters ? null : branchAccents[accentIndex % branchAccents.length];
  
  // Always show all 4 social icons - use main HQ links as fallback
  const mainSocials = {
    facebook: "https://www.facebook.com/ImoleGlobalMediaccc/about",
    instagram: "https://www.instagram.com/ccclightintparishajman_uae/",
    youtube: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL",
    tiktok: "https://www.tiktok.com/@ccclightinternational",
  };
  
  const socials = [
    { key: 'facebook', icon: FaFacebookF, url: branch.socials.facebook || mainSocials.facebook, label: 'Facebook' },
    { key: 'instagram', icon: FaInstagram, url: branch.socials.instagram || mainSocials.instagram, label: 'Instagram' },
    { key: 'youtube', icon: FaYoutube, url: branch.socials.youtube || mainSocials.youtube, label: 'YouTube' },
    { key: 'tiktok', icon: FaTiktok, url: branch.socials.tiktok || mainSocials.tiktok, label: 'TikTok' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        className="relative w-full max-w-[340px] max-h-[80vh] overflow-y-auto rounded-2xl"
        style={{
          background: branch.isHeadquarters 
            ? 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)'
            : 'linear-gradient(160deg, #0f1419 0%, #1a2332 100%)',
          boxShadow: branch.isHeadquarters 
            ? '0 20px 60px rgba(212,175,55,0.2)'
            : `0 20px 60px ${accent?.light || 'rgba(0,0,0,0.3)'}`,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        {/* Branch Image Header */}
        <div 
          className="relative h-32 overflow-hidden"
          style={{
            background: branch.isHeadquarters 
              ? 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(160,124,50,0.1))'
              : accent?.light,
          }}
        >
          <img 
            src={imoleExterior} 
            alt={branch.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            {branch.isHeadquarters && (
              <span 
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase mb-2"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #A07C32)', color: '#0a1628' }}
              >
                <Crown className="w-2.5 h-2.5" />
                HQ
              </span>
            )}
            <h3 
              className="text-lg font-medium text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {branch.shortName}
            </h3>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.15)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.3)' : accent?.border}`,
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider uppercase mb-0.5 text-white/50">
                Location
              </p>
              <p className="text-xs text-white/80">
                {branch.address.full}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.15)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.3)' : accent?.border}`,
              }}
            >
              <Users className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider uppercase mb-0.5 text-white/50">
                {branch.shepherd.title}
              </p>
              <p className="text-xs font-medium text-white">
                {branch.shepherd.name}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2">
            <a 
              href={`tel:${branch.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Phone className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
              <span className="text-[10px] text-white/70">Call</span>
            </a>
            <a 
              href={`mailto:${branch.contact.email}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Mail className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
              <span className="text-[10px] text-white/70">Email</span>
            </a>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(branch.address.full)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <MapPin className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
              <span className="text-[10px] text-white/70">Map</span>
            </a>
          </div>

          {/* Social Media Links */}
          {socials.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] font-semibold tracking-wider uppercase mb-3 text-white/50 text-center">
                Connect With Us
              </p>
              <div className="flex justify-center gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4 text-white/70" />
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (window.location.hash === '#leadership') {
      setTimeout(() => {
        const element = document.getElementById('leadership');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  const headquarters = branches.find(b => b.isHeadquarters);
  const otherBranches = branches.filter(b => !b.isHeadquarters);

  const stats = [
    { value: "6", label: "Parishes", icon: MapPin },
    { value: "4", label: "Nations", icon: Globe2 },
    { value: "39+", label: "Years", icon: Calendar },
    { value: "1000+", label: "Members", icon: Users },
  ];

  const beliefs = [
    {
      title: "The Holy Trinity",
      description: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.",
    },
    {
      title: "Salvation Through Christ",
      description: "Salvation is by grace through faith in Jesus Christ, who died for our sins and rose again.",
    },
    {
      title: "The Holy Bible",
      description: "The Bible is the inspired, infallible Word of God and our ultimate guide for faith and practice.",
    },
    {
      title: "Sanctification",
      description: "We believe in holy living, the practice of righteousness, and separation from worldly ways.",
    },
    {
      title: "Divine Healing",
      description: "God heals the sick through prayer, faith, and the power of the Holy Spirit.",
    },
    {
      title: "Second Coming",
      description: "Christ will return to establish His eternal kingdom and judge the living and the dead.",
    },
  ];

  const handleBranchClick = (branch: Branch, index: number) => {
    setSelectedBranch(branch);
    setSelectedIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <SEO
        title="About Us | CCC Light International Parish"
        description="Learn about the Celestial Church of Christ Light International Parish - our history, mission, beliefs, and leadership. Spreading divine light across 6 parishes in 4 nations."
        url="/about"
      />
      <Navigation />
      
      <main 
        id="main-content" 
        className="min-h-screen pt-24 pb-32"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)',
        }}
      >
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={imoleExterior} 
              alt="CCC Light Parish" 
              className="w-full h-full object-cover opacity-20"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #0a1628 0%, transparent 30%, transparent 70%, #0a1628 100%)',
              }}
            />
          </div>
          
          <div className="container max-w-4xl mx-auto px-4 relative z-10">
            <BackButton />
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.p
                className="text-primary-light text-xs tracking-[0.2em] uppercase font-semibold mb-3"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                About Our Parish
              </motion.p>
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                CCC Light International
              </h1>
              <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Spreading divine light across nations through prayer, worship, and unwavering faith.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-4 gap-2 mt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="text-center p-3 md:p-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(100,180,220,0.15)',
                    }}
                    variants={itemVariants}
                  >
                    <Icon className="w-4 h-4 text-primary-light mx-auto mb-2" />
                    <p 
                      className="text-xl md:text-2xl font-medium text-white"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Our Story - Compact */}
        <section className="py-10">
          <div className="container max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary-light/50" />
                <Heart className="w-4 h-4 text-primary-light" />
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary-light/50" />
              </div>
              
              <h2 
                className="text-xl md:text-2xl font-medium text-white text-center mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Story
              </h2>
              
              <p className="text-white/60 text-sm leading-relaxed text-center">
                Founded in 1947 through divine revelation to Prophet Samuel Bilewu Joseph Oshoffa, 
                the Celestial Church of Christ continues to spread the divine light globally. 
                Under our General Overseer, Sup. Evang. FA Alebiosu (JP), we have established 
                6 parishes across 4 nations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section - Compact */}
        <section id="leadership" className="py-10 scroll-mt-24">
          <div className="container max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary-light/50" />
                <Users className="w-4 h-4 text-primary-light" />
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary-light/50" />
              </div>
              
              <h2 
                className="text-xl md:text-2xl font-medium text-white text-center mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Leadership
              </h2>

              {/* General Overseer Card - Compact */}
              <motion.div
                className="flex flex-col items-center gap-4 p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(100,180,220,0.15)',
                }}
              >
                <motion.div
                  className="w-28 h-28 rounded-xl overflow-hidden"
                  style={{
                    border: '2px solid rgba(100,180,220,0.3)',
                    boxShadow: '0 0 30px rgba(100,180,220,0.2)',
                  }}
                >
                  <img 
                    src={generalOverseer} 
                    alt="General Overseer Sup. Evang. FA Alebiosu"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="text-center">
                  <p 
                    className="text-primary-light text-[10px] tracking-[0.2em] uppercase font-semibold mb-1"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    General Overseer
                  </p>
                  <h3 
                    className="text-xl font-medium text-white mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Sup. Evang. FA Alebiosu (JP)
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed max-w-sm">
                    A servant of God dedicated to spreading the light of Christ across nations, 
                    serving thousands of members globally.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Parishes - Clickable Grid */}
        <section className="py-10">
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary-light/50" />
                <Globe2 className="w-4 h-4 text-primary-light" />
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary-light/50" />
              </div>
              
              <h2 
                className="text-xl md:text-2xl font-medium text-white text-center mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Our Parishes
              </h2>
              <p className="text-white/50 text-center text-xs mb-6">
                Tap any parish to view details
              </p>

              {/* Parishes Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {/* Headquarters */}
                {headquarters && (
                  <motion.div
                    className="col-span-2 md:col-span-1 cursor-pointer"
                    onClick={() => handleBranchClick(headquarters, 0)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="p-4 rounded-xl h-full"
                      style={{
                        background: 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)',
                        border: '1px solid rgba(212,175,55,0.3)',
                      }}
                    >
                      <div 
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[7px] font-bold tracking-wider uppercase mb-2"
                        style={{ background: 'linear-gradient(135deg, #D4AF37, #A07C32)', color: '#0a1628' }}
                      >
                        <Crown className="w-2 h-2" />
                        HQ
                      </div>
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                          border: '1px solid rgba(212,175,55,0.3)',
                        }}
                      >
                        <Building2 className="w-4 h-4 text-gold" />
                      </div>
                      <h3 className="text-white font-medium text-sm mb-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {headquarters.shortName}
                      </h3>
                      <p className="text-white/50 text-[10px]">{headquarters.address.country}</p>
                    </div>
                  </motion.div>
                )}

                {/* Other Branches */}
                {otherBranches.map((branch, index) => {
                  const accent = branchAccents[index % branchAccents.length];
                  return (
                    <motion.div
                      key={branch.id}
                      className="cursor-pointer"
                      onClick={() => handleBranchClick(branch, index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="p-3 rounded-xl h-full"
                        style={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                          border: `1px solid ${accent.border}`,
                        }}
                      >
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                          style={{
                            background: accent.light,
                            border: `1px solid ${accent.border}`,
                          }}
                        >
                          <Building2 className="w-3.5 h-3.5" style={{ color: accent.text }} />
                        </div>
                        <h3 className="text-white font-medium text-xs mb-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {branch.shortName}
                        </h3>
                        <p className="text-white/50 text-[10px]">{branch.address.country}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Beliefs - Compact */}
        <section className="py-10">
          <div className="container max-w-3xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 justify-center mb-6">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary-light/50" />
                <BookOpen className="w-4 h-4 text-primary-light" />
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary-light/50" />
              </div>
              
              <h2 
                className="text-xl md:text-2xl font-medium text-white text-center mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                What We Believe
              </h2>

              <div className="grid grid-cols-2 gap-2">
                {beliefs.map((belief, index) => (
                  <motion.div
                    key={belief.title}
                    className="p-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(100,180,220,0.1)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <h3 className="text-white font-medium text-xs mb-1">{belief.title}</h3>
                    <p className="text-white/50 text-[10px] leading-relaxed">{belief.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10">
          <div className="container max-w-sm mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-xl font-medium text-white mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Join Our Family
              </h2>
              <p className="text-white/50 text-xs mb-4">
                Experience the love of Christ with us.
              </p>
              <motion.button
                onClick={() => {
                  if (headquarters) {
                    handleBranchClick(headquarters, 0);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                  boxShadow: '0 8px 30px rgba(100,180,220,0.3)',
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MapPin className="w-4 h-4" />
                Find a Parish
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Branch Modal */}
      <AnimatePresence>
        {selectedBranch && (
          <BranchModal 
            branch={selectedBranch} 
            onClose={() => setSelectedBranch(null)} 
            accentIndex={selectedIndex}
          />
        )}
      </AnimatePresence>
      
      {/* Footer removed - only on homepage */}
    </>
  );
};

export default About;
