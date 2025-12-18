import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import PremiumLightbox from "@/components/PremiumLightbox";
import YouTubeLightbox from "@/components/YouTubeLightbox";
import { Play, ExternalLink, Music2, Video, Mic2, Headphones, Camera, Film, Sparkles, Youtube } from "lucide-react";

// Import streaming platform icons
import appleMusicIcon from '@/assets/apple-music-icon.png';
import audiomackIcon from '@/assets/audiomack-icon.png';
import boomplayIcon from '@/assets/boomplay-logo.png';
import youtubeIcon from '@/assets/youtube-music-icon.png';
import choirAlbumCover from '@/assets/choir-album-cover.webp';

// Import choir performance gallery images
import choirPerformance1 from '@/assets/choir-performance-1.png';
import choirPerformance2 from '@/assets/choir-performance-2.jpg';
import choirPerformance3 from '@/assets/choir-performance-3.png';
import choirPerformance4 from '@/assets/choir-performance-4.png';
import luliConcertPerformance from '@/assets/luli-concert-performance.png';

const galleryImages = [
  { src: choirPerformance1, alt: "CCC Light International Choir - Celestial Worship", title: "Celestial Worship", youtubeUrl: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL" },
  { src: choirPerformance2, alt: "CCC Light International Choir - Divine Performance", title: "Divine Performance", youtubeUrl: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL" },
  { src: luliConcertPerformance, alt: "CCC Light International Choir - Luli Concert", title: "Luli Concert 4", youtubeUrl: "https://youtu.be/eRPkSgvCD9Y?si=OzL6-E6vKVajkQLw" },
  { src: choirPerformance3, alt: "CCC Light International Choir - Sunday Worship", title: "Sunday Worship", youtubeUrl: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL" },
  { src: choirPerformance4, alt: "CCC Light International Choir - Praise Session", title: "Praise Session", youtubeUrl: "https://www.youtube.com/@CCCLIGHTINTERNATIONAL" },
];

const musicPlatforms = [
  { name: "Apple Music", url: "https://music.apple.com/us/album/lati-ona-jinjin-single/1656382813", icon: appleMusicIcon },
  { name: "Audiomack", url: "https://audiomack.com/ccc-akoka-parish-choir/song/lati-ona-jinjin-1", icon: audiomackIcon },
  { name: "Boomplay", url: "https://www.boomplay.com/songs/109557633", icon: boomplayIcon },
  { name: "YouTube Music", url: "https://www.youtube.com/watch?v=dJYeiEP2Zmo", icon: youtubeIcon }
];

const choirHighlights = [
  {
    title: "CCC Hymn 301",
    description: "Experience divine celestial worship",
    youtubeUrl: "https://www.youtube.com/watch?v=dJYeiEP2Zmo",
    thumbnail: "https://img.youtube.com/vi/dJYeiEP2Zmo/maxresdefault.jpg"
  },
  {
    title: "CCC Hymn 531",
    description: "A joyous praise celebration",
    youtubeUrl: "https://www.youtube.com/watch?v=pwySN4RoXBw",
    thumbnail: "https://img.youtube.com/vi/pwySN4RoXBw/maxresdefault.jpg"
  },
  {
    title: "CCC Hymn 775",
    description: "Deep spiritual melodies",
    youtubeUrl: "https://www.youtube.com/watch?v=9qa30Oambok",
    thumbnail: "https://img.youtube.com/vi/9qa30Oambok/maxresdefault.jpg"
  },
  {
    title: "Luli Concert 4",
    description: "Live concert excellence",
    youtubeUrl: "https://youtu.be/eRPkSgvCD9Y?si=OzL6-E6vKVajkQLw",
    thumbnail: "https://img.youtube.com/vi/eRPkSgvCD9Y/maxresdefault.jpg"
  }
];

const mediaServices = [
  { icon: Video, title: "Live Streaming", description: "Professional HD broadcasting to members worldwide" },
  { icon: Camera, title: "Event Coverage", description: "High-quality documentation of church events" },
  { icon: Film, title: "Video Production", description: "Creative content for testimonials and promotions" },
  { icon: Headphones, title: "Sound Engineering", description: "Crystal-clear audio for worship and recordings" }
];

const ChoirMediaTeam = () => {
  const [activeTab, setActiveTab] = useState<'choir' | 'media'>('choir');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ url: '', title: '' });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval: NodeJS.Timeout;
    let isHovered = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && carousel) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          if (carousel.scrollLeft >= maxScroll - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carousel.scrollBy({ left: 200, behavior: 'smooth' });
          }
        }
      }, 3000);
    };

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('touchstart', handleMouseEnter);
    carousel.addEventListener('touchend', handleMouseLeave);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      carousel.removeEventListener('touchstart', handleMouseEnter);
      carousel.removeEventListener('touchend', handleMouseLeave);
    };
  }, [activeTab]);

  const openGallery = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideoLightbox = (url: string, title: string) => {
    setSelectedVideo({ url, title });
    setVideoLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title="Choir & Media Team - CCC Light International Parish"
        description="Experience divine worship through CCC Light International Choir and explore our professional media team productions."
        url="/choir-media"
        image="/church-interior.jpg"
      />
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}>
        <Navigation />
        <BackButton />
      
        <PageHeader 
          badge="Our Teams"
          title="Choir &"
          titleHighlight="Media"
          description="Where divine voices and creative visuals unite to glorify God."
          icon={<Music2 className="w-3.5 h-3.5 text-gold" />}
        />

        {/* Navigation Tabs - Premium Design */}
        <section className="py-6">
          <div className="container max-w-lg mx-auto px-4">
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div 
                className="inline-flex rounded-2xl p-1.5 w-full max-w-xs"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {[
                  { key: 'choir', label: 'The Choir', icon: Mic2 },
                  { key: 'media', label: 'Media Team', icon: Video }
                ].map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    onClick={() => setActiveTab(key as typeof activeTab)}
                    className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === key ? 'text-[#0a1628]' : 'text-white/60'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeTab === key && (
                      <motion.div
                        layoutId="activeTeamTab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37, #F4D03F)',
                          boxShadow: '0 8px 30px rgba(212,175,55,0.35)',
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10`} />
                    <span className="relative z-10">{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {activeTab === 'choir' ? (
            <motion.div
              key="choir"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured Album - Compact */}
              <section className="py-8">
                <div className="container max-w-lg mx-auto px-4">
                  <motion.div 
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(10,22,40,0.98), rgba(15,30,55,0.95))',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Background glow */}
                    <div 
                      className="absolute top-0 right-0 w-[200px] h-[200px] opacity-30"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.4), transparent 60%)',
                        filter: 'blur(60px)',
                      }}
                    />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row">
                      {/* Album Cover */}
                      <div className="relative w-full sm:w-40 aspect-square flex-shrink-0">
                        <img 
                          src={choirAlbumCover} 
                          alt="Lati Ona Jinjin - CCC Light International Choir" 
                          className="w-full h-full object-cover" 
                        />
                        <motion.a
                          href="https://www.youtube.com/watch?v=dJYeiEP2Zmo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <motion.div
                            className="w-14 h-14 rounded-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #D4AF37, #A07C32)' }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                          </motion.div>
                        </motion.a>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-3 h-3 text-gold" />
                          <span className="text-gold text-[10px] font-bold uppercase tracking-widest">
                            Viral Hit
                          </span>
                        </div>
                        
                        <h2 
                          className="text-2xl font-medium text-white mb-2"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          Lati Ona Jinjin
                        </h2>
                        <p className="text-white/50 text-xs mb-4">
                          CCC Light International Choir's signature worship anthem touching hearts worldwide.
                        </p>
                        
                        {/* Streaming Links */}
                        <div className="flex flex-wrap gap-2">
                          {musicPlatforms.map((platform) => (
                            <motion.a
                              key={platform.name}
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}
                              whileHover={{ scale: 1.03, background: 'rgba(212,175,55,0.15)' }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <img src={platform.icon} alt={platform.name} className="w-4 h-4" />
                              <span className="text-white/70 text-[10px]">{platform.name}</span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Video Highlights - Horizontal Scroll */}
              <section className="py-8">
                <div className="container max-w-lg mx-auto px-4">
                  <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Video Highlights
                  </h3>
                  
                  <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 scrollbar-hide">
                    {choirHighlights.map((video, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-44 cursor-pointer group"
                        onClick={() => openVideoLightbox(video.youtubeUrl, video.title)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="relative aspect-video rounded-xl overflow-hidden mb-2"
                          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <motion.div
                              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                            </motion.div>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Youtube className="w-4 h-4 text-red-500" />
                          </div>
                        </div>
                        <h4 className="text-white text-xs font-medium">{video.title}</h4>
                        <p className="text-white/40 text-[10px]">{video.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Gallery - Compact Grid */}
              <section className="py-8">
                <div className="container max-w-lg mx-auto px-4">
                  <h3 className="text-lg font-medium text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Gallery
                  </h3>
                  
                  <div 
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-2 pb-4 -mx-4 px-4 scrollbar-hide"
                  >
                    {galleryImages.map((image, index) => (
                      <motion.div
                        key={index}
                        className="flex-shrink-0 w-32 aspect-square rounded-xl overflow-hidden cursor-pointer"
                        style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                        onClick={() => openGallery(index)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Media Team Intro */}
              <section className="py-8">
                <div className="container max-w-lg mx-auto px-4">
                  <div className="text-center mb-8">
                    <h2 
                      className="text-2xl font-medium text-white mb-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Excellence in Media
                    </h2>
                    <p className="text-white/50 text-sm">
                      Our dedicated media team brings the divine experience to screens worldwide through cutting-edge technology and creative excellence.
                    </p>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {mediaServices.map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <motion.div
                          key={service.title}
                          className="p-4 rounded-xl"
                          style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                            border: '1px solid rgba(100,180,220,0.15)',
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ borderColor: 'rgba(100,180,220,0.3)' }}
                        >
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{
                              background: 'linear-gradient(135deg, rgba(100,180,220,0.2), rgba(100,180,220,0.08))',
                              border: '1px solid rgba(100,180,220,0.3)',
                            }}
                          >
                            <Icon className="w-5 h-5 text-primary-light" />
                          </div>
                          <h3 className="text-white font-medium text-sm mb-1">{service.title}</h3>
                          <p className="text-white/40 text-[10px] leading-relaxed">{service.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* YouTube Channel CTA */}
              <section className="py-8">
                <div className="container max-w-lg mx-auto px-4">
                  <motion.a
                    href="https://www.youtube.com/@CCCLIGHTINTERNATIONAL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-2xl text-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))',
                      border: '1px solid rgba(239,68,68,0.3)',
                    }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(239,68,68,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Youtube className="w-10 h-10 text-red-500 mx-auto mb-3" />
                    <h3 className="text-white font-medium text-lg mb-1">Subscribe to Our Channel</h3>
                    <p className="text-white/50 text-xs mb-4">Watch sermons, music videos, and more</p>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium">
                      <ExternalLink className="w-4 h-4" />
                      Visit YouTube
                    </span>
                  </motion.a>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer removed */}
      </div>

      {/* Lightboxes */}
      <PremiumLightbox
        images={galleryImages.map(img => ({ src: img.src, alt: img.alt, title: img.title }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />

      <YouTubeLightbox
        isOpen={videoLightboxOpen}
        onClose={() => setVideoLightboxOpen(false)}
        videoUrl={selectedVideo.url}
        title={selectedVideo.title}
      />
    </>
  );
};

export default ChoirMediaTeam;