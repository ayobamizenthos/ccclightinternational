import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe2, 
  ChevronRight,
  MessageCircle,
  Heart,
  Users,
  Crown,
  Building2,
  Sparkles,
  Send
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";
import { branches, Branch } from "@/data/branches";

// Accent colors for branches
const branchAccents = [
  { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', light: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b' },
  { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', light: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981' },
  { bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', light: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', text: '#8b5cf6' },
  { bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', light: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', text: '#ec4899' },
  { bg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', light: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', text: '#06b6d4' },
];

const BranchContactCard = ({ branch, index }: { branch: Branch; index: number }) => {
  const nonHqIndex = branches.filter(b => !b.isHeadquarters).indexOf(branch);
  const accent = branch.isHeadquarters ? null : branchAccents[nonHqIndex >= 0 ? nonHqIndex % branchAccents.length : 0];

  // Fallback socials for branches without specific URLs
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
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: branch.isHeadquarters 
          ? 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)'
          : 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
        boxShadow: branch.isHeadquarters 
          ? '0 15px 50px rgba(212,175,55,0.15)'
          : '0 10px 40px hsl(var(--foreground)/0.05)',
        border: branch.isHeadquarters ? '1px solid rgba(212,175,55,0.3)' : '1px solid hsl(var(--border))',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* HQ Badge */}
      {branch.isHeadquarters && (
        <motion.div
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(160,124,50,0.9))' }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(212,175,55,0.3)',
              '0 0 20px rgba(212,175,55,0.5)',
              '0 0 10px rgba(212,175,55,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="w-3 h-3 text-secondary" />
          <span className="text-[9px] font-bold tracking-wider uppercase text-secondary">Headquarters</span>
        </motion.div>
      )}

      {/* Accent stripe */}
      {!branch.isHeadquarters && accent && (
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accent.bg }} />
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: branch.isHeadquarters 
                ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))'
                : accent?.light,
              border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.3)' : accent?.border}`,
            }}
          >
            <Building2 
              className="w-6 h-6"
              style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }}
            />
          </div>
          <div>
            <h3 
              className={`text-lg font-medium mb-1 ${branch.isHeadquarters ? 'text-white' : 'text-foreground'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {branch.shortName}
            </h3>
            <div className={`flex items-center gap-1.5 ${branch.isHeadquarters ? 'text-white/50' : 'text-muted-foreground'}`}>
              <Globe2 className="w-3.5 h-3.5" />
              <span className="text-xs">{branch.address.country}</span>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-4 mb-6">
          {/* Address */}
          <div className="flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.12)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.25)' : accent?.border}`,
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-0.5 ${branch.isHeadquarters ? 'text-gold/60' : 'text-muted-foreground'}`}>
                Address
              </p>
              <p className={`text-sm ${branch.isHeadquarters ? 'text-white/80' : 'text-foreground'}`}>
                {branch.address.full}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.12)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.25)' : accent?.border}`,
              }}
            >
              <Phone className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-0.5 ${branch.isHeadquarters ? 'text-gold/60' : 'text-muted-foreground'}`}>
                Phone
              </p>
              <a 
                href={`tel:${branch.contact.phone.replace(/\s/g, '')}`}
                className={`text-sm hover:underline ${branch.isHeadquarters ? 'text-white/80' : 'text-foreground'}`}
              >
                {branch.contact.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.12)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.25)' : accent?.border}`,
              }}
            >
              <Mail className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-0.5 ${branch.isHeadquarters ? 'text-gold/60' : 'text-muted-foreground'}`}>
                Email
              </p>
              <a 
                href={`mailto:${branch.contact.email}`}
                className={`text-sm hover:underline break-all ${branch.isHeadquarters ? 'text-white/80' : 'text-foreground'}`}
              >
                {branch.contact.email}
              </a>
            </div>
          </div>

          {/* Shepherd */}
          <div className="flex items-start gap-3">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.12)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.25)' : accent?.border}`,
              }}
            >
              <Users className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-0.5 ${branch.isHeadquarters ? 'text-gold/60' : 'text-muted-foreground'}`}>
                {branch.shepherd.title}
              </p>
              <p className={`text-sm font-medium ${branch.isHeadquarters ? 'text-white' : 'text-foreground'}`}>
                {branch.shepherd.name}
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {socials.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: branch.isHeadquarters ? 'rgba(255,255,255,0.1)' : 'hsl(var(--border))' }}>
            {socials.map((social) => (
              <motion.a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                style={{
                  background: branch.isHeadquarters ? 'rgba(255,255,255,0.06)' : 'hsl(var(--muted))',
                  border: `1px solid ${branch.isHeadquarters ? 'rgba(255,255,255,0.1)' : 'hsl(var(--border))'}`,
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className={`w-3.5 h-3.5 ${branch.isHeadquarters ? 'text-white/60' : 'text-muted-foreground'}`} />
                <span className={`text-xs ${branch.isHeadquarters ? 'text-white/60' : 'text-muted-foreground'}`}>
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Contact = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Separate HQ and other branches
  const hqBranch = branches.find(b => b.isHeadquarters);
  const otherBranches = branches.filter(b => !b.isHeadquarters);

  return (
    <>
      <SEO
        title="Contact Us | CCC Light International Parish"
        description="Get in touch with CCC Light International Parish. Find contact details, addresses, and social media links for all 6 parishes across Nigeria, UAE, and Georgia."
        url="/contact"
      />
      <Navigation />
      
      <main 
        id="main-content" 
        className="min-h-screen pt-24 pb-32"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)',
        }}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)/0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <BackButton />
          
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--primary)/0.08))',
                  border: '1px solid hsl(var(--primary)/0.3)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 15px hsl(var(--primary)/0.2)',
                    '0 0 30px hsl(var(--primary)/0.4)',
                    '0 0 15px hsl(var(--primary)/0.2)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MessageCircle className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.div>
            
            <h1 
              className="text-3xl md:text-5xl font-medium text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Contact{' '}
              <span 
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10B981 50%, hsl(var(--primary)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Our Parishes
              </span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Reach out to any of our 6 parishes across 4 nations. We are delighted to hear from you 
              and welcome you to our celestial family.
            </p>
          </motion.div>

          {/* Headquarters - Featured */}
          {hqBranch && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BranchContactCard branch={hqBranch} index={0} />
            </motion.div>
          )}

          {/* Other Branches Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {otherBranches.map((branch, index) => (
              <BranchContactCard key={branch.id} branch={branch} index={index + 1} />
            ))}
          </motion.div>

          {/* General Inquiry CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div 
              className="inline-block p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(100,180,220,0.1) 0%, rgba(100,180,220,0.03) 100%)',
                border: '1px solid rgba(100,180,220,0.2)',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-10 h-10 text-primary-light mx-auto mb-4" />
              </motion.div>
              <h3 
                className="text-xl font-medium text-white mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                We Would Love To Hear From You
              </h3>
              <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
                Whether you have questions about our services, need prayer support, or simply want to connect, 
                our doors and hearts are always open to you.
              </p>
              <motion.a
                href="mailto:ccclightinternationalparish@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                  boxShadow: '0 8px 30px rgba(100,180,220,0.3)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(100,180,220,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Send className="w-4 h-4" />
                Send Us A Message
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer removed */}
    </>
  );
});

Contact.displayName = "Contact";

export default Contact;
