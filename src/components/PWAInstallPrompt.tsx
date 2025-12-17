import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Sparkles, Wifi, WifiOff, Bell, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = memo(() => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineReady, setShowOfflineReady] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds for returning visitors
      const hasVisited = localStorage.getItem('ccc-light-visited');
      if (hasVisited) {
        setTimeout(() => setShowPrompt(true), 3000);
      } else {
        localStorage.setItem('ccc-light-visited', 'true');
        setTimeout(() => setShowPrompt(true), 10000);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check service worker for offline ready
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setShowOfflineReady(true);
        setTimeout(() => setShowOfflineReady(false), 4000);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Install error:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('ccc-light-install-dismissed', Date.now().toString());
  };

  // Features list
  const features = [
    { icon: WifiOff, text: 'Works Offline' },
    { icon: Bell, text: 'Get Notifications' },
    { icon: Smartphone, text: 'Full Screen App' },
  ];

  if (isInstalled) return null;

  return (
    <>
      {/* Offline Ready Toast */}
      <AnimatePresence>
        {showOfflineReady && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-4 right-4 z-[60] md:left-auto md:right-6 md:max-w-sm"
          >
            <div className="bg-gradient-to-r from-emerald-500/90 to-teal-500/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">App Ready for Offline Use</p>
                  <p className="text-white/80 text-xs">Content cached successfully</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Indicator removed - using centralized OfflineIndicator component in App.tsx */}

      {/* Install Prompt */}
      <AnimatePresence>
        {showPrompt && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 left-4 right-4 z-[60] md:left-auto md:right-6 md:max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border border-primary/30 shadow-2xl">
              {/* Animated background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-1/2 h-24 bg-gradient-to-tl from-amber-500/15 to-transparent blur-2xl" />
              </div>

              {/* Close button */}
              <motion.button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 text-white/70" />
              </motion.button>

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      boxShadow: ['0 0 20px rgba(74,144,164,0.3)', '0 0 40px rgba(74,144,164,0.5)', '0 0 20px rgba(74,144,164,0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-amber-500/20 p-0.5">
                      <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Install CCC Light</h3>
                    <p className="text-white/60 text-sm">Add to your home screen</p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <feature.icon className="w-5 h-5 text-primary" />
                      <span className="text-white/80 text-xs text-center font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Install Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleInstall}
                    className="w-full py-6 rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-base shadow-lg shadow-primary/30 border-0"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Install App Now
                  </Button>
                </motion.div>

                <p className="text-center text-white/40 text-xs mt-4">
                  Quick access • Works offline • No app store needed
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

PWAInstallPrompt.displayName = 'PWAInstallPrompt';

export default PWAInstallPrompt;
