import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import harvestGraphic from '@/assets/50th-harvest-graphic.png';

// Luxury SVG falling elements
const GoldenBalloon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none">
    <defs>
      <linearGradient id="balloonGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="30%" stopColor="#D4AF37" />
        <stop offset="70%" stopColor="#B8860B" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="balloonShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.6" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="10" rx="10" ry="12" fill="url(#balloonGold)" />
    <ellipse cx="8" cy="6" rx="4" ry="5" fill="url(#balloonShine)" />
    <path d="M12 22 L12 34" stroke="#D4AF37" strokeWidth="0.8" />
    <path d="M10 22 Q12 25 14 22" fill="#B8860B" />
  </svg>
);

const GiftBox = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <defs>
      <linearGradient id="giftGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="giftRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
    <rect x="2" y="10" width="24" height="16" rx="2" fill="url(#giftGold)" />
    <rect x="0" y="6" width="28" height="6" rx="1" fill="url(#giftRibbon)" />
    <rect x="12" y="6" width="4" height="20" fill="url(#giftRibbon)" />
    <ellipse cx="10" cy="4" rx="4" ry="3" fill="url(#giftRibbon)" />
    <ellipse cx="18" cy="4" rx="4" ry="3" fill="url(#giftRibbon)" />
  </svg>
);

const GoldenRibbon = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 30 18" fill="none">
    <defs>
      <linearGradient id="ribbonGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <path d="M0 9 Q5 0 15 9 Q25 18 30 9" stroke="url(#ribbonGold)" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M2 14 Q7 5 15 12 Q23 19 28 10" stroke="url(#ribbonGold)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const CelestialCross = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <filter id="crossGlow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="10" y="2" width="4" height="20" rx="1" fill="url(#crossGold)" filter="url(#crossGlow)" />
    <rect x="4" y="6" width="16" height="4" rx="1" fill="url(#crossGold)" filter="url(#crossGlow)" />
  </svg>
);

const GoldenStar = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <defs>
      <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M10 0 L12.5 7 L20 7.5 L14 12.5 L16 20 L10 15.5 L4 20 L6 12.5 L0 7.5 L7.5 7 Z" fill="url(#starGold)" filter="url(#starGlow)" />
  </svg>
);

const Sparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <defs>
      <linearGradient id="sparkleGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FFE4B5" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
    <path d="M8 0 L9 6 L16 8 L9 10 L8 16 L7 10 L0 8 L7 6 Z" fill="url(#sparkleGold)" />
  </svg>
);

const GoldenWheat = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 32 48" fill="none">
    <defs>
      <linearGradient id="wheatGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    {/* Stem */}
    <path d="M16 48 L16 20" stroke="url(#wheatGold)" strokeWidth="1.5" />
    {/* Wheat grains */}
    <ellipse cx="16" cy="8" rx="3" ry="6" fill="url(#wheatGold)" />
    <ellipse cx="10" cy="14" rx="2.5" ry="5" fill="url(#wheatGold)" transform="rotate(-20 10 14)" />
    <ellipse cx="22" cy="14" rx="2.5" ry="5" fill="url(#wheatGold)" transform="rotate(20 22 14)" />
    <ellipse cx="8" cy="22" rx="2" ry="4" fill="url(#wheatGold)" transform="rotate(-30 8 22)" />
    <ellipse cx="24" cy="22" rx="2" ry="4" fill="url(#wheatGold)" transform="rotate(30 24 22)" />
    <ellipse cx="11" cy="28" rx="1.8" ry="3.5" fill="url(#wheatGold)" transform="rotate(-25 11 28)" />
    <ellipse cx="21" cy="28" rx="1.8" ry="3.5" fill="url(#wheatGold)" transform="rotate(25 21 28)" />
    {/* Awns (whiskers) */}
    <path d="M16 2 L16 0" stroke="url(#wheatGold)" strokeWidth="0.8" />
    <path d="M10 10 L6 6" stroke="url(#wheatGold)" strokeWidth="0.6" />
    <path d="M22 10 L26 6" stroke="url(#wheatGold)" strokeWidth="0.6" />
  </svg>
);

const HarvestBasket = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 36 29" fill="none">
    <defs>
      <linearGradient id="basketBrown" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="50%" stopColor="#A67C52" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="fruitRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#C0392B" />
      </linearGradient>
      <linearGradient id="fruitOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB347" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
      <linearGradient id="fruitGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#90EE90" />
        <stop offset="100%" stopColor="#228B22" />
      </linearGradient>
      <linearGradient id="fruitPurple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9B59B6" />
        <stop offset="100%" stopColor="#6C3483" />
      </linearGradient>
    </defs>
    {/* Basket body */}
    <path d="M4 14 L8 28 L28 28 L32 14 Z" fill="url(#basketBrown)" />
    <path d="M2 12 L34 12 L32 14 L4 14 Z" fill="url(#basketBrown)" opacity="0.8" />
    {/* Basket weave lines */}
    <path d="M10 14 L11 28" stroke="#8B6914" strokeWidth="0.5" opacity="0.5" />
    <path d="M18 14 L18 28" stroke="#8B6914" strokeWidth="0.5" opacity="0.5" />
    <path d="M26 14 L25 28" stroke="#8B6914" strokeWidth="0.5" opacity="0.5" />
    {/* Fruits */}
    <circle cx="12" cy="9" r="4" fill="url(#fruitRed)" />
    <circle cx="20" cy="8" r="3.5" fill="url(#fruitOrange)" />
    <circle cx="26" cy="10" r="3" fill="url(#fruitGreen)" />
    <ellipse cx="16" cy="6" rx="2.5" ry="2" fill="url(#fruitPurple)" />
    <ellipse cx="22" cy="5" rx="2" ry="1.5" fill="url(#fruitPurple)" />
    {/* Leaf on top */}
    <path d="M13 5 Q11 2 14 1" stroke="#228B22" strokeWidth="1" fill="none" />
  </svg>
);

const GoldenDove = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 28 22" fill="none">
    <defs>
      <linearGradient id="doveGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#FFE4B5" />
        <stop offset="70%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <filter id="doveGlow">
        <feGaussianBlur stdDeviation="0.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Body */}
    <ellipse cx="14" cy="14" rx="6" ry="5" fill="url(#doveGold)" filter="url(#doveGlow)" />
    {/* Head */}
    <circle cx="20" cy="10" r="3.5" fill="url(#doveGold)" filter="url(#doveGlow)" />
    {/* Beak */}
    <path d="M23 10 L26 9.5 L23 11" fill="#D4AF37" />
    {/* Wing */}
    <path d="M8 12 Q2 6 6 2 Q10 6 14 10 Q10 14 8 12" fill="url(#doveGold)" filter="url(#doveGlow)" />
    {/* Tail */}
    <path d="M8 14 Q4 16 2 20 Q6 18 10 16" fill="url(#doveGold)" opacity="0.9" />
    {/* Eye */}
    <circle cx="21" cy="9.5" r="0.8" fill="#8B6914" />
    {/* Olive branch */}
    <path d="M24 12 Q26 14 28 13" stroke="#228B22" strokeWidth="0.8" fill="none" />
    <ellipse cx="27" cy="12.5" rx="1.5" ry="0.8" fill="#90EE90" transform="rotate(-20 27 12.5)" />
  </svg>
);

const ConfettiPiece = ({ color, size = 10 }: { color: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
    <rect x="2" y="2" width="6" height="6" rx="1" fill={color} />
  </svg>
);

const FALLING_COMPONENTS = [
  GoldenBalloon, GiftBox, GoldenRibbon, CelestialCross, GoldenStar, 
  Sparkle, GoldenWheat, HarvestBasket, GoldenDove
];

const CONFETTI_COLORS = ['#D4AF37', '#FFE4B5', '#B8860B', '#FFFFFF', '#FFD700', '#FFA500'];

interface FallingElement {
  id: number;
  Component: typeof GoldenBalloon;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotateAmount: number;
}

interface ConfettiPieceData {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

const HarvestCelebration = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [badgeDismissed, setBadgeDismissed] = useState(false);
  const [fallingElements, setFallingElements] = useState<FallingElement[]>([]);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPieceData[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Always show falling elements and badge
    generateFallingElements();
    setShowBadge(true);
    
    // Always show popup on homepage refresh
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const handleDismissBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBadge(false);
    setBadgeDismissed(true);
  };
  
  const handleRestoreBadge = () => {
    setShowBadge(true);
    setBadgeDismissed(false);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const generateFallingElements = () => {
    const elements: FallingElement[] = [];
    // Ultra-minimal count for zero lag - 8 elements only
    for (let i = 0; i < 8; i++) {
      elements.push({
        id: i,
        Component: FALLING_COMPONENTS[Math.floor(Math.random() * FALLING_COMPONENTS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 20 + Math.random() * 10, // Slower, smoother fall
        size: 14 + Math.random() * 12, // Smaller for elegance
        rotateAmount: Math.random() > 0.5 ? 90 : -90, // Gentler rotation
      });
    }
    setFallingElements(elements);
  };

  const triggerConfetti = useCallback(() => {
    const pieces: ConfettiPieceData[] = [];
    // Reduced confetti count for performance - 40 instead of 80
    for (let i = 0; i < 40; i++) {
      pieces.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 50,
        y: 50 + (Math.random() - 0.5) * 30,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360 - 180,
        scale: 0.6 + Math.random() * 0.8,
      });
    }
    setConfetti(pieces);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  }, []);

  const handleJoinCelebration = () => {
    triggerConfetti();
    setTimeout(() => {
      setShowPopup(false);
      setHasSeenPopup(true);
      sessionStorage.setItem('harvestCelebrationSeen', 'true');
      // Scroll to live service section
      const liveSection = document.getElementById('live');
      if (liveSection) {
        liveSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  const handleExploreSite = () => {
    setShowPopup(false);
    setHasSeenPopup(true);
    sessionStorage.setItem('harvestCelebrationSeen', 'true');
  };

  return (
    <>
      {/* Falling Luxury Elements Layer */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {fallingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute"
            initial={{ 
              x: `${element.x}vw`, 
              y: -100,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              y: '110vh',
              rotate: element.rotateAmount,
              opacity: [0, 1, 1, 0.8, 0]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <element.Component size={element.size} />
          </motion.div>
        ))}
      </div>

      {/* Floating Mini Badge - Dismissible - More compact on mobile */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            className="fixed top-24 right-3 md:right-4 z-[90]"
          >
            <div 
              className="relative px-2 py-1 md:px-4 md:py-2.5 rounded-full backdrop-blur-xl border border-gold/50 overflow-hidden cursor-pointer"
              style={{ 
                background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(139,69,19,0.2))',
                boxShadow: '0 6px 24px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
              onClick={handleOpenPopup}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 15px rgba(212,175,55,0.5)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              <div className="flex items-center gap-1 md:gap-2 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                >
                  <GoldenStar size={10} />
                </motion.div>
                <span 
                  className="text-[9px] md:text-xs font-bold tracking-wider uppercase"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(135deg, #D4AF37, #FFE4B5, #D4AF37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Live
                </span>
                <motion.div
                  className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ boxShadow: '0 0 6px rgba(34,197,94,0.8)' }}
                />
                
                {/* Dismiss Button */}
                <motion.button
                  onClick={handleDismissBadge}
                  className="ml-0.5 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Dismiss harvest badge"
                >
                  <X className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gold/80" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Show Badge Button - appears when badge is dismissed */}
      <AnimatePresence>
        {badgeDismissed && !showBadge && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleRestoreBadge}
            className="fixed top-24 right-3 md:right-4 z-[90] w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center backdrop-blur-xl border border-gold/40 cursor-pointer"
            style={{ 
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(139,69,19,0.15))',
              boxShadow: '0 4px 16px rgba(212,175,55,0.2)'
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 6px 24px rgba(212,175,55,0.3)' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Show harvest badge"
          >
            <GoldenStar size={14} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Luxury Celebration Popup Modal - Premium Glassmorphism */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-4"
            onClick={handleExploreSite}
          >
            {/* Premium blur backdrop - NO black background */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(10,22,40,0.85) 0%, rgba(15,28,50,0.9) 50%, rgba(5,15,30,0.88) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              }}
            />
            
            {/* Radial glow background */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 60%)'
              }}
            />
            
            {/* Animated light rays */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent, rgba(212,175,55,0.03), transparent, rgba(212,175,55,0.03), transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Confetti Burst */}
            <AnimatePresence>
              {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {confetti.map((piece) => (
                    <motion.div
                      key={piece.id}
                      className="absolute"
                      initial={{ 
                        left: '50%', 
                        top: '50%',
                        scale: 0,
                        rotate: 0,
                        opacity: 1
                      }}
                      animate={{ 
                        left: `${piece.x}%`,
                        top: `${piece.y + 50}%`,
                        scale: piece.scale,
                        rotate: piece.rotation,
                        opacity: 0
                      }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeOut'
                      }}
                    >
                      <ConfettiPiece color={piece.color} size={12} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
            
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative max-w-sm md:max-w-lg w-full rounded-2xl md:rounded-3xl overflow-hidden mx-2"
              style={{
                background: 'linear-gradient(165deg, rgba(20,35,70,0.95), rgba(10,20,45,0.98))',
                boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 100px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
                border: '1px solid rgba(212,175,55,0.3)',
                backdropFilter: 'blur(20px)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated golden border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
                  backgroundSize: '200% 100%'
                }}
                animate={{
                  backgroundPosition: ['200% 0%', '-200% 0%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Close button */}
              <motion.button
                onClick={handleExploreSite}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-2 md:p-2.5 rounded-full backdrop-blur-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(184,134,11,0.2))',
                  border: '1px solid rgba(212,175,55,0.4)',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.2)'
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 6px 20px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gold" />
              </motion.button>

              {/* Content - more compact padding on mobile */}
              <div className="relative z-10 p-4 sm:p-6 md:p-8 text-center">
                {/* Official Harvest Graphic */}
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <motion.img 
                    src={harvestGraphic}
                    alt="50th Adult Harvest Thanksgiving Service"
                    className="w-full max-w-xs sm:max-w-sm h-auto drop-shadow-2xl"
                    animate={{ 
                      filter: [
                        'drop-shadow(0 0 20px rgba(212,175,55,0.3))',
                        'drop-shadow(0 0 40px rgba(212,175,55,0.5))',
                        'drop-shadow(0 0 20px rgba(212,175,55,0.3))'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Decorative golden divider */}
                <motion.div 
                  className="flex items-center justify-center gap-3 mb-5"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-gold/60 to-gold/80" />
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
                  >
                    <GoldenStar size={24} />
                  </motion.div>
                  <div className="h-[2px] w-16 bg-gradient-to-l from-transparent via-gold/60 to-gold/80" />
                </motion.div>

                {/* Parish name */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm sm:text-base uppercase tracking-[0.2em] mb-2"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    color: 'rgba(212,175,55,0.9)'
                  }}
                >
                  Celestial Church of Christ
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="text-xs sm:text-sm tracking-widest mb-5"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    color: 'rgba(255,255,255,0.6)'
                  }}
                >
                  CCC LIGHT INTERNATIONAL PARISH (IMOLE)
                </motion.p>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/80 leading-relaxed mb-8 text-sm sm:text-base max-w-md mx-auto"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  Today we celebrate God's faithfulness and abundant blessings. 
                  May this harvest season bring you overflowing joy, divine peace, and supernatural favor.
                </motion.p>

                {/* Premium CTA Buttons - Side by Side Compact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-row gap-3 justify-center items-center"
                >
                  {/* Watch Live - Streaming Style Red Button */}
                  <motion.button
                    onClick={handleJoinCelebration}
                    className="relative px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider overflow-hidden group flex items-center gap-2"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #B91C1C 100%)',
                      boxShadow: '0 6px 24px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: '0 8px 32px rgba(220,38,38,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Live Pulsing Dot */}
                    <motion.span
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }}
                    />
                    <span className="relative z-10 text-white font-bold">
                      Watch Live
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.button>

                  {/* Explore Site - Gold Outline Compact */}
                  <motion.button
                    onClick={handleExploreSite}
                    className="relative px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider overflow-hidden group"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'rgba(212,175,55,0.1)',
                      border: '1.5px solid rgba(212,175,55,0.6)',
                      boxShadow: '0 4px 16px rgba(212,175,55,0.15)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: 'rgba(212,175,55,0.9)',
                      boxShadow: '0 6px 24px rgba(212,175,55,0.3)'
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span 
                      className="relative z-10 font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37, #FFE4B5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Explore
                    </span>
                  </motion.button>
                </motion.div>

                {/* Bottom decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-8 flex justify-center items-center gap-4"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  >
                    <GoldenWheat size={24} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  >
                    <CelestialCross size={20} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                  >
                    <GoldenDove size={26} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  >
                    <CelestialCross size={20} />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  >
                    <GoldenWheat size={24} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HarvestCelebration;
