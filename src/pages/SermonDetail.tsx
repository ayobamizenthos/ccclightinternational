import { useParams, Link } from "react-router-dom";
import { sermons } from "@/data/sermons";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { FileText, Download, Calendar, User, Book, ArrowLeft, Play, Share2 } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const SermonDetail = () => {
  const { id } = useParams();
  const sermon = sermons.find((s) => s.id === id);

  if (!sermon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Sermon Not Found
          </h1>
          <Link to="/sermons" className="text-secondary hover:text-accent">
            Back to Sermons
          </Link>
        </div>
      </div>
    );
  }

  const sermonJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": sermon.title,
    "description": sermon.theme,
    "url": `https://ccclightinternational.org/sermon/${sermon.id}`,
    "thumbnailUrl": `https://ccclightinternational.org${sermon.thumbnail}`,
    "embedUrl": `https://www.youtube.com/embed/${sermon.youtubeId}`,
    "uploadDate": new Date(sermon.date).toISOString(),
    "duration": "PT30M",
    "author": {
      "@type": "Person",
      "name": sermon.pastor
    },
    "publisher": {
      "@type": "Organization",
      "name": "CCC Light International Parish (Imole)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ccclightinternational.org/ccc-logo.png"
      }
    },
    "about": {
      "@type": "CreativeWork",
      "name": sermon.bibleReference,
      "genre": "Religious Sermon"
    }
  };

  // Get related sermons (same series or same pastor, excluding current)
  const relatedSermons = sermons
    .filter(s => s.id !== sermon.id && (s.seriesTitle === sermon.seriesTitle || s.pastor === sermon.pastor))
    .slice(0, 3);

  // Share URLs
  const shareUrl = `https://ccclightinternational.org/sermon/${sermon.id}`;
  const shareText = `${sermon.title} - ${sermon.theme}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <>
      <SEO
        title={`${sermon.title} - CCC Light International Parish`}
        description={`${sermon.theme} - Watch this inspiring sermon by ${sermon.pastor} from CCC Light International Parish (Imole).`}
        url={`/sermon/${sermon.id}`}
        image={sermon.thumbnail}
        type="video.other"
        publishedTime={new Date(sermon.date).toISOString()}
        author={sermon.pastor}
        section="Sermons"
        tags={[sermon.bibleReference, sermon.pastor, "Christian", "Sermon"]}
        jsonLd={sermonJsonLd}
      />
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}>
        <Navigation />
        <BackButton />
      
        <div className="pt-24 pb-12 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <Link
              to="/sermons"
              className="inline-flex items-center text-secondary hover:text-accent mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sermons
            </Link>
            
            <div className="max-w-4xl animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-background mb-4">
                {sermon.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-background/90 mb-4">
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2" />
                  {sermon.bibleReference}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {sermon.pastor}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {sermon.date}
                </div>
              </div>
              {sermon.seriesTitle && (
                <p className="text-secondary font-medium">
                  Series: {sermon.seriesTitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Video Player - Click to Watch on YouTube */}
            <a 
              href={`https://www.youtube.com/watch?v=${sermon.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-slide-up rounded-xl overflow-hidden shadow-elegant group relative"
            >
              <div className="aspect-video relative">
                <img 
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy" decoding="async"/>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  {/* Play Button */}
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                      boxShadow: '0 12px 40px rgba(212,175,55,0.5)',
                    }}
                  >
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ border: '2px solid rgba(212,175,55,0.4)', animationDuration: '2s' }} />
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#0a1628] ml-1" fill="currentColor" />
                  </div>
                </div>
                {/* Watch on YouTube badge */}
                <div 
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(255,0,0,0.9)',
                    boxShadow: '0 4px 20px rgba(255,0,0,0.3)',
                  }}
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-white text-sm font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Watch on YouTube
                  </span>
                </div>
              </div>
            </a>

            {/* Content Grid - Fixed layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reference Card */}
              <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in border border-border/50">
                <h2 className="text-xl font-heading font-bold text-primary mb-3">
                  Reference
                </h2>
                <p className="text-foreground">{sermon.bibleReference}</p>
              </div>

              {/* Theme Card */}
              <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in border border-border/50">
                <h2 className="text-xl font-heading font-bold text-primary mb-3">
                  Theme
                </h2>
                <p className="text-foreground leading-relaxed">{sermon.theme}</p>
              </div>
            </div>

            {/* Sermon Notes Download */}
            {sermon.sermonNotesPdf && (
              <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in border border-border/50">
                <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Sermon Notes
                </h2>
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-primary"
                  asChild
                >
                  <a href={sermon.sermonNotesPdf} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Notes (PDF)
                  </a>
                </Button>
              </div>
            )}

            {/* Overview Card */}
            <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in border border-border/50">
              <h2 className="text-xl font-heading font-bold text-primary mb-4">
                Sermon Overview
              </h2>
              <p className="text-foreground leading-relaxed">{sermon.overview}</p>
            </div>

            {/* Key Takeaways */}
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl p-6 shadow-lg animate-fade-in border border-secondary/20">
              <h2 className="text-xl font-heading font-bold text-primary mb-6">
                Key Takeaways
              </h2>
              <ul className="space-y-4">
                {sermon.keyTakeaways.map((takeaway, index) => (
                  <li
                    key={index}
                    className="flex items-start animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-primary text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-foreground leading-relaxed">{takeaway}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Share Section */}
            <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in border border-border/50">
              <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share This Sermon
              </h2>
              <div className="flex gap-3">
                <a 
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all duration-300 hover:scale-105 group"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span className="font-medium text-sm hidden sm:inline">WhatsApp</span>
                </a>
                <a 
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#1877F2] text-white hover:bg-[#166ad5] transition-all duration-300 hover:scale-105 group"
                >
                  <FaFacebookF className="w-5 h-5" />
                  <span className="font-medium text-sm hidden sm:inline">Facebook</span>
                </a>
                <a 
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-black text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105 group"
                >
                  <FaXTwitter className="w-5 h-5" />
                  <span className="font-medium text-sm hidden sm:inline">Twitter</span>
                </a>
              </div>
            </div>

            {/* Related Sermons Section */}
            {relatedSermons.length > 0 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 rounded-full bg-gradient-to-b from-secondary to-accent" />
                  Related Sermons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedSermons.map((related, index) => (
                    <motion.div
                      key={related.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/sermon/${related.id}`}
                        className="group block bg-card rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={related.thumbnail}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy" decoding="async"/>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          {/* Play indicator */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, #A07C32, #FFF8E1)',
                                boxShadow: '0 8px 24px rgba(212,175,55,0.4)',
                              }}
                            >
                              <Play className="w-5 h-5 text-[#0a1628] ml-0.5" fill="currentColor" />
                            </div>
                          </div>
                          {/* Series badge */}
                          {related.seriesTitle && (
                            <div className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium bg-secondary/90 text-primary backdrop-blur-sm">
                              {related.seriesTitle}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Book className="w-3.5 h-3.5" />
                            {related.bibleReference}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer removed */}
      </div>
    </>
  );
};

export default SermonDetail;
