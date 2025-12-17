import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Download, 
  MessageCircle, 
  Music, 
  HandHeart,
  FileText,
  Search,
  ChevronRight,
  Info,
  Heart,
  Play,
  Phone,
  Camera,
  ArrowLeft,
  X,
  Compass
} from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEO from "@/components/SEO";

interface MenuItem {
  icon: typeof BookOpen;
  label: string;
  description: string;
  path: string;
  badge?: string;
  color: string;
}

const menuItems: MenuItem[] = [
  { 
    icon: Info, 
    label: "About Us", 
    description: "Our history & mission",
    path: "/about",
    color: "#3b82f6",
  },
  { 
    icon: Play, 
    label: "Sermons", 
    description: "Watch messages",
    path: "/sermons",
    color: "#ef4444",
  },
  { 
    icon: Music, 
    label: "Choir & Media", 
    description: "Music ministry",
    path: "/choir-media",
    color: "#ec4899",
  },
  { 
    icon: FileText, 
    label: "Blog", 
    description: "Articles",
    path: "/blog",
    color: "#10b981",
  },
  { 
    icon: HandHeart, 
    label: "Prayer Requests", 
    description: "Submit prayers",
    path: "/prayer",
    color: "#f59e0b",
  },
  { 
    icon: Heart, 
    label: "Testimonies", 
    description: "Share testimony",
    path: "/testimonies",
    color: "#ef4444",
  },
  { 
    icon: Camera, 
    label: "Gallery", 
    description: "Photos & videos",
    path: "/gallery",
    color: "#8b5cf6",
  },
  { 
    icon: Phone, 
    label: "Contact", 
    description: "Get in touch",
    path: "/contact",
    color: "#06b6d4",
  },
  { 
    icon: MessageCircle, 
    label: "Feedback", 
    description: "Share thoughts",
    path: "/feedback",
    color: "#64748b",
  },
  { 
    icon: Download, 
    label: "Install App", 
    description: "Add to home screen",
    path: "/install",
    badge: "PWA",
    color: "#0ea5e9",
  },
];

const More = memo(() => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = searchQuery 
    ? menuItems.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems;

  const filteredBlogPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  return (
    <>
      <SEO
        title="More | CCC Light International Parish"
        description="Explore all features of the CCC Light app - Bible, sermons, choir, blog, prayer requests, and more."
        url="/more"
      />
      
      <main 
        id="main-content" 
        className="min-h-screen pb-24"
        style={{
          background: 'linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 100%)',
        }}
      >
        <div className="container max-w-md mx-auto px-4">
          {/* Header */}
          <div className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-4">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>Home</span>
              </Link>

              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-stone-100 hover:bg-stone-200 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4 text-stone-500" />
              </motion.button>
            </div>
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Explore
                </h1>
                <p className="text-xs text-stone-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  All features & services
                </p>
              </div>
            </div>
          </div>

          {/* Bible Hero Card */}
          <Link to="/bible">
            <motion.div
              className="mb-4 p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Holy Bible
                    </h2>
                    <span className="px-1.5 py-0.5 bg-amber-500 rounded text-[9px] font-bold text-white">
                      FEATURED
                    </span>
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">Read, study & meditate</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </div>
            </motion.div>
          </Link>

          {/* Menu Grid - Clean Light Design */}
          <div className="grid grid-cols-2 gap-2.5">
            {filteredItems.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="block"
                >
                  <motion.div
                    className="p-3.5 rounded-xl bg-white border border-stone-100 hover:border-stone-200 transition-all"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}12` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-semibold text-stone-800 truncate" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {item.label}
                          </h3>
                          {item.badge && (
                            <span 
                              className="px-1 py-0.5 rounded text-[8px] font-bold"
                              style={{ backgroundColor: `${item.color}15`, color: item.color }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-400 mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[10px] text-stone-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
              CCC Light International Parish
            </p>
            <p className="text-[9px] text-stone-300 mt-0.5">
              v1.0.0
            </p>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="container max-w-md mx-auto px-4 pt-4">
                {/* Search Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-stone-100 rounded-xl">
                    <Search className="w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search features, articles..."
                      className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400 outline-none"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")}>
                        <X className="w-4 h-4 text-stone-400" />
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                    className="text-sm font-medium text-stone-600"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Cancel
                  </button>
                </div>

                {/* Search Results */}
                {searchQuery && (
                  <div className="space-y-4">
                    {/* Features */}
                    {filteredItems.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Features
                        </h3>
                        <div className="space-y-1">
                          {filteredItems.map(item => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsSearchOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors"
                              >
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: `${item.color}12` }}
                                >
                                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-stone-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.label}</p>
                                  <p className="text-xs text-stone-400">{item.description}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Blog Posts */}
                    {filteredBlogPosts.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          Articles
                        </h3>
                        <div className="space-y-1">
                          {filteredBlogPosts.map(post => (
                            <Link
                              key={post.id}
                              to={`/blog/${post.slug}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-3 rounded-xl hover:bg-stone-50 transition-colors"
                            >
                              <p className="text-sm font-medium text-stone-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{post.title}</p>
                              <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredItems.length === 0 && filteredBlogPosts.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-stone-400 text-sm">No results found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
});

More.displayName = 'More';
export default More;
