import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, RefreshCw, Share2, Heart, Bookmark, Sparkles, Sun, Moon, Star } from 'lucide-react';
import { toast } from 'sonner';

// Curated daily verses with powerful messages
const dailyVerses = [
  { verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11", theme: "Hope" },
  { verse: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13", theme: "Strength" },
  { verse: "The Lord is my shepherd; I shall not want.", reference: "Psalm 23:1", theme: "Provision" },
  { verse: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5", theme: "Trust" },
  { verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9", theme: "Courage" },
  { verse: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.", reference: "Isaiah 40:31", theme: "Renewal" },
  { verse: "The Lord bless thee, and keep thee: The Lord make his face shine upon thee, and be gracious unto thee.", reference: "Numbers 6:24-25", theme: "Blessing" },
  { verse: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7", theme: "Peace" },
  { verse: "And we know that in all things God works for the good of those who love him.", reference: "Romans 8:28", theme: "Faith" },
  { verse: "The joy of the Lord is your strength.", reference: "Nehemiah 8:10", theme: "Joy" },
  { verse: "Behold, I am doing a new thing; now it springs forth, do you not perceive it?", reference: "Isaiah 43:19", theme: "New Beginnings" },
  { verse: "He who dwells in the shelter of the Most High will rest in the shadow of the Almighty.", reference: "Psalm 91:1", theme: "Protection" },
  { verse: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28", theme: "Rest" },
  { verse: "The Lord is my light and my salvation—whom shall I fear?", reference: "Psalm 27:1", theme: "Courage" },
];

const DailyVerse = memo(() => {
  const [currentVerse, setCurrentVerse] = useState(dailyVerses[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Get verse based on day of year for consistency
  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const verseIndex = dayOfYear % dailyVerses.length;
    const selected = dailyVerses[verseIndex];
    setCurrentVerse(selected);
    
    // Check localStorage for liked/saved state using the selected verse
    const saved = localStorage.getItem('dailyVerseSaved');
    const liked = localStorage.getItem('dailyVerseLiked');
    if (saved === selected.reference) setIsSaved(true);
    if (liked === selected.reference) setIsLiked(true);
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: Sun };
    if (hour < 17) return { text: 'Good Afternoon', icon: Sun };
    return { text: 'Good Evening', icon: Moon };
  };

  const greeting = getTimeGreeting();

  const handleRefresh = () => {
    setIsRefreshing(true);
    const randomIndex = Math.floor(Math.random() * dailyVerses.length);
    setTimeout(() => {
      setCurrentVerse(dailyVerses[randomIndex]);
      setIsRefreshing(false);
    }, 600);
  };

  const handleShare = async () => {
    const shareText = `"${currentVerse.verse}" - ${currentVerse.reference}\n\n📖 Daily Verse from CCC Light International`;
    
    if (navigator.share) {
      await navigator.share({
        title: 'Daily Verse',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Verse copied to clipboard!');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    localStorage.setItem('dailyVerseLiked', isLiked ? '' : currentVerse.reference);
    if (!isLiked) toast.success('Added to favorites ❤️');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    localStorage.setItem('dailyVerseSaved', isSaved ? '' : currentVerse.reference);
    if (!isSaved) toast.success('Verse saved for later 📑');
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Premium ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)/0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-5 md:px-8 relative z-10">
        {/* Header with greeting */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            <greeting.icon className="w-4 h-4 text-gold" />
            <span 
              className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-gold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {greeting.text}
            </span>
          </motion.div>
          
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Daily <span className="text-primary">Verse</span>
          </h2>
          <p 
            className="text-sm text-muted-foreground"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Let God's word guide your day
          </p>
        </motion.div>

        {/* Premium Verse Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Outer glow */}
          <motion.div 
            className="absolute -inset-3 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)/0.2), rgba(212,175,55,0.15), hsl(var(--primary)/0.1))',
              filter: 'blur(25px)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Card border */}
          <div 
            className="absolute -inset-[1px] rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)/0.5), rgba(212,175,55,0.4), hsl(var(--primary)/0.3))',
            }}
          />
          
          {/* Main card */}
          <div 
            className="relative rounded-3xl p-6 md:p-10 overflow-hidden"
            style={{
              background: 'linear-gradient(165deg, hsl(var(--background)) 0%, hsl(var(--muted)/0.3) 100%)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.08)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(120deg, transparent 30%, hsl(var(--primary)/0.05) 50%, transparent 70%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }}
            />
            
            {/* Theme badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.08))',
                border: '1px solid hsl(var(--primary)/0.25)',
              }}
            >
              <Star className="w-3 h-3 text-primary" fill="currentColor" />
              <span 
                className="text-[10px] font-bold tracking-wider uppercase text-primary"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {currentVerse.theme}
              </span>
            </motion.div>

            {/* Verse content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVerse.reference}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Book className="w-8 h-8 text-primary/30" />
                </div>
                
                {/* Verse text */}
                <blockquote 
                  className="text-xl sm:text-2xl md:text-3xl leading-relaxed text-foreground mb-6"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  "{currentVerse.verse}"
                </blockquote>
                
                {/* Reference */}
                <cite 
                  className="text-sm md:text-base font-semibold text-primary not-italic flex items-center gap-2"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <Sparkles className="w-4 h-4" />
                  {currentVerse.reference}
                </cite>
              </motion.div>
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
              <div className="flex items-center gap-2">
                {/* Like */}
                <motion.button
                  onClick={handleLike}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isLiked ? 'rgba(239,68,68,0.15)' : 'hsl(var(--muted)/0.5)',
                    border: isLiked ? '1px solid rgba(239,68,68,0.3)' : '1px solid transparent',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart 
                    className={`w-4 h-4 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`} 
                    fill={isLiked ? 'currentColor' : 'none'}
                  />
                </motion.button>
                
                {/* Save */}
                <motion.button
                  onClick={handleSave}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isSaved ? 'hsl(var(--primary)/0.15)' : 'hsl(var(--muted)/0.5)',
                    border: isSaved ? '1px solid hsl(var(--primary)/0.3)' : '1px solid transparent',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark 
                    className={`w-4 h-4 ${isSaved ? 'text-primary' : 'text-muted-foreground'}`} 
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </motion.button>
                
                {/* Share */}
                <motion.button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'hsl(var(--muted)/0.5)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Refresh button */}
              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                  color: 'white',
                  boxShadow: '0 4px 15px hsl(var(--primary)/0.3)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6, ease: 'linear' }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </motion.div>
                New Verse
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DailyVerse.displayName = 'DailyVerse';

export default DailyVerse;
