import { useState, useEffect, useCallback } from 'react';

interface CacheConfig {
  key: string;
  maxAge?: number; // in milliseconds
}

interface CachedData<T> {
  data: T;
  timestamp: number;
  version: string;
}

const CACHE_VERSION = '1.0.0';

export const useOfflineStorage = <T>(config: CacheConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(config.key);
      if (cached) {
        const parsed: CachedData<T> = JSON.parse(cached);
        
        // Check version compatibility
        if (parsed.version === CACHE_VERSION) {
          setData(parsed.data);
          
          // Check if data is stale
          if (config.maxAge) {
            const age = Date.now() - parsed.timestamp;
            setIsStale(age > config.maxAge);
          }
        }
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [config.key, config.maxAge]);

  // Save to localStorage
  const saveData = useCallback((newData: T) => {
    try {
      const cached: CachedData<T> = {
        data: newData,
        timestamp: Date.now(),
        version: CACHE_VERSION,
      };
      localStorage.setItem(config.key, JSON.stringify(cached));
      setData(newData);
      setIsStale(false);
    } catch (error) {
      console.error('Error saving cached data:', error);
    }
  }, [config.key]);

  // Clear cached data
  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(config.key);
      setData(null);
    } catch (error) {
      console.error('Error clearing cached data:', error);
    }
  }, [config.key]);

  return {
    data,
    isLoading,
    isStale,
    saveData,
    clearData,
  };
};

// Bible-specific offline storage
export interface BibleChapter {
  book: string;
  chapter: number;
  verses: Array<{ verse: number; text: string }>;
}

export interface Devotional {
  id: string;
  title: string;
  scripture: string;
  reflection: string;
  prayer: string;
  date: string;
}

export const useBibleOfflineStorage = () => {
  const chaptersCache = useOfflineStorage<Record<string, BibleChapter>>({
    key: 'ccc-bible-chapters',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const devotionalsCache = useOfflineStorage<Devotional[]>({
    key: 'ccc-devotionals',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  const bookmarksCache = useOfflineStorage<string[]>({
    key: 'ccc-bible-bookmarks',
  });

  const highlightsCache = useOfflineStorage<Record<string, string[]>>({
    key: 'ccc-bible-highlights',
  });

  const readingProgressCache = useOfflineStorage<{
    streak: number;
    lastRead: string;
    chaptersRead: number;
  }>({
    key: 'ccc-reading-progress',
  });

  // Save a Bible chapter for offline reading
  const saveChapterOffline = useCallback((book: string, chapter: number, verses: Array<{ verse: number; text: string }>) => {
    const key = `${book}-${chapter}`;
    const currentChapters = chaptersCache.data || {};
    chaptersCache.saveData({
      ...currentChapters,
      [key]: { book, chapter, verses },
    });
  }, [chaptersCache]);

  // Get a Bible chapter from offline storage
  const getChapterOffline = useCallback((book: string, chapter: number): BibleChapter | null => {
    const key = `${book}-${chapter}`;
    return chaptersCache.data?.[key] || null;
  }, [chaptersCache.data]);

  // Check if a chapter is available offline
  const isChapterAvailableOffline = useCallback((book: string, chapter: number): boolean => {
    const key = `${book}-${chapter}`;
    return !!chaptersCache.data?.[key];
  }, [chaptersCache.data]);

  // Save devotionals for offline reading
  const saveDevotionalsOffline = useCallback((devotionals: Devotional[]) => {
    devotionalsCache.saveData(devotionals);
  }, [devotionalsCache]);

  // Get devotionals from offline storage
  const getDevotionalsOffline = useCallback((): Devotional[] => {
    return devotionalsCache.data || [];
  }, [devotionalsCache.data]);

  return {
    // Chapter methods
    saveChapterOffline,
    getChapterOffline,
    isChapterAvailableOffline,
    chapters: chaptersCache.data,
    
    // Devotional methods
    saveDevotionalsOffline,
    getDevotionalsOffline,
    devotionals: devotionalsCache.data,
    
    // Bookmarks
    bookmarks: bookmarksCache.data || [],
    saveBookmarks: bookmarksCache.saveData,
    
    // Highlights
    highlights: highlightsCache.data || {},
    saveHighlights: highlightsCache.saveData,
    
    // Reading progress
    readingProgress: readingProgressCache.data,
    saveReadingProgress: readingProgressCache.saveData,
    
    // Loading states
    isLoading: chaptersCache.isLoading || devotionalsCache.isLoading,
  };
};

export default useOfflineStorage;
