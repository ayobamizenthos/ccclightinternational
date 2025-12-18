import { useState, memo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, Search, ChevronLeft, ChevronRight, Bookmark, Share2, 
  BookOpen, Calendar, Heart, Home, List, Play, Pause, User,
  ChevronDown, X, Check, Clock, Target, Trophy, Flame, Volume2,
  VolumeX, Settings, MoreHorizontal, Headphones, Star, Sparkles,
  Image, Bell, Mic, Type, Sunrise, Download, CloudOff, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { bibleStructure, oldTestamentBooks, newTestamentBooks, fetchVerses, searchBible, searchBibleStories } from '@/lib/bibleApi';
import { useBibleOfflineStorage } from '@/hooks/useOfflineStorage';
import useBibleSettings, { FontSize } from '@/hooks/useBibleSettings';
import BibleLoadingScreen from '@/components/BibleLoadingScreen';
import VerseImageGenerator from '@/components/VerseImageGenerator';
import BibleNotificationSettings from '@/components/BibleNotificationSettings';
import BibleVoiceSelector from '@/components/BibleVoiceSelector';
import BibleDevotionals from '@/components/BibleDevotionals';
import BiblePrayerJournal from '@/components/BiblePrayerJournal';
import ScriptureMemorization from '@/components/ScriptureMemorization';
import BibleStoryIcon from '@/components/BibleStoryIcon';
import AudioVisualizer from '@/components/LazyAudioVisualizer';
import BibleOfflineDownloads from '@/components/BibleOfflineDownloads';
import { useOfflineManager } from '@/hooks/useOfflineManager';
import imoleLogo from '@/assets/ccc-logo.png';

interface BibleVerse {
  verse: number;
  text: string;
}

// Expanded Bible Stories with Full Content
const bibleStoriesData = {
  oldTestament: [
    { 
      id: 1, 
      title: "Creation", 
      reference: "Genesis 1:1-31", 
      book: "Genesis",
      chapter: 1,
      description: "In the beginning, God created the heavens and the earth",
      image: "🌍",
      verses: "1-31"
    },
    { 
      id: 2, 
      title: "The Fall of Man", 
      reference: "Genesis 3:1-24", 
      book: "Genesis",
      chapter: 3,
      description: "Adam and Eve's disobedience in the Garden of Eden",
      image: "🍎",
      verses: "1-24"
    },
    { 
      id: 3, 
      title: "Noah's Ark", 
      reference: "Genesis 6:9-22", 
      book: "Genesis",
      chapter: 6,
      description: "God saves Noah and his family from the great flood",
      image: "🚢",
      verses: "9-22"
    },
    { 
      id: 4, 
      title: "Tower of Babel", 
      reference: "Genesis 11:1-9", 
      book: "Genesis",
      chapter: 11,
      description: "The confusion of languages among mankind",
      image: "🗼",
      verses: "1-9"
    },
    { 
      id: 5, 
      title: "Abraham's Call", 
      reference: "Genesis 12:1-9", 
      book: "Genesis",
      chapter: 12,
      description: "God calls Abraham to leave his homeland",
      image: "⭐",
      verses: "1-9"
    },
    { 
      id: 6, 
      title: "Abraham's Faith", 
      reference: "Genesis 22:1-19", 
      book: "Genesis",
      chapter: 22,
      description: "Abraham's ultimate test of faith with Isaac",
      image: "🐑",
      verses: "1-19"
    },
    { 
      id: 7, 
      title: "Joseph's Dreams", 
      reference: "Genesis 37:1-11", 
      book: "Genesis",
      chapter: 37,
      description: "Joseph's prophetic dreams anger his brothers",
      image: "💫",
      verses: "1-11"
    },
    { 
      id: 8, 
      title: "Moses & the Burning Bush", 
      reference: "Exodus 3:1-15", 
      book: "Exodus",
      chapter: 3,
      description: "God calls Moses from a burning bush",
      image: "🔥",
      verses: "1-15"
    },
    { 
      id: 9, 
      title: "Parting of the Red Sea", 
      reference: "Exodus 14:21-31", 
      book: "Exodus",
      chapter: 14,
      description: "God parts the sea for Israel's escape",
      image: "🌊",
      verses: "21-31"
    },
    { 
      id: 10, 
      title: "Ten Commandments", 
      reference: "Exodus 20:1-17", 
      book: "Exodus",
      chapter: 20,
      description: "God gives His laws to Moses on Mount Sinai",
      image: "📜",
      verses: "1-17"
    },
    { 
      id: 11, 
      title: "David & Goliath", 
      reference: "1 Samuel 17:41-51", 
      book: "1 Samuel",
      chapter: 17,
      description: "A young shepherd defeats a giant",
      image: "⚔️",
      verses: "41-51"
    },
    { 
      id: 12, 
      title: "Daniel in the Lions' Den", 
      reference: "Daniel 6:16-23", 
      book: "Daniel",
      chapter: 6,
      description: "God protects Daniel from the hungry lions",
      image: "🦁",
      verses: "16-23"
    },
    { 
      id: 13, 
      title: "Jonah & the Whale", 
      reference: "Jonah 1:17-2:10", 
      book: "Jonah",
      chapter: 2,
      description: "A prophet learns obedience inside a great fish",
      image: "🐋",
      verses: "1-10"
    },
    { 
      id: 14, 
      title: "Ruth's Loyalty", 
      reference: "Ruth 1:16-22", 
      book: "Ruth",
      chapter: 1,
      description: "Ruth's unwavering faithfulness to Naomi",
      image: "💕",
      verses: "16-22"
    },
    { 
      id: 15, 
      title: "Elijah & the Prophets of Baal", 
      reference: "1 Kings 18:30-39", 
      book: "1 Kings",
      chapter: 18,
      description: "God answers Elijah with fire from heaven",
      image: "⚡",
      verses: "30-39"
    },
  ],
  newTestament: [
    { 
      id: 16, 
      title: "Birth of Jesus", 
      reference: "Luke 2:1-20", 
      book: "Luke",
      chapter: 2,
      description: "The Savior is born in Bethlehem",
      image: "⭐",
      verses: "1-20"
    },
    { 
      id: 17, 
      title: "Baptism of Jesus", 
      reference: "Matthew 3:13-17", 
      book: "Matthew",
      chapter: 3,
      description: "John baptizes Jesus in the Jordan River",
      image: "🕊️",
      verses: "13-17"
    },
    { 
      id: 18, 
      title: "The Beatitudes", 
      reference: "Matthew 5:1-12", 
      book: "Matthew",
      chapter: 5,
      description: "Jesus teaches the path to true blessing",
      image: "⛰️",
      verses: "1-12"
    },
    { 
      id: 19, 
      title: "Feeding the 5000", 
      reference: "John 6:5-14", 
      book: "John",
      chapter: 6,
      description: "Jesus multiplies five loaves and two fish",
      image: "🍞",
      verses: "5-14"
    },
    { 
      id: 20, 
      title: "The Good Samaritan", 
      reference: "Luke 10:25-37", 
      book: "Luke",
      chapter: 10,
      description: "A parable about loving your neighbor",
      image: "❤️",
      verses: "25-37"
    },
    { 
      id: 21, 
      title: "The Prodigal Son", 
      reference: "Luke 15:11-32", 
      book: "Luke",
      chapter: 15,
      description: "A father's unconditional love for his lost son",
      image: "🏠",
      verses: "11-32"
    },
    { 
      id: 22, 
      title: "Jesus Calms the Storm", 
      reference: "Mark 4:35-41", 
      book: "Mark",
      chapter: 4,
      description: "Jesus demonstrates power over nature",
      image: "⛵",
      verses: "35-41"
    },
    { 
      id: 23, 
      title: "Raising Lazarus", 
      reference: "John 11:38-44", 
      book: "John",
      chapter: 11,
      description: "Jesus raises Lazarus from the dead",
      image: "🙌",
      verses: "38-44"
    },
    { 
      id: 24, 
      title: "The Last Supper", 
      reference: "Matthew 26:17-30", 
      book: "Matthew",
      chapter: 26,
      description: "Jesus shares His final meal with the disciples",
      image: "🍷",
      verses: "17-30"
    },
    { 
      id: 25, 
      title: "Jesus in Gethsemane", 
      reference: "Matthew 26:36-46", 
      book: "Matthew",
      chapter: 26,
      description: "Jesus prays before His arrest",
      image: "🌙",
      verses: "36-46"
    },
    { 
      id: 26, 
      title: "The Crucifixion", 
      reference: "John 19:16-30", 
      book: "John",
      chapter: 19,
      description: "Jesus dies for the sins of the world",
      image: "✝️",
      verses: "16-30"
    },
    { 
      id: 27, 
      title: "The Resurrection", 
      reference: "Matthew 28:1-10", 
      book: "Matthew",
      chapter: 28,
      description: "Jesus rises from the dead - He is alive!",
      image: "🌅",
      verses: "1-10"
    },
    { 
      id: 28, 
      title: "The Great Commission", 
      reference: "Matthew 28:16-20", 
      book: "Matthew",
      chapter: 28,
      description: "Jesus commands His followers to make disciples",
      image: "🌍",
      verses: "16-20"
    },
    { 
      id: 29, 
      title: "Pentecost", 
      reference: "Acts 2:1-13", 
      book: "Acts",
      chapter: 2,
      description: "The Holy Spirit descends upon the believers",
      image: "🔥",
      verses: "1-13"
    },
    { 
      id: 30, 
      title: "Paul's Conversion", 
      reference: "Acts 9:1-19", 
      book: "Acts",
      chapter: 9,
      description: "Saul encounters Jesus on the road to Damascus",
      image: "💡",
      verses: "1-19"
    },
  ],
};

// Reading Plans Data
const readingPlansData = [
  {
    id: 'bible-in-year',
    title: 'Bible in a Year',
    duration: '365 days',
    description: 'Read through the entire Bible in one year with daily Old and New Testament passages.',
    totalDays: 365,
    icon: Calendar,
    color: '#2563eb',
    category: 'Yearly',
  },
  {
    id: 'gospels-30',
    title: 'Life of Jesus',
    duration: '30 days',
    description: 'Experience the life, teachings, death, and resurrection of Jesus through the Gospels.',
    totalDays: 30,
    icon: Heart,
    color: '#dc2626',
    category: 'Popular',
  },
  {
    id: 'psalms-31',
    title: 'Psalms Journey',
    duration: '31 days',
    description: 'A month of worship, praise, and reflection through the beautiful Psalms.',
    totalDays: 31,
    icon: BookOpen,
    color: '#7c3aed',
    category: 'Devotional',
  },
  {
    id: 'proverbs-31',
    title: 'Wisdom of Proverbs',
    duration: '31 days',
    description: 'Gain practical wisdom for daily living from the book of Proverbs.',
    totalDays: 31,
    icon: Target,
    color: '#059669',
    category: 'Wisdom',
  },
  {
    id: 'new-believer',
    title: 'New Believer',
    duration: '14 days',
    description: 'Essential scriptures and foundational truths for those new to faith.',
    totalDays: 14,
    icon: Sparkles,
    color: '#f59e0b',
    category: 'Beginners',
  },
  {
    id: 'peace-anxiety',
    title: 'Finding Peace',
    duration: '7 days',
    description: "Find peace in God's promises during times of worry and anxiety.",
    totalDays: 7,
    icon: Heart,
    color: '#06b6d4',
    category: 'Topical',
  },
];

// Daily Verse
const dailyVerseData = {
  reference: "Jeremiah 29:11",
  text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
};

const Bible = memo(() => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [isBookMenuOpen, setIsBookMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookSearchQuery, setBookSearchQuery] = useState(''); // Separate state for book modal search
  const [searchResults, setSearchResults] = useState<{ reference: string; text: string; book?: string; chapter?: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [highlightedVerses, setHighlightedVerses] = useState<Set<string>>(new Set());
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<string>>(new Set());
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [readingStreak, setReadingStreak] = useState(7);
  const [activeTab, setActiveTab] = useState<'today' | 'bible' | 'stories' | 'plans' | 'saved'>('today');
  const [isVoiceSelectorOpen, setIsVoiceSelectorOpen] = useState(false);
  const [storiesFilter, setStoriesFilter] = useState<'all' | 'old' | 'new'>('all');
  const [activePlans, setActivePlans] = useState<Record<string, { day: number; startDate: string }>>({});
  const [selectedStory, setSelectedStory] = useState<typeof bibleStoriesData.oldTestament[0] | null>(null);
  const [storyVerses, setStoryVerses] = useState<BibleVerse[]>([]);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentAudioVerse, setCurrentAudioVerse] = useState<number | null>(null);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [selectedVerseForImage, setSelectedVerseForImage] = useState<{ text: string; reference: string } | null>(null);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isFontSettingsOpen, setIsFontSettingsOpen] = useState(false);
  const [navHistory, setNavHistory] = useState<Array<{ tab: string; book?: string; chapter?: number; storyId?: number }>>([{ tab: 'today' }]);
  const [isOfflineDownloadsOpen, setIsOfflineDownloadsOpen] = useState(false);
  const [isVersionSelectorOpen, setIsVersionSelectorOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<'en' | 'yo' | 'fr'>('en');
  const speechSynthesis = useRef<SpeechSynthesisUtterance | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { settings, setFontSize, updateLastRead, getFontSizeClass, getLineHeight } = useBibleSettings();
  
  const { saveChapterOffline } = useBibleOfflineStorage();
  const { isOnline, cacheDevotionals, cacheSermons, stats, isBookDownloaded } = useOfflineManager();
  const allBooks = [...oldTestamentBooks, ...newTestamentBooks];

  // Auto-cache devotionals and sermons on mount (only once)
  useEffect(() => {
    const cached = localStorage.getItem('ccc-devotionals-cached');
    if (!cached) {
      cacheDevotionals();
      cacheSermons();
      localStorage.setItem('ccc-devotionals-cached', 'true');
    }
  }, [cacheDevotionals, cacheSermons]); // Run once on mount; include stable hooks

  // Handle back navigation within Bible - stays within Bible unless at root
  const handleBackNavigation = useCallback(() => {
    // If viewing a story, go back to stories list
    if (selectedStory) {
      setSelectedStory(null);
      setStoryVerses([]);
      return;
    }
    
    // If reading a book, go back to book selection
    if (selectedBook && activeTab === 'bible') {
      setSelectedBook(null);
      return;
    }
    
    // If on any tab other than today, go back to today
    if (activeTab !== 'today') {
      setActiveTab('today');
      return;
    }
    
    // Only exit Bible when at the root (today tab, no book selected, no story)
    navigate('/');
  }, [selectedStory, selectedBook, activeTab, navigate]);

  // Load saved data
  useEffect(() => {
    const savedHighlights = localStorage.getItem('bible_highlights');
    const savedBookmarks = localStorage.getItem('bible_bookmarks');
    const savedStreak = localStorage.getItem('bible_streak');
    const savedPlans = localStorage.getItem('bible_active_plans');
    
    if (savedHighlights) setHighlightedVerses(new Set(JSON.parse(savedHighlights)));
    if (savedBookmarks) setBookmarkedVerses(new Set(JSON.parse(savedBookmarks)));
    if (savedStreak) setReadingStreak(parseInt(savedStreak));
    if (savedPlans) setActivePlans(JSON.parse(savedPlans));
  }, []);

  // Load best available voice for natural speech
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Priority list for natural, dramatic voices
      const preferredVoices = [
        'Google UK English Male',
        'Google UK English Female', 
        'Microsoft David',
        'Microsoft Mark',
        'Microsoft Zira',
        'Daniel',
        'Samantha',
        'Karen',
        'Alex',
        'Google US English',
        'en-GB',
        'en-US'
      ];
      
      let bestVoice = null;
      
      // Find the best available voice
      for (const preferred of preferredVoices) {
        const found = voices.find(v => 
          v.name.includes(preferred) || 
          v.lang.includes(preferred)
        );
        if (found) {
          bestVoice = found;
          break;
        }
      }
      
      // Fallback to first English voice
      if (!bestVoice) {
        bestVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      }
      
      if (bestVoice) {
        setPreferredVoice(bestVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('bible_highlights', JSON.stringify([...highlightedVerses]));
    localStorage.setItem('bible_bookmarks', JSON.stringify([...bookmarkedVerses]));
    localStorage.setItem('bible_streak', readingStreak.toString());
    localStorage.setItem('bible_active_plans', JSON.stringify(activePlans));
  }, [highlightedVerses, bookmarkedVerses, readingStreak, activePlans]);

  // Fetch verses when book/chapter changes - no dependency on updateLastRead
  useEffect(() => {
    if (selectedBook) {
      setIsLoadingVerses(true);
      fetchVerses(selectedBook, selectedChapter)
        .then((fetchedVerses) => {
          setVerses(fetchedVerses);
          // Track last read position using direct localStorage
          const current = JSON.parse(localStorage.getItem('bible_settings') || '{}');
          localStorage.setItem('bible_settings', JSON.stringify({
            ...current,
            lastReadBook: selectedBook,
            lastReadChapter: selectedChapter,
            lastReadTimestamp: Date.now(),
          }));
        })
        .finally(() => setIsLoadingVerses(false));
    }
  }, [selectedBook, selectedChapter]);

  // Preprocess text for natural TTS pronunciation
  const preprocessTextForTTS = useCallback((text: string): string => {
    return text
      // Fix "LORD" being spelled out letter by letter - convert to "Lord"
      .replace(/\bLORD\b/g, 'Lord')
      .replace(/\bGOD\b/g, 'God')
      // Fix other common biblical words that might be spelled out
      .replace(/\bJESUS\b/g, 'Jesus')
      .replace(/\bCHRIST\b/g, 'Christ')
      // Add slight pauses for better phrasing
      .replace(/;/g, '; ')
      .replace(/:/g, ': ')
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // Enhanced Audio TTS with natural voice
  const speakVerse = useCallback((verseText: string, verseNum: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // Preprocess text for natural pronunciation
      const processedText = preprocessTextForTTS(verseText);
      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // Use preferred voice for more natural sound
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Settings for dramatic, natural reading - optimized for scripture
      utterance.rate = 0.88; // Slightly slower for reverent reading
      utterance.pitch = 1.0; // Natural pitch
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsAudioPlaying(true);
        setCurrentAudioVerse(verseNum);
      };
      
      utterance.onend = () => {
        setIsAudioPlaying(false);
        setCurrentAudioVerse(null);
      };
      
      utterance.onerror = () => {
        setIsAudioPlaying(false);
        setCurrentAudioVerse(null);
        toast.error('Audio playback failed');
      };
      
      speechSynthesis.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error('Audio not supported on this device');
    }
  }, [preferredVoice, preprocessTextForTTS]);

  const stopAudio = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsAudioPlaying(false);
    setCurrentAudioVerse(null);
  }, []);

  const playAllVerses = useCallback(() => {
    if (verses.length === 0) return;
    
    const allText = verses.map(v => `Verse ${v.verse}. ${v.text}`).join(' ... ');
    speakVerse(allText, 0);
  }, [verses, speakVerse]);

  // Enhanced search functionality - searches all Bible content
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Search through all Bible verses, books, and stories
      const verseResults = await searchBible(searchQuery);
      
      // Also search through stories
      const allStories = [...bibleStoriesData.oldTestament, ...bibleStoriesData.newTestament];
      const storyResults = searchBibleStories(searchQuery, allStories);
      
      // Convert story results to the same format
      const storyAsSearchResults = storyResults.map(story => ({
        reference: `${story.title} — ${story.reference}`,
        text: story.description,
        book: story.book,
        chapter: story.chapter,
        isStory: true as const
      }));
      
      // Combine results, verses first then stories
      const combinedResults = [...verseResults, ...storyAsSearchResults];
      setSearchResults(combinedResults);
      
      if (combinedResults.length === 0) {
        toast.info('No results found. Try a different search term.');
      }
    } catch (error) {
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Navigate to search result
  const navigateToSearchResult = useCallback((result: { reference: string; text: string; book?: string; chapter?: number }) => {
    if (result.book && result.chapter) {
      setSelectedBook(result.book);
      setSelectedChapter(result.chapter);
      setActiveTab('bible');
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      toast.success(`Opening ${result.book} ${result.chapter}`);
    }
  }, []);

  // Story selection
  const handleStorySelect = useCallback(async (story: typeof bibleStoriesData.oldTestament[0]) => {
    setSelectedStory(story);
    setIsLoadingStory(true);
    
    try {
      const verses = await fetchVerses(story.book, story.chapter);
      setStoryVerses(verses);
    } catch (error) {
      toast.error('Failed to load story');
    } finally {
      setIsLoadingStory(false);
    }
  }, []);

  const handleBookSelect = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setIsBookMenuOpen(false);
    setBookSearchQuery(''); // Clear book search
    setActiveTab('bible'); // Auto-switch to Bible tab
  };

  const handleVerseHighlight = (verseNum: number) => {
    const verseKey = `${selectedBook}-${selectedChapter}-${verseNum}`;
    setHighlightedVerses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(verseKey)) {
        newSet.delete(verseKey);
        toast.success('Highlight removed');
      } else {
        newSet.add(verseKey);
        toast.success('Verse highlighted');
      }
      return newSet;
    });
  };

  const handleBookmark = (verseNum: number) => {
    const verseKey = `${selectedBook}-${selectedChapter}-${verseNum}`;
    setBookmarkedVerses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(verseKey)) {
        newSet.delete(verseKey);
        toast.success('Bookmark removed');
      } else {
        newSet.add(verseKey);
        toast.success('Verse bookmarked');
      }
      return newSet;
    });
  };

  const handleShare = (verseNum: number, verseText: string) => {
    const shareText = `"${verseText}" — ${selectedBook} ${selectedChapter}:${verseNum} (KJV)`;
    if (navigator.share) {
      navigator.share({ title: 'Bible Verse', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Copied to clipboard');
    }
  };

  const openImageGenerator = (verseNum: number, verseText: string) => {
    setSelectedVerseForImage({
      text: verseText,
      reference: `${selectedBook} ${selectedChapter}:${verseNum}`,
    });
    setIsImageGeneratorOpen(true);
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    if (!selectedBook) return;
    const maxChapter = bibleStructure[selectedBook as keyof typeof bibleStructure];
    if (direction === 'prev' && selectedChapter > 1) {
      setSelectedChapter(prev => prev - 1);
    } else if (direction === 'next' && selectedChapter < maxChapter) {
      setSelectedChapter(prev => prev + 1);
    }
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startPlan = (planId: string) => {
    setActivePlans(prev => ({
      ...prev,
      [planId]: { day: 1, startDate: new Date().toISOString() }
    }));
    toast.success('Plan started! 🎉');
  };

  const getChapterCount = (book: string) => bibleStructure[book as keyof typeof bibleStructure] || 1;

  const getFilteredStories = () => {
    if (storiesFilter === 'old') return bibleStoriesData.oldTestament;
    if (storiesFilter === 'new') return bibleStoriesData.newTestament;
    return [...bibleStoriesData.oldTestament, ...bibleStoriesData.newTestament];
  };

  if (isLoading) {
    return <BibleLoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  const versionLabels = {
    en: { name: 'English', short: 'KJV' },
    yo: { name: 'Yorùbá', short: 'YOR' },
    fr: { name: 'Français', short: 'FRE' },
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      {/* Premium Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF9]/95 backdrop-blur-xl border-b border-stone-100">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left - Church Logo (clickable to home) - BIGGER */}
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center"
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={imoleLogo} 
              alt="CCC Light" 
              className="w-11 h-11 object-contain"
            loading="lazy" decoding="async"/>
          </motion.button>
          
          {/* Center - Version Selector */}
          <motion.button 
            onClick={() => setIsVersionSelectorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 active:bg-stone-200"
            whileTap={{ scale: 0.97 }}
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-xs font-semibold text-stone-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {versionLabels[selectedVersion].short}
            </span>
            <ChevronDown className="w-3 h-3 text-stone-400" />
          </motion.button>
          
          {/* Right Actions */}
          <div className="flex items-center gap-0.5">
            <motion.button
              onClick={() => setIsOfflineDownloadsOpen(true)}
              className="p-2.5 rounded-xl active:bg-stone-100 relative"
              whileTap={{ scale: 0.94 }}
            >
              <Download className="w-[18px] h-[18px] text-stone-500" />
              {stats.chaptersDownloaded > 0 && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              )}
            </motion.button>
            
            <motion.button
              onClick={() => setIsFontSettingsOpen(true)}
              className="p-2.5 rounded-xl active:bg-stone-100"
              whileTap={{ scale: 0.94 }}
            >
              <Type className="w-[18px] h-[18px] text-stone-500" />
            </motion.button>
            
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl bg-stone-100 active:bg-stone-200"
              whileTap={{ scale: 0.94 }}
            >
              <Search className="w-[18px] h-[18px] text-stone-600" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Version Selector Modal */}
      <AnimatePresence>
        {isVersionSelectorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsVersionSelectorOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[280px] rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #FDFCFA 0%, #FAF8F5 100%)',
                border: '1px solid rgba(180,140,80,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              }}
            >
              <div className="px-4 py-3 border-b border-amber-100/50">
                <p className="text-sm font-bold text-amber-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Select Bible Version
                </p>
              </div>
              <div className="p-2">
                {(['en', 'yo', 'fr'] as const).map((version) => (
                  <motion.button
                    key={version}
                    onClick={() => {
                      setSelectedVersion(version);
                      setIsVersionSelectorOpen(false);
                      toast.success(`Switched to ${versionLabels[version].name}`);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl mb-1 ${
                      selectedVersion === version ? 'bg-amber-100/60' : 'hover:bg-amber-50/50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: selectedVersion === version 
                            ? 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)'
                            : 'rgba(180,140,80,0.1)',
                        }}
                      >
                        <span className={`text-[10px] font-bold ${
                          selectedVersion === version ? 'text-white' : 'text-amber-800'
                        }`}>
                          {versionLabels[version].short}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{versionLabels[version].name}</p>
                        <p className="text-[10px] text-gray-500">
                          {version === 'en' && 'King James Version'}
                          {version === 'yo' && 'Bíbélì Mímọ́'}
                          {version === 'fr' && 'Louis Segond'}
                        </p>
                      </div>
                    </div>
                    {selectedVersion === version && (
                      <Check className="w-4 h-4 text-amber-700" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-14 pb-20 min-h-screen" ref={contentRef}>
        {/* TODAY TAB */}
        {activeTab === 'today' && (
          <div className="px-4 py-5">
            {/* Premium Greeting */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-semibold text-stone-800 mb-0.5" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'}
              </h1>
              <p className="text-sm text-stone-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>

            {/* Continue Reading - Premium Card */}
            {settings.lastReadBook && settings.lastReadChapter && (
              <motion.button
                onClick={() => {
                  setSelectedBook(settings.lastReadBook!);
                  setSelectedChapter(settings.lastReadChapter!);
                  setActiveTab('bible');
                }}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(56,189,248,0.04) 100%)',
                  border: '1px solid rgba(14,165,233,0.1)',
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] text-sky-600 font-semibold uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>Continue Reading</p>
                  <p className="text-base font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{settings.lastReadBook} {settings.lastReadChapter}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-sky-400" />
              </motion.button>
            )}

            {/* Streak Banner - Premium */}
            <motion.div
              className="flex items-center gap-3 p-3.5 rounded-2xl mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(251,191,36,0.04) 100%)',
                border: '1px solid rgba(245,158,11,0.1)',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif' }}>Current Streak</p>
                <p className="text-xl font-bold text-stone-800" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{readingStreak} Days</p>
              </div>
            </motion.div>

            {/* Verse of the Day - Premium Dark Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl p-4 mb-4"
              style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-wider mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Verse of the Day
              </p>
              <p className="text-base text-white/95 leading-relaxed mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                "{dailyVerseData.text}"
              </p>
              <p className="text-xs text-white/50 font-medium mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                — {dailyVerseData.reference}
              </p>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => speakVerse(dailyVerseData.text, 0)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  <Headphones className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-[10px] text-white/70 font-medium">Listen</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedVerseForImage({
                      text: dailyVerseData.text,
                      reference: dailyVerseData.reference,
                    });
                    setIsImageGeneratorOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-[10px] text-white/70 font-medium">Share</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Actions - Compact Mobile Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <motion.button
                onClick={() => setActiveTab('bible')}
                className="p-3 rounded-xl text-left bg-white border border-stone-100"
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-9 h-9 bg-stone-900 rounded-lg flex items-center justify-center mb-2">
                  <Book className="w-4 h-4 text-white" />
                </div>
                <p className="font-semibold text-stone-800 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Read Bible</p>
                <p className="text-[10px] text-stone-400">66 books</p>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('stories')}
                className="p-3 rounded-xl text-left bg-white border border-stone-100"
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center mb-2">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <p className="font-semibold text-stone-800 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Bible Stories</p>
                <p className="text-[10px] text-stone-400">30 stories</p>
              </motion.button>
            </div>

            {/* Active Plans */}
            {Object.keys(activePlans).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-lg font-bold text-gray-900 mb-3">Continue Reading</h2>
                <div className="space-y-3">
                  {Object.entries(activePlans).slice(0, 2).map(([planId, progress]) => {
                    const plan = readingPlansData.find(p => p.id === planId);
                    if (!plan) return null;
                    const progressPercent = Math.round((progress.day / plan.totalDays) * 100);
                    
                    return (
                      <motion.button
                        key={planId}
                        onClick={() => setActiveTab('plans')}
                        className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}15` }}
                        >
                          <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-900">{plan.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ width: `${progressPercent}%`, backgroundColor: plan.color }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{progressPercent}%</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Featured Story */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3">Featured Story</h2>
              <motion.button
                onClick={() => {
                  handleStorySelect(bibleStoriesData.newTestament[11]); // Resurrection
                  setActiveTab('stories');
                }}
                className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-left"
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute top-4 right-4 opacity-30">
                  <Sunrise className="w-14 h-14 text-white" />
                </div>
                <span className="text-xs font-semibold text-purple-200 uppercase tracking-widest">
                  New Testament
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-1">The Resurrection</h3>
                <p className="text-sm text-purple-100">Matthew 28:1-10</p>
                <div className="flex items-center gap-2 mt-4">
                  <Play className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">Read Now</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* BIBLE TAB */}
        {activeTab === 'bible' && (
          <div className="px-5 py-4">
            {/* Book Selector */}
            <motion.button
              onClick={() => setIsBookMenuOpen(true)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-4"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {selectedBook ? `${selectedBook} ${selectedChapter}` : 'Select a Book'}
                  </p>
                  {selectedBook && (
                    <p className="text-xs text-gray-500">
                      Chapter {selectedChapter} of {getChapterCount(selectedBook)}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.button>

            {/* Reading Content */}
            {selectedBook ? (
              <div>
                {/* Chapter Selector - All Chapters with Horizontal Scroll */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                  {Array.from({ length: getChapterCount(selectedBook) }, (_, i) => i + 1).map(ch => (
                    <motion.button
                      key={ch}
                      onClick={() => setSelectedChapter(ch)}
                      className={`w-9 h-9 rounded-full text-sm font-medium flex-shrink-0 min-w-[36px] ${
                        selectedChapter === ch 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {ch}
                    </motion.button>
                  ))}
                </div>

                {/* Verses */}
                {isLoadingVerses ? (
                  <div className="flex items-center justify-center py-20">
                    <motion.div
                      className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                ) : (
                  <div className="space-y-1">
                    {verses.map((verseData) => {
                      const verseKey = `${selectedBook}-${selectedChapter}-${verseData.verse}`;
                      const isHighlighted = highlightedVerses.has(verseKey);
                      const isBookmarked = bookmarkedVerses.has(verseKey);
                      const isPlaying = currentAudioVerse === verseData.verse;

                      return (
                        <motion.div
                          key={`${selectedBook}-${selectedChapter}-${verseData.verse}`}
                          className={`group relative py-3 px-4 -mx-4 rounded-xl transition-all duration-200 ${
                            isHighlighted ? 'bg-amber-50/80' : 'hover:bg-amber-50/30'
                          } ${isPlaying ? 'bg-sky-50/60' : ''}`}
                          whileTap={{ scale: 0.995 }}
                        >
                          <div className="flex gap-3">
                            <span className={`text-[11px] font-bold w-6 pt-1.5 flex-shrink-0 ${
                              isPlaying ? 'text-sky-500' : 'text-amber-700/50'
                            }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {verseData.verse}
                            </span>
                            <p 
                              className={`flex-1 text-stone-800 ${isPlaying ? 'text-sky-700' : ''}`}
                              style={{ 
                                fontFamily: '"Playfair Display", Georgia, serif',
                                fontSize: getFontSizeClass(),
                                lineHeight: getLineHeight(),
                                letterSpacing: '-0.01em',
                              }}
                            >
                              {verseData.text}
                            </p>
                          </div>

                          {/* Premium Action Bar */}
                          <div className="flex items-center gap-0.5 mt-3 ml-9 opacity-60 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              onClick={() => speakVerse(verseData.text, verseData.verse)}
                              className="p-2 rounded-lg hover:bg-amber-100/60 active:bg-amber-100"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Volume2 className="w-4 h-4 text-amber-700/70" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleVerseHighlight(verseData.verse)}
                              className={`p-2 rounded-lg ${isHighlighted ? 'bg-amber-100' : 'hover:bg-amber-100/60'}`}
                              whileTap={{ scale: 0.9 }}
                            >
                              <div className={`w-4 h-4 rounded-full ${isHighlighted ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-amber-200'}`} />
                            </motion.button>
                            <motion.button
                              onClick={() => handleBookmark(verseData.verse)}
                              className={`p-2 rounded-lg ${isBookmarked ? 'bg-sky-100' : 'hover:bg-amber-100/60'}`}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-sky-600 fill-current' : 'text-amber-700/60'}`} />
                            </motion.button>
                            <motion.button
                              onClick={() => handleShare(verseData.verse, verseData.text)}
                              className="p-2 rounded-lg hover:bg-amber-100/60"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 className="w-4 h-4 text-amber-700/60" />
                            </motion.button>
                            <motion.button
                              onClick={() => openImageGenerator(verseData.verse, verseData.text)}
                              className="p-2 rounded-lg hover:bg-amber-100/60"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Image className="w-4 h-4 text-amber-700/60" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Chapter Navigation */}
                <div className="flex items-center justify-between py-8 mt-6 border-t border-gray-100">
                  <motion.button
                    onClick={() => navigateChapter('prev')}
                    disabled={selectedChapter === 1}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 disabled:opacity-30"
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Previous</span>
                  </motion.button>
                  <motion.button
                    onClick={() => navigateChapter('next')}
                    disabled={selectedChapter === getChapterCount(selectedBook)}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-900 text-white disabled:opacity-30"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm font-medium">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Book</h3>
                <p className="text-sm text-gray-500 mb-6">Choose from 66 books of the Bible</p>
                <motion.button
                  onClick={() => setIsBookMenuOpen(true)}
                  className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold"
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Books
                </motion.button>
              </div>
            )}
          </div>
        )}

        {/* STORIES TAB */}
        {activeTab === 'stories' && !selectedStory && (
          <div className="px-5 py-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Bible Stories
            </h1>
            <p className="text-gray-500 text-sm mb-6">Explore the greatest stories ever told</p>
            
            {/* Filter Pills */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'all', label: 'All', count: 30 },
                { id: 'old', label: 'Old Testament', count: 15 },
                { id: 'new', label: 'New Testament', count: 15 },
              ].map((filter: { id: 'all' | 'old' | 'new'; label: string; count: number }) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setStoriesFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    storiesFilter === filter.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>

            {/* Stories Grid */}
            <div className="space-y-3">
              {getFilteredStories().map((story, index) => (
                <motion.button
                  key={story.id}
                  onClick={() => handleStorySelect(story)}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BibleStoryIcon storyId={story.id} size="md" className="flex-shrink-0 shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{story.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{story.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{story.reference}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* STORY DETAIL VIEW */}
        {activeTab === 'stories' && selectedStory && (
          <div className="px-5 py-4">
            {/* Back Button */}
            <motion.button
              onClick={() => {
                setSelectedStory(null);
                setStoryVerses([]);
              }}
              className="flex items-center gap-2 text-gray-600 mb-6"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">All Stories</span>
            </motion.button>

            {/* Story Header */}
            <div className="text-center mb-8">
              <BibleStoryIcon storyId={selectedStory.id} size="lg" className="mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {selectedStory.title}
              </h1>
              <p className="text-gray-500">{selectedStory.reference}</p>
              
              {/* Audio Button */}
              <motion.button
                onClick={() => {
                  const allText = storyVerses.map(v => v.text).join(' ');
                  speakVerse(allText, 0);
                }}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full"
                whileTap={{ scale: 0.95 }}
              >
                <Headphones className="w-5 h-5" />
                <span className="font-medium">Listen to Story</span>
              </motion.button>
            </div>

            {/* Story Verses */}
            {isLoadingStory ? (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6">
                {storyVerses.map((verse, index) => (
                  <motion.p
                    key={verse.verse}
                    className="text-gray-800 mb-4"
                    style={{ 
                      fontFamily: 'Georgia, "Times New Roman", serif', 
                      fontSize: getFontSizeClass(),
                      lineHeight: getLineHeight()
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-xs text-gray-400 font-bold mr-2">{verse.verse}</span>
                    {verse.text}
                  </motion.p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PLANS TAB */}
        {activeTab === 'plans' && (
          <div className="px-5 py-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Reading Plans
            </h1>
            <p className="text-gray-500 text-sm mb-6">Build a daily habit with guided reading</p>

            {/* Active Plans */}
            {Object.keys(activePlans).length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Your Plans
                </h2>
                <div className="space-y-3">
                  {Object.entries(activePlans).map(([planId, progress]) => {
                    const plan = readingPlansData.find(p => p.id === planId);
                    if (!plan) return null;
                    const progressPercent = Math.round((progress.day / plan.totalDays) * 100);
                    
                    return (
                      <motion.div
                        key={planId}
                        className="p-5 bg-gray-50 rounded-2xl"
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: `${plan.color}15` }}
                          >
                            <plan.icon className="w-7 h-7" style={{ color: plan.color }} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                            <p className="text-sm text-gray-500">Day {progress.day} of {plan.totalDays}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold" style={{ color: plan.color }}>{progressPercent}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: plan.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                        
                        <motion.button
                          onClick={() => {
                            setActivePlans(prev => ({
                              ...prev,
                              [planId]: { ...prev[planId], day: Math.min(prev[planId].day + 1, plan.totalDays) }
                            }));
                            toast.success('Progress saved!');
                          }}
                          className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                          style={{ backgroundColor: plan.color }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue Day {progress.day}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Plans */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Discover Plans
              </h2>
              <div className="space-y-3">
                {readingPlansData.filter(p => !activePlans[p.id]).map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    className="p-5 bg-gray-50 rounded-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${plan.color}15` }}
                      >
                        <plan.icon className="w-7 h-7" style={{ color: plan.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                          <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                            {plan.duration}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                        <motion.button
                          onClick={() => startPlan(plan.id)}
                          className="w-full py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white"
                          whileTap={{ scale: 0.98 }}
                        >
                          Start Plan
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SAVED TAB - Combined Bookmarks & Highlights */}
        {activeTab === 'saved' && (
          <div className="px-5 py-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Saved
            </h1>
            <p className="text-gray-500 text-sm mb-6">Your bookmarks and highlights</p>

            {/* Bookmarks */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Bookmarks ({bookmarkedVerses.size})
              </h2>
              {bookmarkedVerses.size > 0 ? (
                <div className="space-y-2">
                  {[...bookmarkedVerses].slice(0, 10).map((key) => {
                    const [book, chapter, verse] = key.split('-');
                    return (
                      <motion.button
                        key={key}
                        onClick={() => {
                          setSelectedBook(book);
                          setSelectedChapter(parseInt(chapter));
                          setActiveTab('bible');
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-left"
                        whileTap={{ scale: 0.98 }}
                      >
                        <Bookmark className="w-5 h-5 text-blue-500 fill-current" />
                        <span className="font-medium text-gray-900">{book} {chapter}:{verse}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm p-4 bg-gray-50 rounded-xl text-center">No bookmarks yet</p>
              )}
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-400" />
                Highlights ({highlightedVerses.size})
              </h2>
              {highlightedVerses.size > 0 ? (
                <div className="space-y-2">
                  {[...highlightedVerses].slice(0, 10).map((key) => {
                    const [book, chapter, verse] = key.split('-');
                    return (
                      <motion.button
                        key={key}
                        onClick={() => {
                          setSelectedBook(book);
                          setSelectedChapter(parseInt(chapter));
                          setActiveTab('bible');
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-yellow-50 rounded-xl text-left"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-5 h-5 rounded bg-yellow-400" />
                        <span className="font-medium text-gray-900">{book} {chapter}:{verse}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm p-4 bg-gray-50 rounded-xl text-center">No highlights yet</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Removed duplicate bottom navigation - single Bible nav below */}

      {/* Book Selection Modal */}
      <AnimatePresence>
        {isBookMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Select Book</h2>
                <motion.button
                  onClick={() => {
                    setIsBookMenuOpen(false);
                    setBookSearchQuery('');
                  }}
                  className="p-2 rounded-full hover:bg-gray-100"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              {/* Book Search */}
              <div className="px-5 py-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={bookSearchQuery}
                    onChange={(e) => setBookSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm"
                  />
                  {bookSearchQuery && (
                    <motion.button
                      onClick={() => setBookSearchQuery('')}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Books List */}
              <div className="flex-1 overflow-y-auto px-5 pb-8">
                {/* Old Testament */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Old Testament ({oldTestamentBooks.filter(book => book.toLowerCase().includes(bookSearchQuery.toLowerCase())).length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {oldTestamentBooks
                      .filter(book => book.toLowerCase().includes(bookSearchQuery.toLowerCase()))
                      .map(book => {
                        const isCached = isBookDownloaded(book);
                        return (
                          <motion.button
                            key={book}
                            onClick={() => handleBookSelect(book)}
                            className={`p-3 rounded-xl text-left relative ${
                              selectedBook === book ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-sm font-medium">{book}</span>
                                <span className="text-xs opacity-60 ml-1">
                                  ({bibleStructure[book as keyof typeof bibleStructure]})
                                </span>
                              </div>
                              {isCached && (
                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                  </div>
                </div>

                {/* New Testament */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    New Testament ({newTestamentBooks.filter(book => book.toLowerCase().includes(bookSearchQuery.toLowerCase())).length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {newTestamentBooks
                      .filter(book => book.toLowerCase().includes(bookSearchQuery.toLowerCase()))
                      .map(book => {
                        const isCached = isBookDownloaded(book);
                        return (
                          <motion.button
                            key={book}
                            onClick={() => handleBookSelect(book)}
                            className={`p-3 rounded-xl text-left relative ${
                              selectedBook === book ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                            }`}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-sm font-medium">{book}</span>
                                <span className="text-xs opacity-60 ml-1">
                                  ({bibleStructure[book as keyof typeof bibleStructure]})
                                </span>
                              </div>
                              {isCached && (
                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-white"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <motion.button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="p-2 -ml-2 rounded-full hover:bg-gray-100"
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </motion.button>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search the Bible..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none text-sm"
                    autoFocus
                  />
                </div>
                <motion.button
                  onClick={handleSearch}
                  className="p-2 bg-gray-900 text-white rounded-full"
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {isSearching ? (
                  <div className="flex items-center justify-center py-20">
                    <motion.div
                      className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 mb-4">{searchResults.length} results found</p>
                    {searchResults.map((result, index) => (
                      <motion.button
                        key={index}
                        onClick={() => navigateToSearchResult(result)}
                        className="w-full p-4 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 active:bg-gray-100 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">
                              {result.reference}
                            </p>
                            <p className="text-gray-900 leading-relaxed text-sm line-clamp-3" style={{ fontFamily: 'Georgia, serif' }}>
                              {result.text}
                            </p>
                          </div>
                          {result.book && result.chapter && (
                            <div className="flex-shrink-0 mt-1">
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakVerse(result.text, 0);
                            }}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-300"
                            whileTap={{ scale: 0.95 }}
                          >
                            <Volume2 className="w-4 h-4 text-gray-600" />
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(`"${result.text}" — ${result.reference}`);
                              toast.success('Copied!');
                            }}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-300"
                            whileTap={{ scale: 0.95 }}
                          >
                            <Share2 className="w-4 h-4 text-gray-600" />
                          </motion.button>
                          {result.book && result.chapter && (
                            <span className="ml-auto text-xs text-gray-400">
                              Tap to read
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : searchQuery && !isSearching ? (
                  <div className="text-center py-20">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No results found</p>
                    <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Search the Bible</p>
                    <p className="text-sm text-gray-400 mt-2">Search by:</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">Words (love, faith)</span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">References (John 3:16)</span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">Books (Genesis)</span>
                      <span className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">Topics (salvation)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Player with Visualizer */}
      <AnimatePresence>
        {isAudioPlaying && (
          <motion.div
            className="fixed bottom-24 left-4 right-4 z-50 p-4 bg-gray-900 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <AudioVisualizer 
                    isPlaying={isAudioPlaying} 
                    barCount={5} 
                    color="#ffffff" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Now Playing</p>
                  <p className="text-xs text-gray-400">
                    {selectedBook ? `${selectedBook} ${selectedChapter}` : 'Audio Bible'}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={stopAudio}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <Pause className="w-5 h-5 text-gray-900" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bible Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-safe">
        <div className="flex items-center justify-around py-2 px-3 max-w-md mx-auto">
          {[
            { id: 'today', icon: Sunrise, label: 'Today' },
            { id: 'bible', icon: Book, label: 'Bible' },
            { id: 'stories', icon: BookOpen, label: 'Stories' },
            { id: 'plans', icon: Calendar, label: 'Plans' },
            { id: 'saved', icon: Bookmark, label: 'Saved' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  if (tab.id === 'stories') {
                    setSelectedStory(null);
                    setStoryVerses([]);
                  }
                }}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-[48px] min-h-[44px] rounded-xl transition-all ${
                  isActive ? 'bg-amber-100/60' : ''
                }`}
                whileTap={{ scale: 0.92 }}
              >
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-amber-800' : 'text-stone-400'}`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span 
                  className={`text-[9px] font-semibold tracking-wide ${isActive ? 'text-amber-800' : 'text-stone-400'}`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Verse Image Generator Modal */}
      {selectedVerseForImage && (
        <VerseImageGenerator
          isOpen={isImageGeneratorOpen}
          onClose={() => {
            setIsImageGeneratorOpen(false);
            setSelectedVerseForImage(null);
          }}
          verseText={selectedVerseForImage.text}
          verseReference={selectedVerseForImage.reference}
        />
      )}

      {/* Notification Settings Modal */}
      <BibleNotificationSettings
        isOpen={isNotificationSettingsOpen}
        onClose={() => setIsNotificationSettingsOpen(false)}
      />

      {/* Voice Selector Modal */}
      <BibleVoiceSelector
        isOpen={isVoiceSelectorOpen}
        onClose={() => setIsVoiceSelectorOpen(false)}
        selectedVoice={preferredVoice}
        onSelectVoice={(voice) => {
          setPreferredVoice(voice);
          toast.success(`Voice changed to ${voice.name.split(' ').slice(0, 2).join(' ')}`);
        }}
      />

      {/* Font Size Settings Modal */}
      <AnimatePresence>
        {isFontSettingsOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFontSettingsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-t-3xl w-full max-w-lg p-6"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Text Size</h3>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { id: 'small' as FontSize, label: 'S', size: '15px' },
                  { id: 'medium' as FontSize, label: 'M', size: '18px' },
                  { id: 'large' as FontSize, label: 'L', size: '21px' },
                  { id: 'xlarge' as FontSize, label: 'XL', size: '24px' },
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => {
                      setFontSize(option.id);
                      toast.success(`Font size: ${option.label}`);
                    }}
                    className={`py-4 rounded-2xl text-center font-bold ${
                      settings.fontSize === option.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontSize: option.size }}>{option.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Preview */}
              <div className="p-4 bg-gray-50 rounded-2xl mb-6">
                <p 
                  className="text-gray-900" 
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    fontSize: getFontSizeClass(),
                    lineHeight: getLineHeight()
                  }}
                >
                  For God so loved the world, that he gave his only begotten Son...
                </p>
              </div>

              <motion.button
                onClick={() => setIsFontSettingsOpen(false)}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold"
                whileTap={{ scale: 0.98 }}
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Downloads Modal */}
      <BibleOfflineDownloads 
        isOpen={isOfflineDownloadsOpen} 
        onClose={() => setIsOfflineDownloadsOpen(false)}
        onNavigateToBook={(book, chapter) => {
          setSelectedBook(book);
          setSelectedChapter(chapter);
          setActiveTab('bible');
        }}
      />
    </div>
  );
});

Bible.displayName = 'Bible';

export default Bible;
