import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Check, X, Wifi, WifiOff, Trash2, 
  ChevronRight, CloudOff, HardDrive, BookOpen,
  RefreshCw, AlertTriangle, FolderOpen
} from 'lucide-react';
import { useOfflineManager, BIBLE_BOOKS } from '@/hooks/useOfflineManager';
import { toast } from 'sonner';

interface BibleOfflineDownloadsProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBook?: (book: string, chapter: number) => void;
}

const BibleOfflineDownloads = ({ isOpen, onClose, onNavigateToBook }: BibleOfflineDownloadsProps) => {
  const {
    isOnline,
    downloadProgress,
    downloadBook,
    cancelDownload,
    isBookDownloaded,
    getBookProgress,
    stats,
    clearAllOfflineData,
    cacheDevotionals,
    cacheSermons,
  } = useOfflineManager();

  const [activeTestament, setActiveTestament] = useState<'old' | 'new'>('old');
  const [downloadingBook, setDownloadingBook] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'downloaded'>('all');

  // Auto-cache devotionals and sermons once
  useEffect(() => {
    if (isOpen) {
      const cached = localStorage.getItem('ccc-content-cached');
      if (!cached) {
        cacheDevotionals();
        cacheSermons();
        localStorage.setItem('ccc-content-cached', 'true');
      }
    }
  }, [isOpen, cacheDevotionals, cacheSermons]);

  const handleDownload = async (bookName: string) => {
    if (!isOnline) {
      toast.error('You need internet to download');
      return;
    }
    
    if (isBookDownloaded(bookName)) {
      toast.info(`${bookName} already downloaded`);
      return;
    }

    setDownloadingBook(bookName);
    const success = await downloadBook(bookName);
    setDownloadingBook(null);
    
    if (success) {
      toast.success(`${bookName} downloaded for offline reading`);
    } else if (downloadProgress?.failedChapters?.length) {
      toast.warning(`${bookName} partially downloaded. ${downloadProgress.failedChapters.length} chapters failed.`);
    } else {
      toast.error(`Failed to download ${bookName}. Try again.`);
    }
  };

  const handleClearData = () => {
    clearAllOfflineData();
    toast.success('Offline data cleared');
  };

  const books = activeTestament === 'old' 
    ? BIBLE_BOOKS.oldTestament 
    : BIBLE_BOOKS.newTestament;

  const filteredBooks = viewMode === 'downloaded' 
    ? books.filter(b => isBookDownloaded(b.name) || getBookProgress(b.name) > 0)
    : books;

  const downloadedCount = books.filter(b => isBookDownloaded(b.name)).length;
  const totalDownloadedCount = [...BIBLE_BOOKS.oldTestament, ...BIBLE_BOOKS.newTestament]
    .filter(b => isBookDownloaded(b.name)).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] bg-white"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="flex flex-col h-full">
            {/* Premium Header */}
            <div 
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: 'linear-gradient(180deg, #FDFCFA 0%, #FAF8F5 100%)',
                borderBottom: '1px solid rgba(180,140,80,0.12)',
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)',
                    boxShadow: '0 4px 12px rgba(184,134,11,0.25)',
                  }}
                >
                  <Download className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Offline Library
                  </h2>
                  <p className="text-[10px] text-amber-700/70">Download • Read Anywhere</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-amber-100/50"
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Status Bar */}
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-amber-500" />
                  )}
                  <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-amber-600'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <HardDrive className="w-4 h-4" />
                  <span className="text-xs">{stats.storageUsed}</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{stats.booksDownloaded}</p>
                  <p className="text-[10px] text-gray-500">Books</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{stats.chaptersDownloaded}</p>
                  <p className="text-[10px] text-gray-500">Chapters</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{stats.devotionalsAvailable}</p>
                  <p className="text-[10px] text-gray-500">Devotions</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-gray-900">{stats.sermonsAvailable}</p>
                  <p className="text-[10px] text-gray-500">Sermons</p>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex px-5 py-2 gap-2 bg-gray-50 border-b border-gray-100">
              <button
                onClick={() => setViewMode('all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  viewMode === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                All Books
              </button>
              <button
                onClick={() => setViewMode('downloaded')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  viewMode === 'downloaded' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                Downloaded ({totalDownloadedCount})
              </button>
            </div>

            {/* Testament Tabs */}
            <div className="flex px-5 py-3 gap-2 border-b border-gray-100">
              <motion.button
                onClick={() => setActiveTestament('old')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTestament === 'old'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                Old Testament
              </motion.button>
              <motion.button
                onClick={() => setActiveTestament('new')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTestament === 'new'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                New Testament
              </motion.button>
            </div>

            {/* Download Progress */}
            <AnimatePresence>
              {downloadProgress && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 py-3 bg-sky-50 border-b border-sky-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-sky-900">
                      {downloadProgress.status === 'error' ? (
                        <span className="flex items-center gap-1 text-amber-700">
                          <AlertTriangle className="w-4 h-4" />
                          {downloadProgress.book} - {downloadProgress.failedChapters?.length || 0} chapters failed
                        </span>
                      ) : (
                        `Downloading ${downloadProgress.book}`
                      )}
                    </span>
                    <motion.button
                      onClick={cancelDownload}
                      className="text-xs text-sky-600"
                      whileTap={{ scale: 0.95 }}
                    >
                      {downloadProgress.status === 'error' ? 'Dismiss' : 'Cancel'}
                    </motion.button>
                  </div>
                  <div className="h-2 bg-sky-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        downloadProgress.status === 'error' ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(downloadProgress.current / downloadProgress.total) * 100}%` 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-sky-600 mt-1 text-center">
                    Chapter {downloadProgress.current} of {downloadProgress.total}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Books List */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-500">
                  {viewMode === 'downloaded' 
                    ? `${filteredBooks.length} downloaded`
                    : `${downloadedCount} of ${books.length} downloaded`
                  }
                </p>
                {stats.chaptersDownloaded > 0 && (
                  <motion.button
                    onClick={handleClearData}
                    className="flex items-center gap-1 text-xs text-red-500"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </motion.button>
                )}
              </div>

              {filteredBooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <FolderOpen className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">No downloaded books yet</p>
                  <p className="text-xs mt-1">Download books to read offline</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredBooks.map((book) => {
                    const isDownloaded = isBookDownloaded(book.name);
                    const progress = getBookProgress(book.name);
                    const isDownloading = downloadingBook === book.name;
                    const isPartial = progress > 0 && progress < 100;

                    return (
                      <motion.div
                        key={book.name}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          isDownloaded 
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100' 
                            : isPartial 
                              ? 'bg-amber-50 border border-amber-100' 
                              : 'bg-stone-50 border border-stone-100'
                        }`}
                        whileTap={{ scale: isDownloaded ? 0.98 : 1 }}
                      >
                        {/* Clickable book info for downloaded books */}
                        <motion.button
                          onClick={() => {
                            if (isDownloaded && onNavigateToBook) {
                              onNavigateToBook(book.name, 1);
                              onClose();
                              toast.success(`Opening ${book.name}`);
                            }
                          }}
                          disabled={!isDownloaded}
                          className="flex items-center gap-3 flex-1 text-left"
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isDownloaded 
                              ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
                              : isPartial
                                ? 'bg-gradient-to-br from-amber-400 to-amber-500'
                                : 'bg-stone-200'
                          }`}>
                            {isDownloaded ? (
                              <Check className="w-4 h-4 text-white" />
                            ) : isPartial ? (
                              <RefreshCw className="w-4 h-4 text-white" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-stone-500" />
                            )}
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${isDownloaded ? 'text-emerald-900' : 'text-gray-900'}`}>
                              {book.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {book.chapters} chapters
                              {isPartial && ` • ${progress}%`}
                              {isDownloaded && ' • Tap to read'}
                            </p>
                          </div>
                        </motion.button>

                        {/* Download Button - One Click */}
                        <motion.button
                          onClick={() => handleDownload(book.name)}
                          disabled={isDownloading || isDownloaded || !isOnline}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                            isDownloaded
                              ? 'bg-emerald-500/20 text-emerald-700'
                              : isDownloading
                                ? 'bg-amber-100 text-amber-700'
                                : isPartial
                                  ? 'bg-amber-500 text-white'
                                  : !isOnline
                                    ? 'bg-stone-200 text-stone-400'
                                    : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white'
                          }`}
                          whileTap={{ scale: isDownloaded ? 1 : 0.95 }}
                        >
                          {isDownloaded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Saved
                            </>
                          ) : isDownloading ? (
                            <>
                              <motion.div
                                className="w-3.5 h-3.5 border-2 border-amber-700 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              />
                              <span className="hidden xs:inline">Saving...</span>
                            </>
                          ) : isPartial ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5" />
                              Resume
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              Save
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Offline Notice - Small and non-intrusive */}
            {!isOnline && (
              <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
                <div className="flex items-center gap-2">
                  <CloudOff className="w-4 h-4 text-amber-600" />
                  <p className="text-xs text-amber-700">
                    Offline mode • Downloaded content available
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BibleOfflineDownloads;
