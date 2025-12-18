import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Play, Radio, Clock, Bell, BellOff, Share2, Users, ExternalLink, ArrowLeft, Tv, Calendar, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF } from "react-icons/fa6";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { branches } from "@/data/branches";

// CCC Service Schedule
const serviceSchedule = [
  { day: "Sunday", name: "Lord's Day Service", time: "10:00 AM", featured: true },
  { day: "Tuesday", name: "Breaking Yokes", time: "9:00 AM" },
  { day: "Wednesday", name: "Seekers Service", time: "9:00 AM" },
  { day: "Wednesday", name: "Mercy Day", time: "6:00 PM" },
  { day: "Friday", name: "Power Night", time: "6:00 PM" },
  { day: "First Thursday", name: "New Moon", time: "10:00 PM" },
];

// Streaming platforms
const streamingPlatforms = [
  { name: "YouTube", icon: FaYoutube, color: "#FF0000", url: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL" },
  { name: "Facebook", icon: FaFacebookF, color: "#1877F2", url: "https://www.facebook.com/ImoleGlobalMediaccc" },
];

const Live = memo(() => {
  const { toast } = useToast();
  const [isLive, setIsLive] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [nextService, setNextService] = useState<typeof serviceSchedule[0] | null>(null);

  // Check if currently live based on schedule
  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const liveService = serviceSchedule.find(service => {
        if (service.day === currentDay || 
            (service.day === "First Thursday" && currentDay === "Thursday" && now.getDate() <= 7)) {
          const [time, period] = service.time.split(" ");
          const [hours, minutes] = time.split(":").map(Number);
          let serviceHour = period === "PM" && hours !== 12 ? hours + 12 : hours;
          if (period === "AM" && hours === 12) serviceHour = 0;
          
          const serviceStart = serviceHour * 60 + minutes;
          const currentTime = currentHour * 60 + currentMinute;
          return currentTime >= serviceStart && currentTime <= serviceStart + 180;
        }
        return false;
      });
      
      setIsLive(!!liveService);
      if (liveService) {
        setViewerCount(Math.floor(Math.random() * 200) + 50);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 300000); // 5 min interval for performance
    return () => clearInterval(interval);
  }, []);

  // Calculate countdown to next service
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      let nextServiceData = null;
      let daysUntil = 7;
      
      for (let i = 0; i < 7; i++) {
        const checkDay = days[(now.getDay() + i) % 7];
        const services = serviceSchedule.filter(s => s.day === checkDay || 
          (s.day === "First Thursday" && checkDay === "Thursday"));
        
        for (const service of services) {
          const [time, period] = service.time.split(" ");
          const [hours, minutes] = time.split(":").map(Number);
          let serviceHour = period === "PM" && hours !== 12 ? hours + 12 : hours;
          if (period === "AM" && hours === 12) serviceHour = 0;
          
          const serviceDate = new Date(now);
          serviceDate.setDate(serviceDate.getDate() + i);
          serviceDate.setHours(serviceHour, minutes, 0, 0);
          
          if (serviceDate > now) {
            if (!nextServiceData || serviceDate < nextServiceData.date) {
              nextServiceData = { ...service, date: serviceDate };
              daysUntil = i;
            }
          }
        }
      }
      
      if (nextServiceData) {
        const diff = nextServiceData.date.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours < 24) {
          setCountdown(`${hours}h ${mins}m`);
        } else {
          setCountdown(`${daysUntil}d ${hours % 24}h`);
        }
        setNextService(nextServiceData);
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          toast({ title: "Notifications Enabled", description: "You'll be notified when we go live." });
        }
      }
    } else {
      setNotificationsEnabled(false);
      toast({ title: "Notifications Disabled" });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'CCC Light Live', url: window.location.href });
      } catch (err) {
        console.warn('Share failed', err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link Copied" });
    }
  };

  const headquarters = branches.find(b => b.isHeadquarters);
  const youtubeUrl = headquarters?.socials.youtube || "https://youtube.com/@CCCLIGHTINTERNATIONAL";

  return (
    <>
      <SEO
        title="Live Service | CCC Light International Parish"
        description="Watch live worship services from CCC Light International Parish."
        url="/live"
      />
      
      <main className="min-h-screen pb-24 bg-black">
        <div className="container max-w-lg mx-auto px-4">
          {/* Back Button */}
          <div className="pt-5 pb-3">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
          </div>
          
          {/* Header */}
          <div className="text-center mb-5">
            {isLive ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-semibold text-xs uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Live Now
                </span>
                <span className="w-px h-3 bg-red-500/30" />
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-red-400/80" />
                  <span className="text-red-300/80 text-xs font-medium">{viewerCount}</span>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-white/50 text-xs" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Next service in
                  </span>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{countdown}</span>
                </div>
                {nextService && (
                  <p className="text-white/30 text-[11px] mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {nextService.name}
                  </p>
                )}
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {isLive ? (
                <>Live <span className="text-red-400">Worship</span></>
              ) : (
                <>Live <span className="text-white/60">Services</span></>
              )}
            </h1>
            <p className="text-white/40 text-xs" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Join our global congregation
            </p>
          </div>

          {/* Video Player Area */}
          <div
            className="relative rounded-2xl overflow-hidden mb-5"
            style={{
              aspectRatio: '16/9',
              background: isLive
                ? 'linear-gradient(135deg, #1a0505 0%, #2a0a0a 100%)'
                : 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              border: isLive ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Live indicator bar */}
            {isLive && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: isLive 
                    ? 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  border: isLive ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {isLive ? (
                  <Radio className="w-7 h-7 text-red-400" />
                ) : (
                  <Tv className="w-7 h-7 text-white/50" />
                )}
              </div>
              
              <p className="text-white text-sm font-medium mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {isLive ? 'Service is Live' : 'No Active Stream'}
              </p>
              <p className="text-white/35 text-[11px] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {isLive ? 'Join hundreds watching now' : `Next: ${nextService?.name || 'Coming Soon'}`}
              </p>
              
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-transform active:scale-95"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: isLive 
                    ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                    : 'linear-gradient(135deg, #262626 0%, #1a1a1a 100%)',
                  color: '#fff',
                  border: isLive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Play className="w-4 h-4" style={{ fill: '#fff' }} />
                {isLive ? 'Watch Live' : 'Open YouTube'}
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Streaming Platforms */}
          <div className="flex justify-center gap-2.5 mb-5">
            {streamingPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-colors"
              >
                <platform.icon className="w-4 h-4" style={{ color: platform.color }} />
                <span className="text-white/60 text-xs font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {platform.name}
                </span>
              </a>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant="ghost"
              onClick={handleShare}
              className="gap-2 text-white/40 hover:text-white/70 hover:bg-white/5 text-xs h-9 px-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button
              variant="ghost"
              onClick={handleNotificationToggle}
              className="gap-2 text-white/40 hover:text-white/70 hover:bg-white/5 text-xs h-9 px-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {notificationsEnabled ? <BellOff className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
              {notificationsEnabled ? "Alerts On" : "Remind Me"}
            </Button>
          </div>

          {/* Service Schedule */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-6 bg-white/10" />
              <h2 className="text-sm font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Service Schedule
              </h2>
              <span className="h-px w-6 bg-white/10" />
            </div>
            
            {/* Schedule Cards - Horizontal Scroll */}
            <div className="flex overflow-x-auto gap-2.5 pb-3 -mx-4 px-4 scrollbar-hide">
              {serviceSchedule.map((service, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[140px] p-3 rounded-xl"
                  style={{
                    background: service.featured 
                      ? 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
                    border: service.featured ? '1px solid rgba(239,68,68,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    {service.featured && <Wifi className="w-3 h-3 text-red-400" />}
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${service.featured ? 'text-red-400' : 'text-white/40'}`}>
                      {service.day}
                    </span>
                  </div>
                  <p className="text-white text-xs font-medium mb-1 line-clamp-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {service.name}
                  </p>
                  <p className="text-white/40 text-[11px]">{service.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Status */}
          <div className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/3">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white/40 text-xs" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Connected & Ready
            </span>
          </div>
        </div>
      </main>
    </>
  );
});

Live.displayName = 'Live';
export default Live;
