import { useState, useEffect } from "react";
import { Radio, X } from "lucide-react";

interface LiveIndicatorProps {
  className?: string;
}

// Service schedule - customize these times
const SERVICE_SCHEDULE = [
  { day: 0, start: 10, end: 13, name: "Sunday Service" },
  { day: 3, start: 17, end: 19, name: "Wednesday Bible Study" },
  { day: 5, start: 18, end: 21, name: "Friday Vigil" },
];

const LiveIndicator = ({ className = "" }: LiveIndicatorProps) => {
  const [isLive, setIsLive] = useState(false);
  const [currentService, setCurrentService] = useState<string>("");
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const checkIfLive = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();

      const liveService = SERVICE_SCHEDULE.find(
        (service) =>
          service.day === currentDay &&
          currentHour >= service.start &&
          currentHour < service.end
      );

      if (liveService) {
        setIsLive(true);
        setCurrentService(liveService.name);
      } else {
        setIsLive(false);
        setCurrentService("");
      }
    };

    checkIfLive();
    // Check every 5 minutes instead of every minute
    const interval = setInterval(checkIfLive, 300000);
    return () => clearInterval(interval);
  }, []);

  if (!isLive || !showBanner) return null;

  return (
    <div
      className={`fixed top-[60px] md:top-[72px] left-0 right-0 z-40 animate-fade-in ${className}`}
    >
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-2.5 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            {/* Simple Live Dot */}
            <div className="relative flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <Radio className="w-4 h-4 ml-1" />
            </div>

            <div className="flex items-center gap-2 text-sm md:text-base">
              <span className="font-bold tracking-wider uppercase text-[10px] md:text-xs">
                LIVE NOW
              </span>
              <span className="hidden sm:inline text-white/80">•</span>
              <span className="hidden sm:inline font-medium">{currentService}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#live"
              className="bg-white text-red-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide hover:bg-white/90 transition-colors active:scale-95"
            >
              Watch Now
            </a>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveIndicator;