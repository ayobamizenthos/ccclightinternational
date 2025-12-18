import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, User, ArrowRight, Star, BookOpen, Quote, Share2 } from 'lucide-react';
import { toast } from "sonner";
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import generalOverseerImage from '@/assets/general-overseer-1024.webp';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: Date;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "CCC Light International: Spreading Divine Light Across 6 Nations",
    slug: "imole-global-mission-2024",
    excerpt: "CCC Light International Parish (Imole) spreads celestial faith across 6 parishes in Nigeria, UAE, and Georgia.",
    featuredImage: "/church-interior.jpg",
    category: "Church News",
    author: "CCC Light Media Team",
    publishedAt: new Date("2024-12-06")
  },
  {
    id: "2",
    title: "A Message from the General Overseer: Walking in Divine Light",
    slug: "general-overseer-welcome-message",
    excerpt: "The General Overseer of CCC Light International shares an inspiring message to the global congregation.",
    featuredImage: "/church-interior.jpg",
    category: "Pastoral Message",
    author: "General Overseer",
    publishedAt: new Date("2024-12-06")
  },
  {
    id: "3",
    title: "The CCC Light Worship Experience: Where Heaven Meets Earth",
    slug: "worship-experience-ccc-light",
    excerpt: "Discover the unique worship experience at CCC Light International Parish.",
    featuredImage: "/church-interior.jpg",
    category: "Features",
    author: "CCC Light Media Team",
    publishedAt: new Date("2024-12-06")
  },
  {
    id: "4",
    title: "50th Harvest Celebration: A Golden Jubilee of Faith",
    slug: "50th-harvest-celebration-2024",
    excerpt: "Join CCC Light International for our historic 50th Harvest Celebration.",
    featuredImage: "/church-interior.jpg",
    category: "Events",
    author: "Events Committee",
    publishedAt: new Date("2024-12-06")
  },
  {
    id: "5",
    title: "Serving Communities: CCC Light's Global Outreach Programs",
    slug: "community-outreach-programs",
    excerpt: "Explore CCC Light International's community impact through outreach programs across 6 nations.",
    featuredImage: "/church-interior.jpg",
    category: "Community",
    author: "Welfare Committee",
    publishedAt: new Date("2024-12-06")
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}>
      <Navigation />
      <BackButton />
      
      <PageHeader 
        badge="Parish Updates"
        title="Church"
        titleHighlight="Blog"
        description="Stay connected with our latest thoughts, teachings, and community updates."
        icon={<BookOpen className="w-3.5 h-3.5 text-gold" />}
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
        {/* Featured Author Section - The General Overseer */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="relative rounded-2xl md:rounded-3xl overflow-hidden p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(15,30,55,0.9))',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            {/* Background glow */}
            <div 
              className="absolute top-0 right-0 w-[300px] h-[300px] opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.3), transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
              {/* General Overseer Image */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <div 
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden"
                  style={{
                    boxShadow: '0 0 0 3px rgba(212,175,55,0.4), 0 15px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  <img 
                    src={generalOverseerImage} 
                    alt="Sup. Evang. FA Alebiosu (JP)"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                {/* Verified badge */}
                <div 
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #A07C32)',
                    boxShadow: '0 4px 12px rgba(212,175,55,0.4)',
                  }}
                >
                  <Star className="w-4 h-4 text-white" fill="currentColor" />
                </div>
              </motion.div>

              {/* Author Info */}
              <div className="text-center md:text-left flex-1">
                <Badge 
                  className="mb-3 text-[9px] font-bold px-3 py-1 rounded-full border-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))',
                    color: '#D4AF37',
                  }}
                >
                  Featured Author
                </Badge>
                <h3 
                  className="text-xl md:text-2xl font-medium text-white mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Sup. Evang. FA Alebiosu (JP)
                </h3>
                <p 
                  className="text-white/60 text-sm mb-4"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  General Overseer, CCC Light International Parish
                </p>
                
                {/* Quote */}
                <div className="flex items-start gap-3 max-w-xl">
                  <Quote className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                  <p 
                    className="text-white/70 text-sm italic leading-relaxed"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    "We are called to be the light of the world—spreading hope, faith, and divine love across every nation where God plants us."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
            >
              <motion.div 
                className="group relative h-full"
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

                {/* Border */}
                <div 
                  className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.3), transparent 60%)' }}
                />

                {/* Card */}
                <Card 
                  className="relative overflow-hidden h-full border-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Category */}
                    <Badge 
                      className="absolute top-3 left-3 text-[9px] font-bold px-2.5 py-1 rounded-full border-0"
                      style={{
                        background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                        color: '#0a1628',
                      }}
                    >
                      {post.category}
                    </Badge>

                    {/* Share button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const shareUrl = `${window.location.origin}/blog/${post.slug}`;
                        if (navigator.share) {
                          navigator.share({
                            title: post.title,
                            text: post.excerpt,
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
                  
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-base md:text-lg leading-tight">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-foreground hover:text-primary transition-colors duration-300 line-clamp-2"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-gold" />
                        <span className="line-clamp-1">{post.author}</span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-gold" />
                        {post.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-5">
                    <p 
                      className="text-muted-foreground mb-4 line-clamp-2 text-xs leading-relaxed"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gold hover:text-gold hover:bg-gold/10 p-0 h-auto font-semibold text-xs group/btn"
                      >
                        Read Article
                        <ArrowRight className="ml-1.5 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer removed */}
    </div>
  );
};

export default Blog;
