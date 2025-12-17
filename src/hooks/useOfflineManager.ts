import { useState, useEffect, useCallback, useRef } from 'react';
import { useBibleOfflineStorage, BibleChapter, Devotional } from './useOfflineStorage';

// Bible books data for offline download
export const BIBLE_BOOKS = {
  oldTestament: [
    { name: 'Genesis', chapters: 50 },
    { name: 'Exodus', chapters: 40 },
    { name: 'Leviticus', chapters: 27 },
    { name: 'Numbers', chapters: 36 },
    { name: 'Deuteronomy', chapters: 34 },
    { name: 'Joshua', chapters: 24 },
    { name: 'Judges', chapters: 21 },
    { name: 'Ruth', chapters: 4 },
    { name: '1 Samuel', chapters: 31 },
    { name: '2 Samuel', chapters: 24 },
    { name: '1 Kings', chapters: 22 },
    { name: '2 Kings', chapters: 25 },
    { name: '1 Chronicles', chapters: 29 },
    { name: '2 Chronicles', chapters: 36 },
    { name: 'Ezra', chapters: 10 },
    { name: 'Nehemiah', chapters: 13 },
    { name: 'Esther', chapters: 10 },
    { name: 'Job', chapters: 42 },
    { name: 'Psalms', chapters: 150 },
    { name: 'Proverbs', chapters: 31 },
    { name: 'Ecclesiastes', chapters: 12 },
    { name: 'Song of Solomon', chapters: 8 },
    { name: 'Isaiah', chapters: 66 },
    { name: 'Jeremiah', chapters: 52 },
    { name: 'Lamentations', chapters: 5 },
    { name: 'Ezekiel', chapters: 48 },
    { name: 'Daniel', chapters: 12 },
    { name: 'Hosea', chapters: 14 },
    { name: 'Joel', chapters: 3 },
    { name: 'Amos', chapters: 9 },
    { name: 'Obadiah', chapters: 1 },
    { name: 'Jonah', chapters: 4 },
    { name: 'Micah', chapters: 7 },
    { name: 'Nahum', chapters: 3 },
    { name: 'Habakkuk', chapters: 3 },
    { name: 'Zephaniah', chapters: 3 },
    { name: 'Haggai', chapters: 2 },
    { name: 'Zechariah', chapters: 14 },
    { name: 'Malachi', chapters: 4 },
  ],
  newTestament: [
    { name: 'Matthew', chapters: 28 },
    { name: 'Mark', chapters: 16 },
    { name: 'Luke', chapters: 24 },
    { name: 'John', chapters: 21 },
    { name: 'Acts', chapters: 28 },
    { name: 'Romans', chapters: 16 },
    { name: '1 Corinthians', chapters: 16 },
    { name: '2 Corinthians', chapters: 13 },
    { name: 'Galatians', chapters: 6 },
    { name: 'Ephesians', chapters: 6 },
    { name: 'Philippians', chapters: 4 },
    { name: 'Colossians', chapters: 4 },
    { name: '1 Thessalonians', chapters: 5 },
    { name: '2 Thessalonians', chapters: 3 },
    { name: '1 Timothy', chapters: 6 },
    { name: '2 Timothy', chapters: 4 },
    { name: 'Titus', chapters: 3 },
    { name: 'Philemon', chapters: 1 },
    { name: 'Hebrews', chapters: 13 },
    { name: 'James', chapters: 5 },
    { name: '1 Peter', chapters: 5 },
    { name: '2 Peter', chapters: 3 },
    { name: '1 John', chapters: 5 },
    { name: '2 John', chapters: 1 },
    { name: '3 John', chapters: 1 },
    { name: 'Jude', chapters: 1 },
    { name: 'Revelation', chapters: 22 },
  ],
};

// All devotionals to cache
export const DEVOTIONALS_DATA: Devotional[] = [
  {
    id: 'daily-1',
    title: 'Walking in Divine Light',
    scripture: 'John 8:12 - "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."',
    reflection: 'As members of the Celestial Church of Christ, we are called to be bearers of divine light. Just as Christ proclaimed Himself the light of the world, we too are commissioned to illuminate the darkness around us through our faith, actions, and words.',
    prayer: 'Heavenly Father, fill me with Your divine light. Help me to walk in righteousness and to shine Your light in every corner of my life. In Jesus\' name, Amen.',
    date: 'daily',
  },
  {
    id: 'daily-2',
    title: 'Strength in Prayer',
    scripture: 'Philippians 4:6-7 - "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',
    reflection: 'Prayer is our direct line to the Almighty. In the Celestial tradition, we understand that prayer moves mountains and opens doors that no man can shut. Let us approach the throne of grace with confidence.',
    prayer: 'Lord, teach me to pray without ceasing. May my prayers ascend to You like sweet incense, and may Your answers flow like rivers of living water. Amen.',
    date: 'daily',
  },
  {
    id: 'daily-3',
    title: 'Faith That Overcomes',
    scripture: '1 John 5:4 - "For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith."',
    reflection: 'Our faith is not passive—it is an active, living force that empowers us to overcome every challenge. Through faith, the impossible becomes possible, and mountains are moved.',
    prayer: 'Lord, strengthen my faith. Help me to believe even when I cannot see, and to trust even when circumstances seem contrary. In Jesus\' name, Amen.',
    date: 'daily',
  },
  {
    id: 'daily-4',
    title: 'Divine Protection',
    scripture: 'Psalm 91:11 - "For he will command his angels concerning you to guard you in all your ways."',
    reflection: 'God\'s protection surrounds us like a fortress. The angels of the Most High are dispatched for our safety, and no weapon formed against us shall prosper.',
    prayer: 'Father, I thank You for Your divine protection. Cover me and my family under the shadow of Your wings. Let Your angels encamp around us. Amen.',
    date: 'daily',
  },
  {
    id: 'daily-5',
    title: 'Abundant Blessings',
    scripture: 'Ephesians 3:20 - "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us."',
    reflection: 'Our God is a God of abundance. His blessings exceed our expectations and His provisions surpass our needs. Trust in His unlimited capacity to bless.',
    prayer: 'Gracious Father, I receive Your abundant blessings. Open the floodgates of heaven and pour out blessings that I cannot contain. In Jesus\' name, Amen.',
    date: 'daily',
  },
  {
    id: 'weekly-1',
    title: 'The Power of Unity',
    scripture: 'Psalm 133:1 - "How good and pleasant it is when God\'s people live together in unity!"',
    reflection: 'Unity among believers is a powerful testimony to the world. When we come together in one accord, supernatural things happen. The early church experienced unprecedented power because they were of one mind and one spirit.',
    prayer: 'Lord, help us to maintain unity in our parish and across all CCC Light branches worldwide. Let love bind us together as we spread Your light. Amen.',
    date: 'weekly',
  },
  {
    id: 'weekly-2',
    title: 'Spiritual Warfare',
    scripture: 'Ephesians 6:12 - "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world."',
    reflection: 'We are engaged in a spiritual battle that requires spiritual weapons. Through prayer, fasting, and the Word of God, we overcome every principality and power that stands against us.',
    prayer: 'Almighty God, equip me with the full armor of heaven. Make me a victorious warrior in Your army, standing firm against all attacks of the enemy. Amen.',
    date: 'weekly',
  },
  {
    id: 'weekly-3',
    title: 'Walking in Holiness',
    scripture: '1 Peter 1:15-16 - "But just as he who called you is holy, so be holy in all you do; for it is written: Be holy, because I am holy."',
    reflection: 'Holiness is not optional for the believer—it is our calling and our destiny. The Celestial Church emphasizes holy living because we serve a holy God who requires purity of heart and action.',
    prayer: 'Holy Spirit, purify my heart and sanctify my life. Help me to live in a manner worthy of Your calling, reflecting Your holiness in all I do. Amen.',
    date: 'weekly',
  },
  {
    id: 'weekly-4',
    title: 'Divine Healing',
    scripture: 'Isaiah 53:5 - "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed."',
    reflection: 'Healing is part of our covenant inheritance in Christ. Through His stripes, we have access to complete healing—physical, emotional, and spiritual. Claim your healing today!',
    prayer: 'Lord Jesus, I claim the healing that was purchased at Calvary. Touch every area of my life that needs restoration and make me whole. In Your precious name, Amen.',
    date: 'weekly',
  },
  {
    id: 'monthly-1',
    title: 'Purpose and Destiny',
    scripture: 'Jeremiah 29:11 - "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."',
    reflection: 'God has a unique purpose for each of His children. Understanding and walking in your divine destiny brings fulfillment and glorifies God. Seek His will for your life.',
    prayer: 'Father, reveal Your purpose for my life. Guide my steps according to Your perfect plan and help me fulfill my divine destiny. In Jesus\' name, Amen.',
    date: 'monthly',
  },
  {
    id: 'monthly-2',
    title: 'Building Generational Legacy',
    scripture: 'Proverbs 13:22 - "A good person leaves an inheritance for their children\'s children."',
    reflection: 'Our faith is meant to impact generations. As we serve God faithfully, we are building a legacy of faith, blessing, and righteousness that will outlive us and bless our descendants.',
    prayer: 'Lord, help me to build a lasting legacy of faith. May my children and grandchildren walk in Your ways and experience Your blessings. Amen.',
    date: 'monthly',
  },
  {
    id: 'monthly-3',
    title: 'The Gift of Prophecy',
    scripture: '1 Corinthians 14:1 - "Follow the way of love and eagerly desire gifts of the Spirit, especially prophecy."',
    reflection: 'The Celestial Church of Christ was founded through divine prophecy and continues to operate in prophetic gifts. The gift of prophecy edifies, encourages, and comforts the body of Christ.',
    prayer: 'Holy Spirit, stir up the gift of prophecy within our congregation. Use us as vessels for Your prophetic word to guide and direct Your people. Amen.',
    date: 'monthly',
  },
  {
    id: 'monthly-4',
    title: 'Missions and Evangelism',
    scripture: 'Matthew 28:19 - "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."',
    reflection: 'The Great Commission is not just for missionaries—it is for every believer. CCC Light International spreads across 4 nations because we take this mandate seriously. Be a light wherever you go.',
    prayer: 'Lord, give me a heart for the lost. Use me to bring others into Your kingdom and to spread the light of Christ across the nations. Amen.',
    date: 'monthly',
  },
];

// Sermon data to cache
export const SERMONS_DATA = [
  {
    id: '1',
    title: 'Walking in Divine Purpose',
    preacher: 'Sup. Evang. FA Alebiosu (JP)',
    date: 'December 6, 2025',
    scripture: 'Jeremiah 29:11',
    description: 'Discovering and fulfilling God\'s unique calling for your life through faith and obedience.',
    videoId: 'dQw4w9WgXcQ',
    series: 'Divine Destiny Series',
  },
  {
    id: '2',
    title: 'The Power of Unwavering Faith',
    preacher: 'Sup. Evang. FA Alebiosu (JP)',
    date: 'November 29, 2025',
    scripture: 'Hebrews 11:1-6',
    description: 'Understanding faith as the substance of things hoped for and the evidence of things not seen.',
    videoId: 'dQw4w9WgXcQ',
    series: 'Faith That Moves Mountains',
  },
  {
    id: '3',
    title: 'Breaking Generational Chains',
    preacher: 'Sup. Evang. FA Alebiosu (JP)',
    date: 'November 22, 2025',
    scripture: 'Galatians 5:1',
    description: 'Christ has set us free from every ancestral bondage and generational curse.',
    videoId: 'dQw4w9WgXcQ',
    series: 'Freedom in Christ',
  },
  {
    id: '4',
    title: 'The Anointing for Service',
    preacher: 'Sup. Evang. FA Alebiosu (JP)',
    date: 'November 15, 2025',
    scripture: 'Acts 1:8',
    description: 'Receiving the power of the Holy Spirit to be effective witnesses for Christ.',
    videoId: 'dQw4w9WgXcQ',
    series: 'Power for Service',
  },
  {
    id: '5',
    title: 'Divine Healing and Restoration',
    preacher: 'Sup. Evang. FA Alebiosu (JP)',
    date: 'November 8, 2025',
    scripture: 'Isaiah 53:5',
    description: 'Claiming the healing that was purchased at Calvary through Christ\'s stripes.',
    videoId: 'dQw4w9WgXcQ',
    series: 'Healing Service',
  },
];

interface DownloadProgress {
  book: string;
  current: number;
  total: number;
  status: 'downloading' | 'completed' | 'error' | 'paused';
  failedChapters: number[];
}

interface OfflineStats {
  booksDownloaded: number;
  chaptersDownloaded: number;
  devotionalsAvailable: number;
  sermonsAvailable: number;
  storageUsed: string;
}

export const useOfflineManager = () => {
  const bibleStorage = useBibleOfflineStorage();
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [stats, setStats] = useState<OfflineStats>({
    booksDownloaded: 0,
    chaptersDownloaded: 0,
    devotionalsAvailable: 0,
    sermonsAvailable: 0,
    storageUsed: '0 KB',
  });
  const cancelRef = useRef(false);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Calculate storage stats
  useEffect(() => {
    const calculateStats = () => {
      const chapters = bibleStorage.chapters || {};
      const chapterCount = Object.keys(chapters).length;
      
      // Calculate unique books downloaded
      const booksDownloaded = new Set(
        Object.keys(chapters).map(key => key.split('-')[0])
      ).size;

      // Check devotionals
      const devotionalsKey = 'ccc-devotionals';
      const devotionalsData = localStorage.getItem(devotionalsKey);
      const devotionalsCount = devotionalsData ? JSON.parse(devotionalsData).data?.length || 0 : 0;

      // Check sermons
      const sermonsKey = 'ccc-sermons-offline';
      const sermonsData = localStorage.getItem(sermonsKey);
      const sermonsCount = sermonsData ? JSON.parse(sermonsData).data?.length || 0 : 0;

      // Estimate storage usage
      let totalBytes = 0;
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith('ccc-')) {
          totalBytes += localStorage.getItem(key)?.length || 0;
        }
      }
      
      const storageUsed = totalBytes < 1024 
        ? `${totalBytes} B`
        : totalBytes < 1024 * 1024 
          ? `${(totalBytes / 1024).toFixed(1)} KB`
          : `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`;

      setStats({
        booksDownloaded,
        chaptersDownloaded: chapterCount,
        devotionalsAvailable: devotionalsCount,
        sermonsAvailable: sermonsCount,
        storageUsed,
      });
    };

    calculateStats();
  }, [bibleStorage.chapters]);

  // Check if a book is fully downloaded
  const isBookDownloaded = useCallback((bookName: string): boolean => {
    const allBooks = [...BIBLE_BOOKS.oldTestament, ...BIBLE_BOOKS.newTestament];
    const book = allBooks.find(b => b.name === bookName);
    if (!book) return false;

    for (let i = 1; i <= book.chapters; i++) {
      if (!bibleStorage.isChapterAvailableOffline(bookName, i)) {
        return false;
      }
    }
    return true;
  }, [bibleStorage]);

  // Get download progress for a book
  const getBookProgress = useCallback((bookName: string): number => {
    const allBooks = [...BIBLE_BOOKS.oldTestament, ...BIBLE_BOOKS.newTestament];
    const book = allBooks.find(b => b.name === bookName);
    if (!book) return 0;

    let downloaded = 0;
    for (let i = 1; i <= book.chapters; i++) {
      if (bibleStorage.isChapterAvailableOffline(bookName, i)) {
        downloaded++;
      }
    }
    return Math.round((downloaded / book.chapters) * 100);
  }, [bibleStorage]);

  // Fetch with retry logic
  const fetchWithRetry = async (url: string, retries = 3, delay = 1000): Promise<Response | null> => {
    for (let i = 0; i < retries; i++) {
      if (cancelRef.current) return null;
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) return response;
        
        // If rate limited, wait longer
        if (response.status === 429) {
          await new Promise(r => setTimeout(r, delay * 3));
          continue;
        }
      } catch (e) {
        if (i === retries - 1) return null;
        await new Promise(r => setTimeout(r, delay * (i + 1)));
      }
    }
    return null;
  };

  // Download a single book with robust error handling
  const downloadBook = useCallback(async (bookName: string): Promise<boolean> => {
    const allBooks = [...BIBLE_BOOKS.oldTestament, ...BIBLE_BOOKS.newTestament];
    const book = allBooks.find(b => b.name === bookName);
    if (!book) return false;

    cancelRef.current = false;
    const failedChapters: number[] = [];

    setDownloadProgress({
      book: bookName,
      current: 0,
      total: book.chapters,
      status: 'downloading',
      failedChapters: [],
    });

    let successCount = 0;

    for (let chapter = 1; chapter <= book.chapters; chapter++) {
      if (cancelRef.current) {
        setDownloadProgress(prev => prev ? { ...prev, status: 'paused' } : null);
        return false;
      }

      // Skip if already downloaded
      if (bibleStorage.isChapterAvailableOffline(bookName, chapter)) {
        successCount++;
        setDownloadProgress(prev => prev ? { ...prev, current: chapter } : null);
        continue;
      }

      const response = await fetchWithRetry(
        `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=kjv`
      );

      if (response) {
        try {
          const data = await response.json();
          const verses = data.verses?.map((v: any) => ({
            verse: v.verse,
            text: v.text,
          })) || [];

          if (verses.length > 0) {
            bibleStorage.saveChapterOffline(bookName, chapter, verses);
            successCount++;
          } else {
            failedChapters.push(chapter);
          }
        } catch {
          failedChapters.push(chapter);
        }
      } else {
        failedChapters.push(chapter);
      }

      setDownloadProgress(prev => prev ? { 
        ...prev, 
        current: chapter,
        failedChapters: [...failedChapters],
      } : null);
      
      // Increased delay to prevent rate limiting - 300ms instead of 150ms
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Retry failed chapters once more
    if (failedChapters.length > 0 && !cancelRef.current) {
      for (const chapter of failedChapters) {
        if (cancelRef.current) break;
        
        await new Promise(r => setTimeout(r, 500));
        
        const response = await fetchWithRetry(
          `https://bible-api.com/${encodeURIComponent(bookName)}+${chapter}?translation=kjv`,
          2,
          2000
        );

        if (response) {
          try {
            const data = await response.json();
            const verses = data.verses?.map((v: any) => ({
              verse: v.verse,
              text: v.text,
            })) || [];

            if (verses.length > 0) {
              bibleStorage.saveChapterOffline(bookName, chapter, verses);
              successCount++;
              // Remove from failed
              const idx = failedChapters.indexOf(chapter);
              if (idx > -1) failedChapters.splice(idx, 1);
            }
          } catch {}
        }
      }
    }

    const isComplete = successCount === book.chapters;
    setDownloadProgress(prev => prev ? { 
      ...prev, 
      status: isComplete ? 'completed' : 'error',
      failedChapters,
    } : null);

    return isComplete;
  }, [bibleStorage]);

  // Cache all devotionals
  const cacheDevotionals = useCallback(() => {
    bibleStorage.saveDevotionalsOffline(DEVOTIONALS_DATA);
  }, [bibleStorage]);

  // Cache sermon metadata
  const cacheSermons = useCallback(() => {
    const sermonsKey = 'ccc-sermons-offline';
    localStorage.setItem(sermonsKey, JSON.stringify({
      data: SERMONS_DATA,
      timestamp: Date.now(),
      version: '1.0.0',
    }));
  }, []);

  // Get cached sermons
  const getCachedSermons = useCallback(() => {
    const sermonsKey = 'ccc-sermons-offline';
    const data = localStorage.getItem(sermonsKey);
    if (data) {
      return JSON.parse(data).data || [];
    }
    return [];
  }, []);

  // Clear all offline data
  const clearAllOfflineData = useCallback(() => {
    const keysToRemove: string[] = [];
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('ccc-')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }, []);

  // Cancel current download
  const cancelDownload = useCallback(() => {
    cancelRef.current = true;
    setDownloadProgress(null);
  }, []);

  return {
    // Online status
    isOnline,
    
    // Download management
    downloadProgress,
    downloadBook,
    cancelDownload,
    
    // Book status
    isBookDownloaded,
    getBookProgress,
    
    // Devotionals
    cacheDevotionals,
    devotionals: bibleStorage.devotionals || DEVOTIONALS_DATA,
    
    // Sermons
    cacheSermons,
    getCachedSermons,
    
    // Stats
    stats,
    
    // Clear
    clearAllOfflineData,
    
    // Bible storage
    ...bibleStorage,
  };
};

export default useOfflineManager;
