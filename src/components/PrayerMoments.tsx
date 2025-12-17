import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, HandHeart, Users, Clock, Sparkles, X, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PrayerRequest {
  id: string;
  text: string;
  category: string;
  prayerCount: number;
  timestamp: Date;
  anonymous: boolean;
}

// Sample prayer requests for demonstration
const initialPrayers: PrayerRequest[] = [
  { id: '1', text: 'Praying for healing and restoration in my family', category: 'Family', prayerCount: 47, timestamp: new Date(), anonymous: true },
  { id: '2', text: 'Seeking God\'s guidance for a new job opportunity', category: 'Career', prayerCount: 32, timestamp: new Date(), anonymous: true },
  { id: '3', text: 'Thanksgiving for answered prayers and blessings', category: 'Thanksgiving', prayerCount: 89, timestamp: new Date(), anonymous: false },
  { id: '4', text: 'Praying for peace and protection for our nation', category: 'Nation', prayerCount: 156, timestamp: new Date(), anonymous: true },
];

const categories = [
  { name: 'All', icon: Sparkles, color: 'primary' },
  { name: 'Family', icon: Users, color: 'emerald-500' },
  { name: 'Health', icon: Heart, color: 'red-500' },
  { name: 'Career', icon: Clock, color: 'blue-500' },
  { name: 'Thanksgiving', icon: HandHeart, color: 'gold' },
];

const PrayerMoments = memo(() => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(initialPrayers);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrayer, setNewPrayer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Family');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [prayedFor, setPrayedFor] = useState<Set<string>>(new Set());

  const filteredPrayers = activeCategory === 'All' 
    ? prayers 
    : prayers.filter(p => p.category === activeCategory);

  const handlePray = (prayerId: string) => {
    if (prayedFor.has(prayerId)) return;
    
    setPrayedFor(prev => new Set([...prev, prayerId]));
    setPrayers(prev => prev.map(p => 
      p.id === prayerId ? { ...p, prayerCount: p.prayerCount + 1 } : p
    ));
    toast.success('🙏 Prayer recorded. God bless you!');
  };

  const handleSubmitPrayer = () => {
    if (!newPrayer.trim()) return;
    
    const newRequest: PrayerRequest = {
      id: Date.now().toString(),
      text: newPrayer,
      category: selectedCategory,
      prayerCount: 1,
      timestamp: new Date(),
      anonymous: isAnonymous,
    };
    
    setPrayers(prev => [newRequest, ...prev]);
    setNewPrayer('');
    setIsModalOpen(false);
    toast.success('Prayer request submitted. Our community will pray with you! 🙏');
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/3 right-0 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.08))',
              border: '1px solid rgba(16,185,129,0.25)',
            }}
          >
            <HandHeart className="w-4 h-4 text-emerald-500" />
            <span 
              className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Prayer Community
            </span>
          </motion.div>
          
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Prayer <span className="text-primary">Moments</span>
          </h2>
          <p 
            className="text-sm text-muted-foreground max-w-md mx-auto"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Join our global prayer community. Share your requests and pray for others.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.name 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Prayer cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <AnimatePresence mode="popLayout">
            {filteredPrayers.slice(0, 4).map((prayer, index) => (
              <motion.div
                key={prayer.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <motion.div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
                    filter: 'blur(15px)',
                  }}
                />
                
                <div 
                  className="relative rounded-2xl p-5 h-full"
                  style={{
                    background: 'linear-gradient(145deg, hsl(var(--background)), hsl(var(--muted)/0.3))',
                    border: '1px solid hsl(var(--border)/0.5)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Category badge */}
                  <span 
                    className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'hsl(var(--primary)/0.1)',
                      color: 'hsl(var(--primary))',
                    }}
                  >
                    {prayer.category}
                  </span>
                  
                  {/* Prayer text */}
                  <p 
                    className="text-foreground mb-4 line-clamp-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}
                  >
                    "{prayer.text}"
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-xs" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {prayer.prayerCount} prayers
                      </span>
                    </div>
                    
                    <motion.button
                      onClick={() => handlePray(prayer.id)}
                      disabled={prayedFor.has(prayer.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        prayedFor.has(prayer.id)
                          ? 'bg-emerald-500/20 text-emerald-600'
                          : 'bg-primary text-white hover:shadow-lg'
                      }`}
                      style={{ 
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: prayedFor.has(prayer.id) ? 'none' : '0 4px 15px hsl(var(--primary)/0.3)',
                      }}
                      whileHover={{ scale: prayedFor.has(prayer.id) ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {prayedFor.has(prayer.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Prayed
                        </>
                      ) : (
                        <>
                          <HandHeart className="w-3.5 h-3.5" />
                          Pray
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add prayer button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.08))',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#10B981',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(16,185,129,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            Share Your Prayer Request
          </motion.button>
        </motion.div>

        {/* Prayer submission modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="w-full max-w-md rounded-3xl p-6 relative"
                style={{
                  background: 'hsl(var(--background))',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'hsl(var(--muted)/0.5)' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </motion.button>

                <h3 
                  className="text-xl font-medium text-foreground mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Share Your Prayer Request
                </h3>
                <p 
                  className="text-sm text-muted-foreground mb-6"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Our church community will pray with you
                </p>

                {/* Category selector */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.slice(1).map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategory === cat.name
                            ? 'bg-primary text-white'
                            : 'bg-muted/50 text-muted-foreground'
                        }`}
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prayer input */}
                <textarea
                  value={newPrayer}
                  onChange={(e) => setNewPrayer(e.target.value)}
                  placeholder="Share your prayer request..."
                  rows={4}
                  className="w-full rounded-xl p-4 text-sm resize-none mb-4"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'hsl(var(--muted)/0.3)',
                    border: '1px solid hsl(var(--border)/0.5)',
                  }}
                />

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                  <div 
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      isAnonymous ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setIsAnonymous(!isAnonymous)}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white"
                      animate={{ left: isAnonymous ? '22px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Submit anonymously
                  </span>
                </label>

                {/* Submit button */}
                <motion.button
                  onClick={handleSubmitPrayer}
                  disabled={!newPrayer.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white disabled:opacity-50"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
                    boxShadow: '0 8px 25px hsl(var(--primary)/0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  Submit Prayer Request
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

PrayerMoments.displayName = 'PrayerMoments';

export default PrayerMoments;
