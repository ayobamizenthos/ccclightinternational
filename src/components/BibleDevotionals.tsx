import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Bookmark, Share2, BookOpen, Sparkles, X, Volume2, Calendar, Star, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';

interface Devotional {
  id: number;
  title: string;
  date: string;
  verse: string;
  reference: string;
  reflection: string;
  prayer: string;
  theme: string;
  color: string;
  type: 'daily' | 'weekly' | 'monthly';
}

const devotionalsData: Devotional[] = [
  // Daily Devotionals
  {
    id: 1,
    title: "Walking in Faith",
    date: "Today",
    verse: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    reference: "Proverbs 3:5-6",
    reflection: "Faith is not about having all the answers—it's about trusting the One who does. When we surrender our need to understand everything, God opens doors we never knew existed. Today, release your worries and watch how He guides your steps.",
    prayer: "Lord, I surrender my need to control and understand everything. Guide my steps today, and help me trust Your perfect plan for my life. Amen.",
    theme: "Faith & Trust",
    color: "#2563eb",
    type: 'daily'
  },
  {
    id: 2,
    title: "Strength in Weakness",
    date: "Yesterday",
    verse: "But he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.",
    reference: "2 Corinthians 12:9",
    reflection: "Our weaknesses are not hindrances to God—they are opportunities for His power to shine. When you feel inadequate, remember that God specializes in using broken vessels to display His glory.",
    prayer: "Father, thank You for Your sufficient grace. Use my weaknesses to demonstrate Your mighty power. I find my strength in You alone. Amen.",
    theme: "Grace & Strength",
    color: "#7c3aed",
    type: 'daily'
  },
  {
    id: 3,
    title: "Perfect Peace",
    date: "2 days ago",
    verse: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    reference: "Isaiah 26:3",
    reflection: "Peace is not the absence of storms but the presence of God in the midst of them. When anxiety tries to overwhelm you, redirect your focus to the Prince of Peace.",
    prayer: "God of peace, calm my anxious heart today. Help me fix my eyes on You, not on my circumstances. Fill me with Your perfect peace. Amen.",
    theme: "Peace & Calm",
    color: "#059669",
    type: 'daily'
  },
  {
    id: 4,
    title: "Unfailing Love",
    date: "3 days ago",
    verse: "The LORD hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee.",
    reference: "Jeremiah 31:3",
    reflection: "God's love for you is not based on your performance—it's rooted in His unchanging nature. Before you did anything right or wrong, He loved you.",
    prayer: "Thank You, Lord, for loving me with an everlasting love. Help me truly receive and rest in Your unconditional love today. Amen.",
    theme: "Love & Grace",
    color: "#dc2626",
    type: 'daily'
  },
  {
    id: 5,
    title: "Hope Renewed",
    date: "4 days ago",
    verse: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",
    reference: "Isaiah 40:31",
    reflection: "Waiting on God is not passive—it's an active posture of faith. In the waiting, God renews, restores, and prepares you for what's ahead.",
    prayer: "Lord, teach me to wait on You with expectant faith. Renew my strength and help me soar above my circumstances. Amen.",
    theme: "Hope & Renewal",
    color: "#f59e0b",
    type: 'daily'
  },
  // Weekly Devotionals
  {
    id: 101,
    title: "The Power of Prayer",
    date: "This Week",
    verse: "The effectual fervent prayer of a righteous man availeth much.",
    reference: "James 5:16",
    reflection: "This week, we focus on the transformative power of prayer. Prayer is not just talking to God—it's communion with the Creator. When we pray fervently, we align our hearts with Heaven's purposes. Mountains move, doors open, and miracles happen. Make this week a week of intentional, passionate prayer.",
    prayer: "Heavenly Father, teach me to pray with faith and fervor. Help me understand that prayer is my greatest weapon and my deepest connection with You. Transform my prayer life this week. Amen.",
    theme: "Prayer Life",
    color: "#8b5cf6",
    type: 'weekly'
  },
  {
    id: 102,
    title: "Walking in Forgiveness",
    date: "Last Week",
    verse: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
    reference: "Ephesians 4:32",
    reflection: "Forgiveness is not a feeling—it's a decision to release those who have hurt us into God's hands. This week's theme challenges us to examine our hearts for any unforgiveness that may be blocking our spiritual growth. When we forgive, we set ourselves free.",
    prayer: "Lord, help me to forgive as You have forgiven me. Release any bitterness from my heart and fill me with Your love and compassion. Amen.",
    theme: "Forgiveness",
    color: "#ec4899",
    type: 'weekly'
  },
  {
    id: 103,
    title: "Living with Purpose",
    date: "2 Weeks Ago",
    verse: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.",
    reference: "Ephesians 2:10",
    reflection: "You are not an accident—you are God's masterpiece, created with divine purpose. This week, discover that your life has meaning beyond what you can see. Every day is an opportunity to fulfill the good works God prepared for you.",
    prayer: "Creator God, reveal my purpose to me. Help me walk in the good works You've prepared for my life. Use me for Your glory. Amen.",
    theme: "Purpose & Calling",
    color: "#0891b2",
    type: 'weekly'
  },
  {
    id: 104,
    title: "Overcoming Fear",
    date: "3 Weeks Ago",
    verse: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    reference: "2 Timothy 1:7",
    reflection: "Fear is not from God—power, love, and a sound mind are His gifts to you. This week, we confront the fears that hold us back and replace them with faith-filled courage.",
    prayer: "Lord, I reject the spirit of fear. Fill me with Your power, love, and sound mind. Help me walk in courage this week. Amen.",
    theme: "Courage",
    color: "#ea580c",
    type: 'weekly'
  },
  // Monthly Devotionals
  {
    id: 201,
    title: "A Month of Gratitude",
    date: "This Month",
    verse: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    reference: "1 Thessalonians 5:18",
    reflection: "This month is dedicated to cultivating a heart of gratitude. Gratitude transforms our perspective, shifts our focus from what we lack to what we have, and opens our hearts to receive more of God's blessings. Each day this month, intentionally find reasons to thank God—for the big blessings and the small mercies. Watch how thanksgiving revolutionizes your spiritual life and daily joy.",
    prayer: "Father, create in me a grateful heart. Help me see Your blessings in every situation. I choose to give thanks in all circumstances, knowing that gratitude is Your will for my life. Transform my perspective through praise. Amen.",
    theme: "Gratitude Journey",
    color: "#16a34a",
    type: 'monthly'
  },
  {
    id: 202,
    title: "Growing in Wisdom",
    date: "Last Month",
    verse: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
    reference: "James 1:5",
    reflection: "Wisdom is more valuable than gold, and God offers it freely to all who ask. This month's journey focuses on pursuing godly wisdom in every area of life—relationships, decisions, finances, and spiritual growth. True wisdom begins with the fear of the Lord and expresses itself in righteous living.",
    prayer: "Lord, I ask for Your wisdom. Guide my decisions, enlighten my understanding, and help me live wisely in a foolish world. Amen.",
    theme: "Divine Wisdom",
    color: "#ca8a04",
    type: 'monthly'
  },
  {
    id: 203,
    title: "The Fruit of the Spirit",
    date: "2 Months Ago",
    verse: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance.",
    reference: "Galatians 5:22-23",
    reflection: "This month we explore each fruit of the Spirit and how to cultivate them in our daily lives. As we yield to the Holy Spirit, these beautiful characteristics develop naturally within us, transforming us into the likeness of Christ.",
    prayer: "Holy Spirit, produce Your fruit in my life. Cultivate love, joy, peace, and every good fruit in me. Make me more like Jesus. Amen.",
    theme: "Spiritual Growth",
    color: "#9333ea",
    type: 'monthly'
  },
];

interface BibleDevotionalsProps {
  onSpeak?: (text: string) => void;
}

const BibleDevotionals = memo(({ onSpeak }: BibleDevotionalsProps) => {
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
  const [savedDevotionals, setSavedDevotionals] = useState<Set<number>>(new Set());
  const [activeFilter, setActiveFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all');

  const handleSave = (id: number) => {
    setSavedDevotionals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        toast.success('Removed from saved');
      } else {
        newSet.add(id);
        toast.success('Devotional saved');
      }
      return newSet;
    });
  };

  const handleShare = (devotional: Devotional) => {
    const shareText = `"${devotional.verse}" — ${devotional.reference}\n\n${devotional.reflection}`;
    if (navigator.share) {
      navigator.share({ title: devotional.title, text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Copied to clipboard');
    }
  };

  const filteredDevotionals = activeFilter === 'all' 
    ? devotionalsData 
    : devotionalsData.filter(d => d.type === activeFilter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return Sun;
      case 'weekly': return Calendar;
      case 'monthly': return Moon;
      default: return Heart;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      default: return '';
    }
  };

  return (
    <div className="px-4 py-4">
      <AnimatePresence mode="wait">
        {!selectedDevotional ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                  Devotionals
                </h2>
                <p className="text-xs text-gray-500">Daily, Weekly & Monthly reflections</p>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: 'all' as const, label: 'All', count: devotionalsData.length },
                { id: 'daily' as const, label: 'Daily', count: devotionalsData.filter(d => d.type === 'daily').length },
                { id: 'weekly' as const, label: 'Weekly', count: devotionalsData.filter(d => d.type === 'weekly').length },
                { id: 'monthly' as const, label: 'Monthly', count: devotionalsData.filter(d => d.type === 'monthly').length },
              ].map(filter => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 ${
                    activeFilter === filter.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label}
                  <span className={`text-xs ${activeFilter === filter.id ? 'text-gray-300' : 'text-gray-400'}`}>
                    {filter.count}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Today's Devotional Featured */}
            {activeFilter === 'all' && (
              <motion.button
                onClick={() => setSelectedDevotional(devotionalsData[0])}
                className="w-full relative overflow-hidden rounded-2xl p-5 text-left mb-4"
                style={{ background: `linear-gradient(135deg, ${devotionalsData[0].color}, ${devotionalsData[0].color}dd)` }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-white/20 rounded-full">
                  <Sun className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-semibold text-white">Today</span>
                </div>
                <span className="text-[10px] font-semibold text-white/70 uppercase tracking-widest">
                  {devotionalsData[0].theme}
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5 mb-1.5" style={{ fontFamily: 'Georgia, serif' }}>
                  {devotionalsData[0].title}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 mb-3">
                  "{devotionalsData[0].verse.slice(0, 70)}..."
                </p>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-white" />
                  <span className="text-sm text-white font-medium">Read Now</span>
                </div>
              </motion.button>
            )}

            {/* Weekly Feature Card */}
            {(activeFilter === 'all' || activeFilter === 'weekly') && (
              <motion.button
                onClick={() => setSelectedDevotional(devotionalsData.find(d => d.type === 'weekly')!)}
                className="w-full relative overflow-hidden rounded-2xl p-5 text-left mb-4 bg-gradient-to-br from-violet-500 to-purple-600"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-white/20 rounded-full">
                  <Calendar className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-semibold text-white">This Week</span>
                </div>
                <Star className="w-6 h-6 text-white/30 mb-2" />
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Weekly Focus
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  {devotionalsData.find(d => d.type === 'weekly')?.title}
                </p>
              </motion.button>
            )}

            {/* Monthly Feature Card */}
            {(activeFilter === 'all' || activeFilter === 'monthly') && (
              <motion.button
                onClick={() => setSelectedDevotional(devotionalsData.find(d => d.type === 'monthly')!)}
                className="w-full relative overflow-hidden rounded-2xl p-5 text-left mb-4 bg-gradient-to-br from-emerald-500 to-teal-600"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-white/20 rounded-full">
                  <Moon className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-semibold text-white">This Month</span>
                </div>
                <Star className="w-6 h-6 text-white/30 mb-2" />
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Monthly Theme
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  {devotionalsData.find(d => d.type === 'monthly')?.title}
                </p>
              </motion.button>
            )}

            {/* Devotional List */}
            <div className="space-y-2">
              {filteredDevotionals.slice(activeFilter === 'all' ? 1 : 0).map((devotional, index) => {
                const TypeIcon = getTypeIcon(devotional.type);
                return (
                  <motion.button
                    key={devotional.id}
                    onClick={() => setSelectedDevotional(devotional)}
                    className="w-full flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${devotional.color}15` }}
                    >
                      <TypeIcon className="w-5 h-5" style={{ color: devotional.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{devotional.title}</h3>
                        <span 
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: `${devotional.color}15`, color: devotional.color }}
                        >
                          {getTypeLabel(devotional.type)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{devotional.date} • {devotional.theme}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={() => setSelectedDevotional(null)}
              className="flex items-center gap-2 text-gray-600 mb-5"
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
              <span className="text-sm font-medium">Close</span>
            </motion.button>

            {/* Devotional Content */}
            <div className="space-y-5">
              {/* Header */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${selectedDevotional.color}15`, color: selectedDevotional.color }}
                  >
                    {(() => {
                      const Icon = getTypeIcon(selectedDevotional.type);
                      return <Icon className="w-3 h-3" />;
                    })()}
                    {getTypeLabel(selectedDevotional.type)} • {selectedDevotional.theme}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {selectedDevotional.title}
                </h1>
                <p className="text-sm text-gray-500">{selectedDevotional.date}</p>
              </div>

              {/* Scripture */}
              <div 
                className="p-5 rounded-2xl"
                style={{ backgroundColor: `${selectedDevotional.color}08` }}
              >
                <p className="text-base text-gray-800 leading-relaxed italic mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  "{selectedDevotional.verse}"
                </p>
                <p className="text-sm font-semibold" style={{ color: selectedDevotional.color }}>
                  — {selectedDevotional.reference}
                </p>
                
                {onSpeak && (
                  <motion.button
                    onClick={() => onSpeak(selectedDevotional.verse)}
                    className="mt-3 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Volume2 className="w-4 h-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">Listen</span>
                  </motion.button>
                )}
              </div>

              {/* Reflection */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Reflection
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                  {selectedDevotional.reflection}
                </p>
              </div>

              {/* Prayer */}
              <div className="bg-gray-50 p-5 rounded-2xl">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Prayer
                </h3>
                <p className="text-gray-700 leading-relaxed italic text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                  {selectedDevotional.prayer}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => handleSave(selectedDevotional.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm ${
                    savedDevotionals.has(selectedDevotional.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Bookmark className={`w-4 h-4 ${savedDevotionals.has(selectedDevotional.id) ? 'fill-current' : ''}`} />
                  <span>{savedDevotionals.has(selectedDevotional.id) ? 'Saved' : 'Save'}</span>
                </motion.button>
                <motion.button
                  onClick={() => handleShare(selectedDevotional)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

BibleDevotionals.displayName = 'BibleDevotionals';

export default BibleDevotionals;
