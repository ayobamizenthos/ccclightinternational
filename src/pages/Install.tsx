import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Share, 
  Plus, 
  MoreVertical, 
  Download,
  CheckCircle2,
  WifiOff,
  Bell,
  Zap,
  Sparkles
} from "lucide-react";
import { FaApple, FaAndroid } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Platform = "ios" | "android";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [activePlatform, setActivePlatform] = useState<Platform>("ios");
  const [activeStep, setActiveStep] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) setActivePlatform('android');

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const nav = window.navigator as Navigator & { standalone?: boolean };
    const isInWebAppiOS = nav.standalone === true;
    if (isStandalone || isInWebAppiOS) setIsInstalled(true);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleOneClickInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          toast.success('App installed successfully! 🎉');
        }
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Install error:', error);
      }
      setIsInstalling(false);
    } else {
      toast.info('Follow the instructions below to install');
    }
  };

  const iosSteps = [
    { icon: Share, title: "Tap Share", description: "Tap the share icon in Safari" },
    { icon: Plus, title: "Add to Home", description: "Select 'Add to Home Screen'" },
    { icon: CheckCircle2, title: "Confirm", description: "Tap 'Add' to install" }
  ];

  const androidSteps = [
    { icon: MoreVertical, title: "Open Menu", description: "Tap ⋮ in Chrome" },
    { icon: Download, title: "Install", description: "Select 'Install app'" },
    { icon: CheckCircle2, title: "Confirm", description: "Tap 'Install'" }
  ];

  const steps = activePlatform === "ios" ? iosSteps : androidSteps;

  const features = [
    { icon: Zap, title: "Fast", description: "Instant loading" },
    { icon: WifiOff, title: "Offline", description: "Works anywhere" },
    { icon: Bell, title: "Alerts", description: "Get notified" },
    { icon: Smartphone, title: "Native", description: "Full screen" }
  ];

  return (
    <>
      <SEO title="Install App | CCC Light International Parish" description="Install our Progressive Web App for the best experience." />
      <Navigation />
      
      <main className="min-h-screen pt-24 pb-32" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}>
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, hsl(var(--primary)/0.1) 0%, transparent 60%)', filter: 'blur(80px)' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity }} />
        </div>

        <div className="container max-w-lg mx-auto px-4 relative z-10">
          <BackButton />
          
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)/0.3), hsl(var(--primary)/0.1))', border: '1px solid hsl(var(--primary)/0.4)' }} animate={{ boxShadow: ['0 0 20px hsl(var(--primary)/0.3)', '0 0 40px hsl(var(--primary)/0.5)', '0 0 20px hsl(var(--primary)/0.3)'] }} transition={{ duration: 2, repeat: Infinity }}>
              <Download className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-medium text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Install <span style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CCC Light</span>
            </h1>
            <p className="text-white/50 text-sm">{isInstalled ? 'App is already installed!' : 'One tap to get the full app experience'}</p>
          </motion.div>

          {!isInstalled && (
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Button onClick={handleOneClickInstall} disabled={isInstalling} className="w-full h-14 rounded-2xl text-base font-bold gap-3" style={{ background: deferredPrompt ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(200 60% 45%) 100%)' : 'linear-gradient(135deg, rgba(100,180,220,0.3), rgba(100,180,220,0.15))', boxShadow: deferredPrompt ? '0 10px 40px rgba(100,180,220,0.4)' : 'none', border: deferredPrompt ? 'none' : '1px solid rgba(100,180,220,0.3)' }}>
                {isInstalling ? (<><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles className="w-5 h-5" /></motion.div>Installing...</>) : (<><Download className="w-5 h-5" />{deferredPrompt ? 'Install App Now' : 'Follow Steps Below'}</>)}
              </Button>
              {deferredPrompt && <p className="text-center text-white/40 text-xs mt-2">✨ One tap installation available</p>}
            </motion.div>
          )}

          {isInstalled && (
            <motion.div className="p-6 rounded-2xl text-center mb-8" style={{ background: 'linear-gradient(145deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)' }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-1">Already Installed!</h3>
              <p className="text-white/50 text-sm">Open from your home screen</p>
            </motion.div>
          )}

          <div className="mb-8">
            <p className="text-white/60 text-xs text-center mb-4 uppercase tracking-wider">Manual Installation Steps</p>
            <div className="flex justify-center gap-3">
              {[{ id: "ios" as Platform, icon: FaApple, label: "iPhone" }, { id: "android" as Platform, icon: FaAndroid, label: "Android" }].map((platform) => (
                <motion.button key={platform.id} onClick={() => { setActivePlatform(platform.id); setActiveStep(0); }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all" style={{ background: activePlatform === platform.id ? 'linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--primary)/0.1))' : 'rgba(255,255,255,0.05)', border: activePlatform === platform.id ? '1px solid hsl(var(--primary)/0.4)' : '1px solid rgba(255,255,255,0.1)' }}>
                  <platform.icon className={`w-5 h-5 ${activePlatform === platform.id ? 'text-primary' : 'text-white/50'}`} />
                  <span className={`text-sm font-medium ${activePlatform === platform.id ? 'text-white' : 'text-white/50'}`}>{platform.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={index} onClick={() => setActiveStep(index)} className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all" style={{ background: activeStep === index ? 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05))' : 'rgba(255,255,255,0.03)', border: activeStep === index ? '1px solid hsl(var(--primary)/0.3)' : '1px solid rgba(255,255,255,0.08)' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: activeStep === index ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(200 60% 45%))' : 'rgba(255,255,255,0.08)' }}>
                    <Icon className={`w-5 h-5 ${activeStep === index ? 'text-white' : 'text-white/50'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: activeStep === index ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.1)', color: activeStep === index ? 'white' : 'rgba(255,255,255,0.5)' }}>{index + 1}</span>
                      <h3 className={`text-sm font-semibold ${activeStep === index ? 'text-white' : 'text-white/70'}`}>{step.title}</h3>
                    </div>
                    <p className="text-white/45 text-xs mt-0.5">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }} whileHover={{ scale: 1.05, y: -2 }}>
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-white text-[10px] font-medium">{feature.title}</p>
                  <p className="text-white/40 text-[8px]">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      
      {/* Footer removed */}
    </>
  );
};

export default Install;