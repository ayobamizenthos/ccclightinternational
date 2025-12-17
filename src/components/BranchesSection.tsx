import { memo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Globe2, X, ChevronRight, Building2, Users, Crown } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";
import { branches, Branch } from "@/data/branches";

// Unique accent colors for each non-HQ branch
const branchAccents = [
  { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', light: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b' },
  { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', light: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981' },
  { bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', light: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', text: '#8b5cf6' },
  { bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', light: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', text: '#ec4899' },
  { bg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', light: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)', text: '#06b6d4' },
];

interface BranchModalProps {
  branch: Branch | null;
  onClose: () => void;
  accentIndex?: number;
}

const BranchModal = ({ branch, onClose, accentIndex = 0 }: BranchModalProps) => {
  if (!branch) return null;
  
  const accent = branch.isHeadquarters ? null : branchAccents[accentIndex % branchAccents.length];
  
  const socials = [
    { key: 'facebook', icon: FaFacebookF, url: branch.socials.facebook, label: 'Facebook' },
    { key: 'instagram', icon: FaInstagram, url: branch.socials.instagram, label: 'Instagram' },
    { key: 'youtube', icon: FaYoutube, url: branch.socials.youtube, label: 'YouTube' },
    { key: 'tiktok', icon: FaTiktok, url: branch.socials.tiktok, label: 'TikTok' },
  ].filter(s => s.url);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Modal - Mobile optimized with proper mx-4 spacing */}
      <motion.div
        className="relative w-full max-w-[calc(100%-32px)] sm:max-w-[340px] max-h-[85vh] overflow-y-auto rounded-2xl"
        style={{
          background: branch.isHeadquarters 
            ? 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)'
            : 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
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
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: branch.isHeadquarters ? 'rgba(255,255,255,0.1)' : 'hsl(var(--muted))',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className={`w-4 h-4 ${branch.isHeadquarters ? 'text-white' : 'text-foreground'}`} />
        </motion.button>

        {/* Header */}
        <div 
          className="relative h-24 flex items-end p-4"
          style={{
            background: branch.isHeadquarters 
              ? 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(160,124,50,0.1))'
              : accent?.light,
          }}
        >
          <div className="relative z-10">
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
              className={`text-lg font-medium ${branch.isHeadquarters ? 'text-white' : 'text-foreground'}`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {branch.shortName}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Location */}
          <div className="flex items-start gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.15)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.3)' : accent?.border}`,
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-0.5 ${branch.isHeadquarters ? 'text-gold/70' : 'text-muted-foreground'}`}>
                Location
              </p>
              <p className={`text-xs ${branch.isHeadquarters ? 'text-white/80' : 'text-foreground'}`}>
                {branch.address.full}
              </p>
            </div>
          </div>

          {/* Shepherd */}
          <div className="flex items-start gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: branch.isHeadquarters ? 'rgba(212,175,55,0.15)' : accent?.light,
                border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.3)' : accent?.border}`,
              }}
            >
              <Users className="w-4 h-4" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
            </div>
            <div>
              <p className={`text-[10px] font-semibold tracking-wider uppercase mb-0.5 ${branch.isHeadquarters ? 'text-gold/70' : 'text-muted-foreground'}`}>
                {branch.shepherd.title}
              </p>
              <p className={`text-xs font-medium ${branch.isHeadquarters ? 'text-white' : 'text-foreground'}`}>
                {branch.shepherd.name}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-2">
            <a 
              href={`tel:${branch.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 p-2.5 rounded-lg transition-colors"
              style={{
                background: branch.isHeadquarters ? 'rgba(255,255,255,0.05)' : 'hsl(var(--muted)/0.5)',
              }}
            >
              <Phone className="w-3.5 h-3.5" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
              <span className={`text-[10px] ${branch.isHeadquarters ? 'text-white/70' : 'text-muted-foreground'}`}>
                Call
              </span>
            </a>
            <a 
              href={`mailto:${branch.contact.email}`}
              className="flex items-center gap-2 p-2.5 rounded-lg transition-colors"
              style={{
                background: branch.isHeadquarters ? 'rgba(255,255,255,0.05)' : 'hsl(var(--muted)/0.5)',
              }}
            >
              <Mail className="w-3.5 h-3.5" style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }} />
              <span className={`text-[10px] ${branch.isHeadquarters ? 'text-white/70' : 'text-muted-foreground'}`}>
                Email
              </span>
            </a>
          </div>

          {/* Social Links */}
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {socials.map((social) => (
                <motion.a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: branch.isHeadquarters ? 'rgba(255,255,255,0.08)' : 'hsl(var(--muted))',
                    border: `1px solid ${branch.isHeadquarters ? 'rgba(255,255,255,0.1)' : 'hsl(var(--border))'}`,
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className={`w-3.5 h-3.5 ${branch.isHeadquarters ? 'text-white/60' : 'text-muted-foreground'}`} />
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const BranchCard = ({ branch, index, onClick }: { branch: Branch; index: number; onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const nonHqIndex = branches.filter(b => !b.isHeadquarters).indexOf(branch);
  const accent = branch.isHeadquarters ? null : branchAccents[nonHqIndex >= 0 ? nonHqIndex % branchAccents.length : 0];

  // Cinematic slam animation
  const slamVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: -100,
      rotateX: 45,
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 15,
        delay: index * 0.1,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer"
      variants={slamVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Pulse glow on hover */}
      <motion.div 
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: branch.isHeadquarters 
            ? 'radial-gradient(circle at center, rgba(212,175,55,0.25), transparent 70%)'
            : `radial-gradient(circle at center, ${accent?.light}, transparent 70%)`,
          filter: 'blur(12px)',
        }}
      />

      <motion.div
        className="relative h-full rounded-xl overflow-hidden"
        style={{
          background: branch.isHeadquarters 
            ? 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)'
            : 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
          boxShadow: branch.isHeadquarters 
            ? '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 6px 20px hsl(var(--foreground)/0.03)',
          border: branch.isHeadquarters ? '1px solid rgba(212,175,55,0.3)' : '1px solid hsl(var(--border))',
        }}
      >
        {/* Accent stripe */}
        {!branch.isHeadquarters && accent && (
          <div 
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: accent.bg }}
          />
        )}

        {/* HQ Badge */}
        {branch.isHeadquarters && (
          <motion.div
            className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(160,124,50,0.9))' }}
            animate={{
              boxShadow: [
                '0 0 8px rgba(212,175,55,0.3)',
                '0 0 16px rgba(212,175,55,0.6)',
                '0 0 8px rgba(212,175,55,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-2.5 h-2.5 text-secondary" />
            <span className="text-[7px] font-bold tracking-wider uppercase text-secondary">HQ</span>
          </motion.div>
        )}

        <div className="p-3">
          {/* Branch icon */}
          <div 
            className="w-9 h-9 rounded-lg mb-2 flex items-center justify-center"
            style={{
              background: branch.isHeadquarters 
                ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))'
                : accent?.light,
              border: `1px solid ${branch.isHeadquarters ? 'rgba(212,175,55,0.3)' : accent?.border}`,
            }}
          >
            <Building2 
              className="w-4 h-4"
              style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }}
            />
          </div>

          {/* Branch Name */}
          <h3 
            className={`font-medium mb-1 text-sm leading-tight ${branch.isHeadquarters ? 'text-white' : 'text-foreground'}`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {branch.shortName}
          </h3>

          {/* Location */}
          <div className={`flex items-center gap-1 mb-2 ${branch.isHeadquarters ? 'text-white/50' : 'text-muted-foreground'}`}>
            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="text-[10px] truncate">{branch.address.country}</span>
          </div>

          {/* View Details CTA with animation */}
          <motion.div 
            className={`flex items-center gap-1 text-[10px] font-semibold ${branch.isHeadquarters ? 'text-gold' : ''}`}
            style={{ color: branch.isHeadquarters ? '#D4AF37' : accent?.text }}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span>Tap for details</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BranchesSection = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  const handleBranchClick = (branch: Branch, index: number) => {
    setSelectedBranch(branch);
    setSelectedIndex(index);
  };

  // Separate HQ and other branches
  const hqBranch = branches.find(b => b.isHeadquarters);
  const otherBranches = branches.filter(b => !b.isHeadquarters);

  return (
    <>
      <section 
        ref={sectionRef}
        id="branches" 
        className="py-14 md:py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 50%, hsl(var(--background)) 100%)",
        }}
      >
        {/* Ambient glow */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(ellipse, hsl(var(--primary)/0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05))',
                  border: '1px solid hsl(var(--primary)/0.25)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 12px hsl(var(--primary)/0.15)',
                    '0 0 25px hsl(var(--primary)/0.3)',
                    '0 0 12px hsl(var(--primary)/0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Globe2 className="w-3.5 h-3.5 text-primary" />
              </motion.div>
              <span 
                className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Global Presence
              </span>
            </motion.div>

            <h2 
              className="text-3xl md:text-5xl font-medium text-foreground mb-3" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our{' '}
              <span 
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10B981 50%, hsl(var(--primary)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Branches
              </span>
            </h2>
            
            <p 
              className="text-muted-foreground text-base max-w-md mx-auto"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              6 parishes spreading the light of Christ across 3 continents
            </p>
          </motion.div>

          {/* Mobile-optimized grid - All visible, no scroll */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* HQ gets special treatment - spans 2 cols on mobile */}
            {hqBranch && (
              <div className="col-span-2 md:col-span-1">
                <BranchCard
                  branch={hqBranch}
                  index={0}
                  onClick={() => handleBranchClick(hqBranch, 0)}
                />
              </div>
            )}
            
            {/* Other branches */}
            {otherBranches.map((branch, index) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                index={index + 1}
                onClick={() => handleBranchClick(branch, index + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedBranch && (
          <BranchModal 
            branch={selectedBranch} 
            onClose={() => setSelectedBranch(null)}
            accentIndex={selectedIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
});

BranchesSection.displayName = 'BranchesSection';

export default BranchesSection;
