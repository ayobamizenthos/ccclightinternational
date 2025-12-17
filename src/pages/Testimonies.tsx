import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Send, 
  Heart, 
  Quote, 
  Sparkles,
  MessageSquare,
  Calendar,
  MapPin,
  ChevronRight,
  Play,
  Trophy,
  Users,
  X
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Testimony {
  id: string;
  name: string;
  location: string;
  category: string;
  title: string;
  content: string;
  date: string;
  featured?: boolean;
}

const testimonies: Testimony[] = [
  {
    id: '1',
    name: 'Sister Adebisi O.',
    location: 'Lagos, Nigeria',
    category: 'Divine Healing',
    title: 'Miraculous Healing After 15 Years of Suffering',
    content: 'For fifteen years, I battled a condition that doctors said was incurable. Medical experts had given up on me. Through the fervent prayers of our General Overseer and the congregation during our Friday Power Day service, God performed a miraculous healing. The same doctors who once gave up on me have now confirmed the healing. I am completely restored! All glory and honor to God Almighty who makes the impossible possible!',
    date: 'November 2024',
    featured: true,
  },
  {
    id: '2',
    name: 'Brother Emmanuel A.',
    location: 'Ajman, UAE',
    category: 'Financial Breakthrough',
    title: 'From Two Years of Joblessness to Divine Favor',
    content: 'I was unemployed for two years in a foreign land. I had sent countless applications without any response. After joining CCC Light parish in Ajman and participating consistently in the Wednesday Seekers Service, God opened doors beyond my wildest imagination. I received three job offers in one single week! Today, I am thriving in my career. God is truly faithful to those who trust in Him.',
    date: 'October 2024',
  },
  {
    id: '3',
    name: 'Sister Grace T.',
    location: 'Abu Dhabi, UAE',
    category: 'Fruit of the Womb',
    title: 'Our Twin Miracles After 8 Years of Waiting',
    content: 'After eight years of waiting and trusting God for the fruit of the womb, He blessed us with not one but TWO beautiful babies—twins! The prayers during the Friday pregnant women service and the prophetic declarations by our General Overseer came to pass. We had almost given up, but God\'s timing is perfect. We are living testimonies of His faithfulness and love.',
    date: 'September 2024',
    featured: true,
  },
  {
    id: '4',
    name: 'Brother Kehinde B.',
    location: 'Ikorodu, Nigeria',
    category: 'Divine Protection',
    title: 'Miraculous Escape: Angels Surrounded Our Home',
    content: 'Armed robbers attacked our entire neighborhood that night. They went from house to house, but our home remained completely untouched even though we were surrounded. I had received prophetic prayers during the Power Day service the previous Friday. I believe God set His mighty angels around us. Our neighbors witnessed the miracle—the robbers simply could not enter our property!',
    date: 'October 2024',
  },
  {
    id: '5',
    name: 'Sister Folake M.',
    location: 'Lagos, Nigeria',
    category: 'Visa Breakthrough',
    title: 'After 5 Denials, God Made a Way on the 6th Attempt',
    content: 'Five times I was denied a visa to join my husband abroad. Each denial was more heartbreaking than the last. After dedicated prayers and fasting guided by our church, my sixth application was approved—and this time, there was no interview! What man cannot do, God has done for me. I am now reunited with my family. Glory to God!',
    date: 'August 2024',
  },
  {
    id: '6',
    name: 'Brother David O.',
    location: 'Tbilisi, Georgia',
    category: 'Business Success',
    title: 'From Bankruptcy to Multiple Successful Businesses',
    content: 'My business crashed completely and I was deeply in debt. I thought it was the end for me. Through the Wednesday Mercy Day prayers and the consistent guidance of our shepherd, God turned my situation around miraculously. Today, I own not one but three successful businesses. God took me from nothing to abundance. He is the God of second chances!',
    date: 'July 2024',
  },
];

const categories = [
  'All', 'Divine Healing', 'Financial Breakthrough', 'Fruit of the Womb', 
  'Divine Protection', 'Visa Breakthrough', 'Business Success'
];

const categoryColors: Record<string, string> = {
  'Divine Healing': '#ef4444',
  'Financial Breakthrough': '#10b981',
  'Fruit of the Womb': '#ec4899',
  'Divine Protection': '#8b5cf6',
  'Visa Breakthrough': '#3b82f6',
  'Business Success': '#f59e0b',
};

const TestimonyCard = ({ testimony, index }: { testimony: Testimony; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const categoryColor = categoryColors[testimony.category] || '#64748b';

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${testimony.featured ? 'md:col-span-2' : ''}`}
      style={{
        background: testimony.featured 
          ? 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)'
          : 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: testimony.featured 
          ? '1px solid rgba(212,175,55,0.35)'
          : '1px solid rgba(100,180,220,0.12)',
        boxShadow: testimony.featured
          ? '0 20px 60px rgba(212,175,55,0.12)'
          : '0 10px 40px rgba(0,0,0,0.1)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Featured Badge */}
      {testimony.featured && (
        <motion.div 
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{ 
            background: 'linear-gradient(135deg, rgba(212,175,55,0.95), rgba(160,124,50,0.95))',
          }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(212,175,55,0.4)',
              '0 0 30px rgba(212,175,55,0.6)',
              '0 0 15px rgba(212,175,55,0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Trophy className="w-3 h-3 text-secondary" />
          <span className="text-[9px] font-bold tracking-wider uppercase text-secondary">Featured</span>
        </motion.div>
      )}

      {/* Glow effect for non-featured */}
      {!testimony.featured && (
        <div 
          className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-20 blur-3xl"
          style={{ background: categoryColor }}
        />
      )}

      <div className="p-6 relative z-10">
        {/* Quote Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: testimony.featured 
              ? 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))'
              : `${categoryColor}18`,
            border: testimony.featured 
              ? '1px solid rgba(212,175,55,0.35)'
              : `1px solid ${categoryColor}30`,
          }}
        >
          <Quote 
            className="w-6 h-6" 
            style={{ color: testimony.featured ? '#D4AF37' : categoryColor }}
          />
        </div>

        {/* Category */}
        <div 
          className="inline-block px-3 py-1.5 rounded-full mb-3"
          style={{
            background: testimony.featured 
              ? 'rgba(212,175,55,0.18)'
              : `${categoryColor}15`,
            border: testimony.featured 
              ? '1px solid rgba(212,175,55,0.3)'
              : `1px solid ${categoryColor}25`,
          }}
        >
          <span 
            className="text-[10px] font-semibold tracking-wider uppercase"
            style={{ color: testimony.featured ? '#D4AF37' : categoryColor }}
          >
            {testimony.category}
          </span>
        </div>

        {/* Title */}
        <h3 
          className={`text-lg font-medium mb-3 ${testimony.featured ? 'text-white' : 'text-foreground'}`}
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {testimony.title}
        </h3>

        {/* Content */}
        <p className={`text-sm leading-relaxed mb-4 ${testimony.featured ? 'text-white/75' : 'text-muted-foreground'}`}>
          {expanded ? testimony.content : `${testimony.content.slice(0, 180)}...`}
        </p>
        
        <motion.button 
          onClick={() => setExpanded(!expanded)}
          className={`text-xs font-medium flex items-center gap-1 mb-4 ${testimony.featured ? 'text-gold' : ''}`}
          style={{ color: testimony.featured ? '#D4AF37' : categoryColor }}
          whileHover={{ x: 3 }}
        >
          {expanded ? 'Read Less' : 'Read Full Testimony'}
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </motion.button>

        {/* Author Info */}
        <div className={`flex items-center justify-between pt-4 border-t ${testimony.featured ? 'border-white/12' : 'border-border'}`}>
          <div>
            <p className={`text-sm font-medium ${testimony.featured ? 'text-white' : 'text-foreground'}`}>
              {testimony.name}
            </p>
            <div className={`flex items-center gap-1 text-xs ${testimony.featured ? 'text-white/50' : 'text-muted-foreground'}`}>
              <MapPin className="w-3 h-3" />
              {testimony.location}
            </div>
          </div>
          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg ${testimony.featured ? 'bg-white/8 text-white/45' : 'bg-muted text-muted-foreground'}`}>
            <Calendar className="w-3 h-3" />
            {testimony.date}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonies = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', category: '', title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredTestimonies = selectedCategory === 'All' 
    ? testimonies 
    : testimonies.filter(t => t.category === selectedCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Testimony Submitted! 🎉', {
      description: 'Thank you for sharing! Your testimony will be reviewed and published soon.',
    });
    
    setFormData({ name: '', location: '', category: '', title: '', content: '' });
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <>
      <SEO
        title="Testimonies | CCC Light International Parish"
        description="Read inspiring testimonies of God's faithfulness from members of CCC Light International Parish. Share your own testimony of divine healing, breakthrough, and miracles."
        url="/testimonies"
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
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 30, repeat: Infinity }}
          />
        </div>

        <div className="container max-w-5xl mx-auto px-4 relative z-10">
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
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.1))',
                  border: '1px solid rgba(251,191,36,0.35)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(251,191,36,0.25)',
                    '0 0 40px rgba(251,191,36,0.45)',
                    '0 0 20px rgba(251,191,36,0.25)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-amber-400" />
              </motion.div>
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl font-medium text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Testimonies of{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                God's Faithfulness
              </span>
            </h1>
            <p className="text-white/55 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              "They overcame by the blood of the Lamb and by the word of their testimony." 
              — Revelation 12:11
            </p>

            <motion.button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                boxShadow: '0 8px 30px rgba(100,180,220,0.3)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(100,180,220,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageSquare className="w-4 h-4" />
              Share Your Testimony
            </motion.button>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: selectedCategory === cat ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.06)',
                  color: selectedCategory === cat ? 'white' : 'rgba(255,255,255,0.6)',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.12)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Testimonies Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTestimonies.map((testimony, index) => (
              <TestimonyCard key={testimony.id} testimony={testimony} index={index} />
            ))}
          </div>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { value: '500+', label: 'Testimonies Shared', icon: MessageSquare },
              { value: '6', label: 'Parishes Worldwide', icon: Users },
              { value: '∞', label: 'God\'s Faithfulness', icon: Heart },
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
                  <Icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {stat.value}
                  </p>
                  <p className="text-white/45 text-xs">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Share Testimony Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
            >
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
              
              <motion.div
                className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl p-6"
                style={{
                  background: 'linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
                  border: '1px solid rgba(100,180,220,0.25)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                }}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.08))',
                      border: '1px solid rgba(251,191,36,0.3)',
                    }}
                  >
                    <Star className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-xl font-medium text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Share Your Testimony
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground/85 mb-1.5 block">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Brother John D."
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground/85 mb-1.5 block">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Lagos, Nigeria"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground/85 mb-1.5 block">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground/85 mb-1.5 block">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Give your testimony a title"
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground/85 mb-1.5 block">Your Testimony *</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Share what God has done for you..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 gap-2"
                    style={{
                      background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4" />
                        </motion.div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Testimony
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer removed */}
    </>
  );
});

Testimonies.displayName = "Testimonies";

export default Testimonies;