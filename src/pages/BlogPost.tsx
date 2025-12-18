import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, User, Tag, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { getBlogPostBySlug } from '../lib/cms';
import type { BlogPost as BlogPostType } from '../lib/cms';
import { trackBlogPostRead } from '../lib/analytics';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const blogPost = await getBlogPostBySlug(slug);
        setPost(blogPost);

        if (blogPost) {
          trackBlogPostRead(blogPost.id!, blogPost.title);
        }
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || post?.title,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(100,180,220,0.25), rgba(100,180,220,0.1))',
              border: '1px solid rgba(100,180,220,0.35)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-primary-light" />
          </motion.div>
          <p className="text-white/60">Loading article...</p>
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}
      >
        <motion.div 
          className="text-center p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(100,180,220,0.15)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.15)' }}>
            <Tag className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Article Not Found
          </h3>
          <p className="text-white/50 text-sm mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button
              className="px-6"
              style={{
                background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}
    >
      <Navigation />
      <BackButton />
      
      <main className="pt-28 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Blog</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              {post.category && (
                <span 
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                    color: '#D4AF37',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                >
                  {post.category}
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="border-white/20 text-white/70 hover:text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full text-xs text-white/60"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Featured Image */}
          {post.featuredImage && (
            <motion.div 
              className="mb-10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              / loading="lazy" decoding="async">
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            className="p-6 md:p-10 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(100,180,220,0.15)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div 
              className="prose prose-invert prose-lg max-w-none"
              style={{ 
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.8',
              }}
            >
              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
          </motion.div>

          {/* Back CTA */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/blog">
              <Button 
                size="lg"
                className="px-8"
                style={{
                  background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, hsl(200 60% 45%) 100%)',
                  boxShadow: '0 8px 30px rgba(100,180,220,0.3)',
                }}
              >
                Read More Articles
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      
      {/* Footer removed */}
    </div>
  );
};

export default BlogPost;