import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, Download, CheckCircle, Cloud, CloudOff } from 'lucide-react';
import { useOfflineManager } from '@/hooks/useOfflineManager';

// Small, non-intrusive offline indicator - positioned at bottom right
export const OfflineIndicator = () => {
  const { isOnline, stats } = useOfflineManager();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-20 right-4 z-[60] flex items-center gap-2 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full shadow-lg"
        >
          <WifiOff className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Offline</span>
          {stats.chaptersDownloaded > 0 && (
            <span className="text-[10px] opacity-80">
              • {stats.chaptersDownloaded} cached
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface OfflineBadgeProps {
  isAvailable: boolean;
  size?: 'sm' | 'md';
}

export const OfflineBadge = ({ isAvailable, size = 'sm' }: OfflineBadgeProps) => {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`flex items-center gap-1 ${
        isAvailable 
          ? 'text-emerald-400' 
          : 'text-gray-400'
      }`}
    >
      {isAvailable ? (
        <>
          <CheckCircle className={iconSize} />
          {size === 'md' && <span className="text-xs">Offline</span>}
        </>
      ) : (
        <>
          <Cloud className={iconSize} />
          {size === 'md' && <span className="text-xs">Online only</span>}
        </>
      )}
    </motion.div>
  );
};

interface DownloadButtonProps {
  bookName: string;
  onDownload: () => void;
  isDownloaded: boolean;
  progress?: number;
  isDownloading?: boolean;
}

export const DownloadButton = ({ 
  bookName, 
  onDownload, 
  isDownloaded, 
  progress = 0,
  isDownloading = false 
}: DownloadButtonProps) => {
  if (isDownloaded) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-1 text-emerald-400 text-xs"
      >
        <CheckCircle className="w-4 h-4" />
        <span>Downloaded</span>
      </motion.div>
    );
  }

  if (isDownloading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-sky-400">{progress}%</span>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => {
        e.stopPropagation();
        onDownload();
      }}
      className="flex items-center gap-1 text-sky-400 hover:text-sky-300 text-xs"
    >
      <Download className="w-4 h-4" />
      <span>Download</span>
    </motion.button>
  );
};

interface OfflineStatsCardProps {
  className?: string;
}

export const OfflineStatsCard = ({ className }: OfflineStatsCardProps) => {
  const { stats, isOnline, clearAllOfflineData } = useOfflineManager();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-4 border border-gray-700/50 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-5 h-5 text-emerald-400" />
          ) : (
            <CloudOff className="w-5 h-5 text-amber-400" />
          )}
          Offline Storage
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isOnline ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
        }`}>
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/50 rounded-xl p-3">
          <p className="text-2xl font-bold text-sky-400">{stats.booksDownloaded}</p>
          <p className="text-xs text-gray-400">Books Downloaded</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3">
          <p className="text-2xl font-bold text-emerald-400">{stats.chaptersDownloaded}</p>
          <p className="text-xs text-gray-400">Chapters Cached</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3">
          <p className="text-2xl font-bold text-amber-400">{stats.devotionalsAvailable}</p>
          <p className="text-xs text-gray-400">Devotionals</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3">
          <p className="text-2xl font-bold text-purple-400">{stats.storageUsed}</p>
          <p className="text-xs text-gray-400">Storage Used</p>
        </div>
      </div>

      {stats.chaptersDownloaded > 0 && (
        <button
          onClick={clearAllOfflineData}
          className="w-full mt-4 py-2 text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Clear All Offline Data
        </button>
      )}
    </motion.div>
  );
};

export default OfflineIndicator;
