import { memo, useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, Radio, Music4, Menu } from "lucide-react";
import useHapticFeedback from "@/hooks/useHapticFeedback";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/", isRoute: true },
  { icon: BookOpen, label: "Bible", path: "/bible", isRoute: true },
  { icon: Radio, label: "Live", path: "/live", isRoute: true },
  { icon: Music4, label: "Choir", path: "/choir-media", isRoute: true },
  { icon: Menu, label: "More", path: "/more", isRoute: true },
];

const BottomNavigation = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trigger } = useHapticFeedback();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Twitter-style hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;
          
          // Only hide/show after scrolling at least 10px to prevent jitter
          if (Math.abs(scrollDelta) > 10) {
            if (scrollDelta > 0 && currentScrollY > 100) {
              // Scrolling down & past 100px
              setIsVisible(false);
            } else if (scrollDelta < 0) {
              // Scrolling up
              setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
          }
          
          // Always show at top of page
          if (currentScrollY < 50) {
            setIsVisible(true);
          }
          
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.isRoute) {
      return location.pathname === item.path;
    }
    return false;
  };

  const handleClick = (item: NavItem, e: React.MouseEvent) => {
    trigger('light');
    
    // Toggle More page - close it if already open
    if (item.label === "More" && location.pathname === "/more") {
      e.preventDefault();
      navigate(-1); // Go back to previous page
      return;
    }
    
    if (!item.isRoute) {
      e.preventDefault();
      const target = document.querySelector(item.path);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        >
          {/* Gradient fade above nav */}
          <div 
            className="absolute -top-6 left-0 right-0 h-6 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)',
            }}
          />
          
          {/* Main navigation container - Premium Glass */}
          <div 
            className="mx-2 mb-2 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(165deg, rgba(18,18,22,0.97) 0%, rgba(25,25,30,0.95) 50%, rgba(15,15,18,0.97) 100%)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center justify-around px-1 py-1">
              {navItems.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                
                const NavContent = (
                  <motion.div
                    className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[60px] min-h-[52px]"
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Active indicator - subtle glow */}
                    <AnimatePresence>
                      {active && (
                        <motion.div
                          className="absolute inset-1 rounded-xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)',
                            border: '1px solid rgba(212,175,55,0.2)',
                          }}
                          layoutId="bottomNavActive"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Icon */}
                    <motion.div
                      className="relative z-10"
                      animate={{
                        y: active ? -1 : 0,
                        scale: active ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Icon 
                        className={`h-[22px] w-[22px] transition-colors duration-200 ${
                          active ? 'text-gold' : 'text-white/45'
                        }`}
                        strokeWidth={active ? 2.2 : 1.8}
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <motion.span
                      className={`relative z-10 text-[10px] mt-1 font-medium tracking-wide transition-colors duration-200 ${
                        active ? 'text-gold' : 'text-white/40'
                      }`}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {item.label}
                    </motion.span>
                    
                    {/* Live indicator for Live tab */}
                    {item.label === "Live" && (
                      <motion.div
                        className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-red-500"
                        style={{ boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );

                if (item.isRoute) {
                  return (
                    <Link 
                      key={item.label}
                      to={item.path}
                      onClick={(e) => handleClick(item, e)}
                      className="touch-manipulation"
                    >
                      {NavContent}
                    </Link>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleClick(item, e)}
                    className="touch-manipulation"
                  >
                    {NavContent}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
});

BottomNavigation.displayName = "BottomNavigation";

export default BottomNavigation;