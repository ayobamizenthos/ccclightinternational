import { Link } from "react-router-dom";
import { sermons } from "@/data/sermons";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import { Play, Calendar, User, Book, Star, Radio, Share2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import LazyImage from "@/components/LazyImage";
import { motion } from "framer-motion";

const Sermons = () => {
  const sermonsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Sermons - CCC Light International Parish",
    "description": "Watch and be transformed by the powerful Word of God",
    "url": "https://ccclightinternational.org/sermons",
    "numberOfItems": sermons.length,
    "itemListElement": sermons.map((sermon, index) => ({
      "@type": "VideoObject",
      "position": index + 1,
      "name": sermon.title,
      "description": sermon.theme,
      "url": `https://ccclightinternational.org/sermon/${sermon.id}`,
    }))
  };

  return (
    <>
      <SEO
        title="Sermons - CCC Light International Parish"
        description="Watch and be transformed by the powerful Word of God from CCC Light International Parish."
        url="/sermons"
        jsonLd={sermonsJsonLd}
      />
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}>
        <Navigation />
        <BackButton />
      
        <PageHeader 
          badge="Divine Messages"
          title="Our"
          titleHighlight="Sermons"
          description="Watch and be transformed by the powerful Word of God"
          icon={<Radio className="w-3.5 h-3.5 text-gold" />}
        />

        {/* Sermons Grid */}
        <div className="container mx-auto px-5 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sermons.map((sermon, index) => (
              <motion.div
                key={sermon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
              >
                <Link to={`/sermon/${sermon.id}`} className="group block h-full">
                  <motion.div 
                    className="relative h-full"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card glow */}
                    <motion.div 
                      className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)',
                        filter: 'blur(15px)',
                      }}
                    />

                    {/* Border gradient */}
                    <div 
                      className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(16,185,129,0.15), rgba(212,175,55,0.2))' }}
                    />

                    {/* Main card */}
                    <div 
                      className="relative rounded-2xl overflow-hidden h-full"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        <LazyImage
                          src={sermon.thumbnail}
                          alt={sermon.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        
                        {/* Play button - Links to YouTube */}
                        <a
                          href={sermon.youtubeChannelUrl || "https://www.youtube.com/results?search_query=ccc+akoka+parish"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                        >
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ border: '2px solid rgba(212,175,55,0.4)' }}
                              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                            <div 
                              className="w-14 h-14 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                                boxShadow: '0 8px 25px rgba(212,175,55,0.4)',
                              }}
                            >
                              <Play className="w-5 h-5 text-[#0a1628] ml-0.5" fill="currentColor" />
                            </div>
                          </motion.div>
                        </a>

                        {/* Share button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const shareUrl = `${window.location.origin}/sermon/${sermon.id}`;
                            if (navigator.share) {
                              navigator.share({
                                title: sermon.title,
                                text: sermon.theme,
                                url: shareUrl,
                              });
                            } else {
                              navigator.clipboard.writeText(shareUrl);
                              toast.success("Link copied to clipboard!");
                            }
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'rgba(10,22,40,0.7)',
                            border: '1px solid rgba(212,175,55,0.3)',
                          }}
                        >
                          <Share2 className="w-3.5 h-3.5 text-gold" />
                        </button>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5 md:p-6">
                        <h3 
                          className="text-base md:text-lg font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {sermon.title}
                        </h3>
                        
                        {/* Meta info */}
                        <div className="space-y-2 mb-4">
                          {[
                            { icon: Book, text: sermon.bibleReference, color: 'text-gold' },
                            { icon: User, text: sermon.pastor, color: 'text-emerald-500' },
                            { icon: Calendar, text: sermon.date, color: 'text-primary' },
                          ].map((meta, i) => (
                            <div key={i} className="flex items-center text-xs text-muted-foreground">
                              <div 
                                className="w-6 h-6 rounded-lg flex items-center justify-center mr-2.5"
                                style={{ background: 'hsl(var(--muted)/0.5)' }}
                              >
                                <meta.icon className={`w-3 h-3 ${meta.color}`} />
                              </div>
                              <span style={{ fontFamily: 'Outfit, sans-serif' }}>{meta.text}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Theme */}
                        <p 
                          className="text-xs text-muted-foreground line-clamp-2 mb-4"
                          style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                          {sermon.theme}
                        </p>
                        
                        {/* Series tag */}
                        {sermon.seriesTitle && (
                          <div 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                            style={{
                              background: 'linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05))',
                              border: '1px solid hsl(var(--primary)/0.2)',
                            }}
                          >
                            <Star className="w-2.5 h-2.5 text-primary" fill="currentColor" />
                            <span className="text-[10px] font-medium text-primary" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {sermon.seriesTitle}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Footer removed */}
      </div>
    </>
  );
};

export default Sermons;
