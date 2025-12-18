import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Video, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Filter,
  Grid3X3,
  LayoutGrid,
  Sparkles,
  Heart
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import BackButton from "@/components/BackButton";

// Sample gallery data
const galleryItems = [
  {
    id: '1',
    type: 'image' as const,
    category: 'Services',
    title: 'Sunday Worship Service',
    description: "Lord's Day celebration at CCC Light Headquarters",
    src: '/church-interior.jpg',
    date: 'December 2024',
    location: 'Alagbado HQ',
  },
  {
    id: '2',
    type: 'image' as const,
    category: 'Events',
    title: 'Harvest Thanksgiving 2024',
    description: 'Annual harvest celebration with all parishes',
    src: '/church-interior.jpg',
    date: 'December 2024',
    location: 'All Parishes',
  },
  {
    id: '3',
    type: 'video' as const,
    category: 'Choir',
    title: 'Celestial Choir Performance',
    description: 'Special hymn presentation at Sunday service',
    src: '/church-interior.jpg',
    videoUrl: 'https://youtube.com/watch?v=example',
    date: 'November 2024',
    location: 'Alagbado HQ',
  },
  {
    id: '4',
    type: 'image' as const,
    category: 'Celebrations',
    title: 'Easter Resurrection Service 2024',
    description: 'Celebrating the risen Christ',
    src: '/church-interior.jpg',
    date: 'April 2024',
    location: 'All Parishes',
  },
  {
    id: '5',
    type: 'image' as const,
    category: 'Services',
    title: 'Friday Power Day',
    description: 'Night of spiritual empowerment and deliverance',
    src: '/church-interior.jpg',
    date: 'November 2024',
    location: 'Alagbado HQ',
  },
  {
    id: '6',
    type: 'image' as const,
    category: 'Events',
    title: 'Youth Convention 2024',
    description: 'Annual youth gathering and empowerment',
    src: '/church-interior.jpg',
    date: 'August 2024',
    location: 'Lagos',
  },
  {
    id: '7',
    type: 'video' as const,
    category: 'Services',
    title: 'Wednesday Mercy Day',
    description: 'Evening mercy and healing service',
    src: '/church-interior.jpg',
    videoUrl: 'https://youtube.com/watch?v=example2',
    date: 'October 2024',
    location: 'Ajman UAE',
  },
  {
    id: '8',
    type: 'image' as const,
    category: 'Celebrations',
    title: "Founder's Birthday Celebration",
    description: 'Honoring Pastor Founder S.B.J. Oshoffa',
    src: '/church-interior.jpg',
    date: 'September 2024',
    location: 'All Parishes',
  },
  {
    id: '9',
    type: 'image' as const,
    category: 'Choir',
    title: 'Celestial Choir in White',
    description: 'Sacred hymns performance during service',
    src: '/church-interior.jpg',
    date: 'October 2024',
    location: 'Alagbado HQ',
  },
];

const categories = ['All', 'Services', 'Events', 'Celebrations', 'Choir'];

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: string;
  title: string;
  description: string;
  src: string;
  videoUrl?: string;
  date: string;
  location: string;
}

const GalleryCard = ({ 
  item, 
  index, 
  onClick 
}: { 
  item: GalleryItem; 
  index: number; 
  onClick: () => void;
}) => {
  // Masonry-style heights
  const heights = ['h-52', 'h-72', 'h-60', 'h-80', 'h-56', 'h-64'];
  const height = heights[index % heights.length];

  return (
    <motion.div
      className={`relative ${height} rounded-2xl overflow-hidden cursor-pointer group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
    >
      {/* Image */}
      <img 
        src={item.src} 
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      loading="lazy" decoding="async"/>

      {/* Overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 opacity-50 group-hover:opacity-75"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Video Badge */}
      {item.type === 'video' && (
        <motion.div
          className="absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.95), rgba(220,38,38,0.95))',
            boxShadow: '0 8px 25px rgba(239,68,68,0.4)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Play className="w-5 h-5 text-white ml-0.5" />
        </motion.div>
      )}

      {/* Category Badge */}
      <div 
        className="absolute top-3 left-3 px-3 py-1.5 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}
      >
        <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-medium text-sm mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
          {item.title}
        </h3>
        <div className="flex items-center gap-3 text-white/65 text-[10px]">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.location}
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const Lightbox = ({ 
  item, 
  onClose, 
  onPrev, 
  onNext,
  hasPrev,
  hasNext
}: { 
  item: GalleryItem; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/96 backdrop-blur-xl" />

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* Navigation arrows */}
      {hasPrev && (
        <motion.button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
      )}
      
      {hasNext && (
        <motion.button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      )}

      {/* Content */}
      <motion.div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image/Video */}
        <div className="relative flex-1 rounded-2xl overflow-hidden">
          {item.type === 'video' ? (
            <div className="relative aspect-video">
              <img 
                src={item.src} 
                alt={item.title}
                className="w-full h-full object-cover"
              loading="lazy" decoding="async"/>
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.95), rgba(220,38,38,0.95))',
                    boxShadow: '0 15px 50px rgba(239,68,68,0.5)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.div>
              </a>
            </div>
          ) : (
            <img 
              src={item.src} 
              alt={item.title}
              className="w-full h-full object-contain max-h-[70vh]"
            loading="lazy" decoding="async"/>
          )}
        </div>

        {/* Info */}
        <div className="p-6 text-center">
          <h3 className="text-white text-xl font-medium mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {item.title}
          </h3>
          <p className="text-white/60 text-sm mb-3">{item.description}</p>
          <div className="flex items-center justify-center gap-4 text-white/45 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <Calendar className="w-3.5 h-3.5" />
              {item.date}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <MapPin className="w-3.5 h-3.5" />
              {item.location}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Gallery = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const imageCount = filteredItems.filter(i => i.type === 'image').length;
  const videoCount = filteredItems.filter(i => i.type === 'video').length;

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedItem(filteredItems[selectedIndex - 1]);
    }
  };

  const handleNext = () => {
    if (selectedIndex < filteredItems.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedItem(filteredItems[selectedIndex + 1]);
    }
  };

  return (
    <>
      <SEO
        title="Gallery | CCC Light International Parish"
        description="View photos and videos from CCC Light International Parish services, events, celebrations, and choir performances across all our global parishes."
        url="/gallery"
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
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
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
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(139,92,246,0.1))',
                  border: '1px solid rgba(139,92,246,0.35)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(139,92,246,0.25)',
                    '0 0 40px rgba(139,92,246,0.45)',
                    '0 0 20px rgba(139,92,246,0.25)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Camera className="w-6 h-6 text-violet-400" />
              </motion.div>
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl font-medium text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Photo & Video{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gallery
              </span>
            </h1>
            <p className="text-white/55 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              Capturing divine moments from our services, celebrations, and events across all parishes worldwide.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6">
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}
                whileHover={{ scale: 1.03 }}
              >
                <ImageIcon className="w-4 h-4 text-violet-400" />
                <span className="text-white/70 text-sm font-medium">{imageCount} Photos</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
                whileHover={{ scale: 1.03 }}
              >
                <Video className="w-4 h-4 text-red-400" />
                <span className="text-white/70 text-sm font-medium">{videoCount} Videos</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Filters & View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
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

            {/* View Toggle */}
            <div 
              className="flex gap-1 p-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <motion.button
                onClick={() => setViewMode('masonry')}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === 'masonry' ? 'bg-primary text-white' : 'text-white/60'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LayoutGrid className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-white/60'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={
            viewMode === 'masonry' 
              ? "columns-2 md:columns-3 gap-4 space-y-4"
              : "grid grid-cols-2 md:grid-cols-3 gap-4"
          }>
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => handleItemClick(item, index)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <Camera className="w-10 h-10 text-white/25" />
              </div>
              <p className="text-white/40 text-sm">No items found in this category</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedItem && (
            <Lightbox
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={selectedIndex > 0}
              hasNext={selectedIndex < filteredItems.length - 1}
            />
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer removed */}
    </>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;