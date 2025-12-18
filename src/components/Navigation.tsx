import { useState, useEffect, memo, useRef } from "react";
import { Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useActiveSection from "@/hooks/useActiveSection";
import useHapticFeedback from "@/hooks/useHapticFeedback";
import imoleLogo from "@/assets/imole-logo.png";
import BranchSelector from "./BranchSelector";
import LiveServiceIndicator from "./LiveServiceIndicator";

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const activeSection = useActiveSection(["#about", "#services", "#branches", "#events", "#contact"]);
  const { trigger } = useHapticFeedback();
  
  // Check if on homepage
  const isHomepage = location.pathname === "/" || location.pathname === "";
  
  const logoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-50, 50], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-50, 50], [-8, 8]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-50, 50], [-4, 4]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-50, 50], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Calculate scroll progress for color transitions
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollY / (viewportHeight * 0.5), 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Branches", href: "#branches" },
    { name: "Bible", href: "/bible", isRoute: true },
    { name: "Sermons", href: "/sermons", isRoute: true },
    { name: "Contact", href: "#contact" },
  ];

  // Dynamic text color - always light text on dark nav
  const getTextColor = (isActive: boolean) => {
    if (isScrolled) {
      return isActive ? 'hsl(var(--primary-light))' : 'rgba(255,255,255,0.85)';
    }
    return isActive ? 'hsl(var(--primary-light))' : 'rgba(255,255,255,0.9)';
  };

  const getHoverColor = () => {
    return isScrolled ? 'hsl(var(--primary-light))' : 'rgba(255,255,255,1)';
  };

  // Only show navigation on homepage
  if (!isHomepage) {
    return null;
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{ 
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
        initial={false}
        animate={{
          height: isScrolled ? "72px" : "88px",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div 
          className="h-full mx-3 sm:mx-4 md:mx-6 lg:mx-8 transition-all duration-500"
          style={{
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(14,45,78,0.85) 0%, rgba(20,60,100,0.8) 50%, rgba(10,40,70,0.85) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
            backdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(200%)' : 'none',
            borderRadius: isScrolled ? '20px' : '0',
            border: isScrolled ? '1px solid rgba(74,144,164,0.35)' : 'none',
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0,0,0,0.4), 0 0 80px rgba(74,144,164,0.15), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)' 
              : 'none',
            marginTop: isScrolled ? '8px' : '0',
          }}
        >
          <div className="px-4 sm:px-5 md:px-6 h-full">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
              {/* Logo */}
              <Link 
                to="/" 
                className="group relative flex items-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  ref={logoRef}
                  className="relative flex items-center"
                  style={{
                    rotateX,
                    rotateY,
                    x: translateX,
                    y: translateY,
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: isScrolled 
                        ? 'radial-gradient(ellipse at left center, rgba(14,165,233,0.15) 0%, transparent 60%)'
                        : 'radial-gradient(ellipse at left center, rgba(100,180,220,0.2) 0%, transparent 60%)',
                      filter: 'blur(12px)',
                    }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <img
                    src={imoleLogo}
                    alt="CCC Light International Parish - Imole"
                    className={`relative z-10 transition-all duration-400 object-contain ${
                      isScrolled 
                        ? "h-10 sm:h-11 w-auto" 
                        : "h-11 sm:h-12 md:h-14 w-auto"
                    }`}
                    style={{
                      filter: isScrolled 
                        ? "drop-shadow(0 2px 6px rgba(14,165,233,0.2))"
                        : "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                    }}
                  / loading="lazy" decoding="async">
                </motion.div>
              </Link>

              {/* Live Service Indicator - Desktop */}
              <LiveServiceIndicator className="hidden md:flex ml-3" />

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, index) => {
                  const isActive = link.isRoute 
                    ? location.pathname === link.href 
                    : activeSection === link.href;
                  
                  const NavItem = ({ children }: { children: React.ReactNode }) => (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-lg ${isActive ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                          background: isScrolled 
                            ? 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(14,165,233,0.03))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
                        }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                      {children}
                      <motion.div
                        className="absolute -bottom-0.5 left-4 right-4 h-[2px] rounded-full"
                        style={{
                          background: isScrolled 
                            ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))'
                            : 'linear-gradient(90deg, rgba(255,255,255,0.8), rgba(14,165,233,0.8))',
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ 
                          scaleX: isActive ? 1 : 0, 
                          opacity: isActive ? 1 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );
                  
                  return link.isRoute ? (
                    <NavItem key={link.name}>
                      <Link
                        to={link.href}
                        className="group relative z-10 px-4 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 block"
                        style={{ 
                          fontFamily: 'Outfit, sans-serif',
                          color: getTextColor(isActive),
                          textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)'
                        }}
                        onClick={() => trigger('light')}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = getHoverColor();
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = getTextColor(isActive);
                        }}
                      >
                        <motion.span
                          className="inline-block"
                          whileHover={{ y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {link.name}
                        </motion.span>
                      </Link>
                    </NavItem>
                  ) : (
                    <NavItem key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          trigger('light');
                          const target = document.querySelector(link.href);
                          if (target) {
                            const headerOffset = 80;
                            const elementPosition = target.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="group relative z-10 px-4 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer block"
                        style={{ 
                          fontFamily: 'Outfit, sans-serif',
                          color: getTextColor(isActive),
                          textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = getHoverColor();
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = getTextColor(isActive);
                        }}
                      >
                        <motion.span
                          className="inline-block"
                          whileHover={{ y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {link.name}
                        </motion.span>
                      </a>
                    </NavItem>
                  );
                })}
              </div>

              {/* Premium Bible Icon - Links to Bible */}
              <Link
                to="/bible"
                className="lg:hidden relative touch-manipulation"
                onClick={() => trigger('medium')}
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Custom Premium Bible SVG */}
                  <svg 
                    viewBox="0 0 40 40" 
                    className="h-11 w-11"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.4))',
                    }}
                  >
                    {/* Book base with gradient */}
                    <defs>
                      <linearGradient id="bibleGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#B8860B" />
                      </linearGradient>
                      <linearGradient id="bibleShine" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFF8DC" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F5F5DC" />
                        <stop offset="100%" stopColor="#FFFAF0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Book spine */}
                    <rect x="6" y="6" width="4" height="28" rx="1" fill="url(#bibleGold)" />
                    
                    {/* Main book cover */}
                    <path 
                      d="M10 6 L32 6 C33 6 34 7 34 8 L34 32 C34 33 33 34 32 34 L10 34 Z" 
                      fill="url(#bibleGold)"
                    />
                    
                    {/* Pages visible on right edge */}
                    <rect x="31" y="8" width="2" height="24" fill="url(#pageGradient)" rx="0.5" />
                    
                    {/* Cover shine effect */}
                    <path 
                      d="M10 6 L32 6 C33 6 34 7 34 8 L34 14 L10 14 Z" 
                      fill="url(#bibleShine)"
                      opacity="0.4"
                    />
                    
                    {/* Cross on cover */}
                    <rect x="19" y="12" width="3" height="16" rx="0.5" fill="#1a1a2e" opacity="0.9" />
                    <rect x="14" y="17" width="13" height="3" rx="0.5" fill="#1a1a2e" opacity="0.9" />
                    
                    {/* Cross inner highlight */}
                    <rect x="19.5" y="12.5" width="2" height="15" rx="0.3" fill="#2a2a4e" opacity="0.6" />
                    <rect x="14.5" y="17.5" width="12" height="2" rx="0.3" fill="#2a2a4e" opacity="0.6" />
                    
                    {/* Ribbon bookmark */}
                    <path 
                      d="M28 6 L28 38 L30 35 L32 38 L32 6" 
                      fill="#DC143C"
                      opacity="0.9"
                    />
                  </svg>
                  
                  {/* Animated glow ring */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 60%)',
                      filter: 'blur(8px)',
                    }}
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.nav>

    </>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
