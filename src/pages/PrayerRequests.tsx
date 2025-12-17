import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Send, 
  Users, 
  Sparkles, 
  HandHeart, 
  Home, 
  Banknote, 
  HeartPulse,
  GraduationCap,
  Briefcase,
  Shield,
  Baby,
  Clock,
  CheckCircle2,
  MessageSquare,
  Flame
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PrayerRequest {
  id: string;
  category: string;
  message: string;
  timestamp: Date;
  prayedFor: number;
}

const prayerCategories = [
  { id: 'healing', label: 'Healing & Health', icon: HeartPulse, color: '#ef4444' },
  { id: 'family', label: 'Family & Relationships', icon: Home, color: '#f59e0b' },
  { id: 'finances', label: 'Financial Breakthrough', icon: Banknote, color: '#10b981' },
  { id: 'career', label: 'Career & Business', icon: Briefcase, color: '#3b82f6' },
  { id: 'protection', label: 'Protection & Safety', icon: Shield, color: '#8b5cf6' },
  { id: 'children', label: 'Children & Fertility', icon: Baby, color: '#ec4899' },
  { id: 'education', label: 'Education & Wisdom', icon: GraduationCap, color: '#06b6d4' },
  { id: 'other', label: 'Other Requests', icon: HandHeart, color: '#64748b' },
];

// Sample prayer wall data (in production, this would come from a database)
const samplePrayers: PrayerRequest[] = [
  { id: '1', category: 'healing', message: 'Praying for complete recovery and divine healing for my mother who has been ill for months. I believe in God\'s miraculous power.', timestamp: new Date(Date.now() - 3600000), prayedFor: 124 },
  { id: '2', category: 'finances', message: 'Seeking God\'s provision and breakthrough for my family\'s financial situation. We trust in His abundance.', timestamp: new Date(Date.now() - 7200000), prayedFor: 89 },
  { id: '3', category: 'family', message: 'Praying for restoration and peace in my marriage. May God\'s love reign in our household.', timestamp: new Date(Date.now() - 10800000), prayedFor: 156 },
  { id: '4', category: 'career', message: 'Trusting God for a new job opportunity and favor in my workplace. He opens doors no man can shut.', timestamp: new Date(Date.now() - 14400000), prayedFor: 67 },
  { id: '5', category: 'protection', message: 'Praying for divine protection over my children as they travel abroad. May angels surround them.', timestamp: new Date(Date.now() - 18000000), prayedFor: 203 },
  { id: '6', category: 'children', message: 'Believing God for the fruit of the womb. We trust in His perfect timing and blessing.', timestamp: new Date(Date.now() - 21600000), prayedFor: 312 },
];

const PrayerCard = ({ prayer }: { prayer: PrayerRequest }) => {
  const [hasPrayed, setHasPrayed] = useState(false);
  const [prayerCount, setPrayerCount] = useState(prayer.prayedFor);
  
  const category = prayerCategories.find(c => c.id === prayer.category);
  const Icon = category?.icon || HandHeart;
  
  const handlePray = () => {
    if (!hasPrayed) {
      setHasPrayed(true);
      setPrayerCount(prev => prev + 1);
      toast.success('Thank you for praying 🙏', {
        description: 'Your prayer has been counted. God bless you.',
      });
    }
  };

  const formatTime = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / 3600000);
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <motion.div
      className="relative p-5 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: `1px solid ${category?.color}25`,
        boxShadow: `0 10px 40px ${category?.color}10`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01, borderColor: `${category?.color}40` }}
    >
      {/* Glow effect */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-3xl"
        style={{ background: category?.color }}
      />

      {/* Category Badge */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <motion.div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: `${category?.color}18`,
            border: `1px solid ${category?.color}35`,
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: category?.color }} />
          <span className="text-[11px] font-semibold" style={{ color: category?.color }}>
            {category?.label}
          </span>
        </motion.div>
        <div className="flex items-center gap-1.5 text-white/35 text-xs">
          <Clock className="w-3 h-3" />
          {formatTime(prayer.timestamp)}
        </div>
      </div>

      {/* Prayer Message */}
      <p className="text-white/75 text-sm leading-relaxed mb-5 relative z-10">
        "{prayer.message}"
      </p>

      {/* Prayer Actions */}
      <div className="flex items-center justify-between relative z-10">
        <motion.button
          onClick={handlePray}
          disabled={hasPrayed}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
          style={{
            background: hasPrayed 
              ? 'linear-gradient(135deg, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.12) 100%)'
              : 'linear-gradient(135deg, rgba(100,180,220,0.18) 0%, rgba(100,180,220,0.08) 100%)',
            border: hasPrayed 
              ? '1px solid rgba(16,185,129,0.4)'
              : '1px solid rgba(100,180,220,0.25)',
          }}
          whileHover={{ scale: hasPrayed ? 1 : 1.03 }}
          whileTap={{ scale: hasPrayed ? 1 : 0.97 }}
        >
          {hasPrayed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Prayed ✓</span>
            </>
          ) : (
            <>
              <HandHeart className="w-4 h-4 text-primary-light" />
              <span className="text-primary-light text-sm font-medium">I Prayed For This</span>
            </>
          )}
        </motion.button>

        <motion.div 
          className="flex items-center gap-1.5 text-white/45 text-xs px-3 py-2 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.05)' }}
          animate={hasPrayed ? { scale: [1, 1.1, 1] } : {}}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium">{prayerCount} prayers</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PrayerRequests = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({ category: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Prayer Request Submitted 🙏', {
      description: 'Your request has been added to our prayer wall. We are praying with you.',
    });
    
    setFormData({ category: '', message: '' });
    setIsSubmitting(false);
  };

  const filteredPrayers = selectedCategory 
    ? samplePrayers.filter(p => p.category === selectedCategory)
    : samplePrayers;

  return (
    <>
      <SEO
        title="Prayer Requests | CCC Light International Parish"
        description="Submit your prayer requests and join our global prayer community. Together we stand in faith, believing God for breakthroughs, healing, and divine intervention."
        url="/prayer"
      />
      <Navigation />
      
      <main 
        id="main-content" 
        className="min-h-screen pt-24 pb-32"
        style={{
          background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)',
        }}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <BackButton />
          
          {/* Header */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(236,72,153,0.1))',
                  border: '1px solid rgba(236,72,153,0.35)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(236,72,153,0.25)',
                    '0 0 40px rgba(236,72,153,0.45)',
                    '0 0 20px rgba(236,72,153,0.25)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <HandHeart className="w-6 h-6 text-pink-400" />
              </motion.div>
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl font-medium text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Prayer{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Requests
              </span>
            </h1>
            <p className="text-white/55 text-sm max-w-lg mx-auto leading-relaxed">
              "The prayer of a righteous person is powerful and effective." — James 5:16. 
              Share your prayer needs and join others in intercession.
            </p>
          </motion.div>

          {/* Tab Toggle */}
          <div className="flex justify-center mb-8">
            <div 
              className="inline-flex gap-1 p-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <motion.button
                onClick={() => setShowForm(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  showForm ? 'bg-primary text-white shadow-lg' : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Submit Request
              </motion.button>
              <motion.button
                onClick={() => setShowForm(false)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  !showForm ? 'bg-primary text-white shadow-lg' : 'text-white/60 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="w-4 h-4" />
                Prayer Wall
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Prayer Request Form */}
                <form 
                  onSubmit={handleSubmit}
                  className="p-6 md:p-8 rounded-2xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(100,180,220,0.18)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Category Selection */}
                  <div className="mb-6">
                    <label className="text-white/85 text-sm font-medium mb-4 block">
                      Select Prayer Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {prayerCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <motion.button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                            className="p-4 rounded-xl text-center transition-all"
                            style={{
                              background: formData.category === cat.id 
                                ? `${cat.color}22`
                                : 'rgba(255,255,255,0.04)',
                              border: formData.category === cat.id 
                                ? `2px solid ${cat.color}65`
                                : '1px solid rgba(255,255,255,0.1)',
                              boxShadow: formData.category === cat.id 
                                ? `0 8px 30px ${cat.color}20`
                                : 'none',
                            }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Icon 
                              className="w-6 h-6 mx-auto mb-2" 
                              style={{ color: formData.category === cat.id ? cat.color : 'rgba(255,255,255,0.5)' }}
                            />
                            <span 
                              className="text-[11px] font-medium block"
                              style={{ color: formData.category === cat.id ? cat.color : 'rgba(255,255,255,0.5)' }}
                            >
                              {cat.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Prayer Message */}
                  <div className="mb-6">
                    <label className="text-white/85 text-sm font-medium mb-3 block">
                      Your Prayer Request
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Share your prayer request here. Be as specific as you can. Your submission will be anonymous on the prayer wall..."
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all resize-none"
                    />
                    <p className="text-white/35 text-xs mt-2">
                      ✨ Your request will be shared anonymously on our prayer wall so others can pray with you.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 gap-2 text-base font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                      boxShadow: '0 8px 30px rgba(100,180,220,0.3)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        Submitting Your Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Prayer Request
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="wall"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  <motion.button
                    onClick={() => setSelectedCategory(null)}
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: !selectedCategory ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.06)',
                      color: !selectedCategory ? 'white' : 'rgba(255,255,255,0.6)',
                      border: !selectedCategory ? 'none' : '1px solid rgba(255,255,255,0.12)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All Prayers
                  </motion.button>
                  {prayerCategories.slice(0, 6).map((cat) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: selectedCategory === cat.id ? `${cat.color}35` : 'rgba(255,255,255,0.06)',
                        color: selectedCategory === cat.id ? cat.color : 'rgba(255,255,255,0.6)',
                        border: selectedCategory === cat.id ? `1px solid ${cat.color}55` : '1px solid rgba(255,255,255,0.12)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>

                {/* Prayer Wall */}
                <div className="grid gap-4">
                  {filteredPrayers.map((prayer, index) => (
                    <PrayerCard key={prayer.id} prayer={prayer} />
                  ))}
                </div>

                {/* Stats */}
                <motion.div
                  className="mt-10 grid grid-cols-3 gap-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    { value: '951+', label: 'Prayers Shared', icon: MessageSquare },
                    { value: '6', label: 'Parishes Praying', icon: Users },
                    { value: '∞', label: 'God\'s Love', icon: Heart },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div 
                        key={stat.label}
                        className="p-5 rounded-xl"
                        style={{
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                          border: '1px solid rgba(100,180,220,0.12)',
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <Icon className="w-5 h-5 text-primary-light mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {stat.value}
                        </p>
                        <p className="text-white/45 text-xs">{stat.label}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Footer removed */}
    </>
  );
});

PrayerRequests.displayName = "PrayerRequests";

export default PrayerRequests;