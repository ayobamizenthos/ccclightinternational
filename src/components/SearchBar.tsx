import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { searchEngine, SearchResult, SearchFilters } from '../lib/search';
import { trackSearchQuery } from '../lib/analytics';

interface SearchBarProps {
  onResults: (results: SearchResult[]) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onResults, placeholder = "Search sermons, blog posts, news..." }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const initializeSearch = async () => {
      try {
        await searchEngine.initialize();
        setCategories(searchEngine.getCategories());
        setTags(searchEngine.getTags());
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize search:', error);
      }
    };

    initializeSearch();
  }, []);

  const handleSearch = async () => {
    if (!isInitialized) return;

    setIsSearching(true);
    
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = searchEngine.search(query, filters);
    onResults(results);
    setIsSearching(false);

    if (query.trim()) {
      trackSearchQuery(query, results.length);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Premium Search Bar */}
      <motion.div 
        className="flex gap-2 p-2 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          border: '1px solid rgba(100,180,220,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-5 w-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder:text-white/40 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '15px',
            }}
          />
        </div>
        
        {/* Filter Button */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 rounded-xl flex items-center gap-2 text-sm font-medium transition-all"
          style={{
            background: showFilters 
              ? 'linear-gradient(135deg, rgba(100,180,220,0.3), rgba(100,180,220,0.15))'
              : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(100,180,220,0.2)',
            color: showFilters ? 'hsl(200, 70%, 65%)' : 'rgba(255,255,255,0.7)',
            fontFamily: 'Outfit, sans-serif',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </motion.button>
        
        {/* Premium Search Button */}
        <motion.button
          onClick={handleSearch}
          disabled={!isInitialized || isSearching}
          className="px-6 py-4 rounded-xl flex items-center gap-2 text-sm font-bold transition-all disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, hsl(200, 70%, 50%) 0%, hsl(200, 80%, 40%) 100%)',
            color: 'white',
            fontFamily: 'Outfit, sans-serif',
            boxShadow: '0 4px 20px rgba(100,180,220,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
          whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(100,180,220,0.5)' }}
          whileTap={{ scale: 0.98 }}
          animate={isSearching ? { scale: [1, 0.98, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {isSearching ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Search</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div 
          className="rounded-2xl p-5 space-y-4"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(100,180,220,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Filters
            </h3>
            <motion.button 
              onClick={clearFilters}
              className="text-sm text-primary-light/70 hover:text-primary-light transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              whileHover={{ scale: 1.02 }}
            >
              Clear All
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2 text-white/70"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Content Type
              </label>
              <Select
                value={filters.type || ''}
                onValueChange={(value) => setFilters(prev => ({ ...prev, type: value as any || undefined }))}
              >
                <SelectTrigger 
                  className="bg-white/5 border-white/10 text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="bg-[#0c1e38] border-white/10">
                  <SelectItem value="" className="text-white">All types</SelectItem>
                  <SelectItem value="blog" className="text-white">Blog Posts</SelectItem>
                  <SelectItem value="news" className="text-white">News</SelectItem>
                  <SelectItem value="event" className="text-white">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2 text-white/70"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Category
              </label>
              <Select
                value={filters.category || ''}
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value || undefined }))}
              >
                <SelectTrigger 
                  className="bg-white/5 border-white/10 text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent className="bg-[#0c1e38] border-white/10">
                  <SelectItem value="" className="text-white">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-white">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-2 text-white/70"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Date Range
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange!,
                      start: e.target.value ? new Date(e.target.value) : undefined
                    } as any
                  }))}
                />
                <input
                  type="date"
                  className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-white outline-none"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange!,
                      end: e.target.value ? new Date(e.target.value) : undefined
                    } as any
                  }))}
                />
              </div>
            </div>
          </div>

          {tags.length > 0 && (
            <div>
              <label 
                className="block text-sm font-medium mb-2 text-white/70"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <motion.button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: filters.tags?.includes(tag) 
                        ? 'linear-gradient(135deg, hsl(200, 70%, 50%), hsl(200, 80%, 40%))'
                        : 'rgba(255,255,255,0.08)',
                      color: filters.tags?.includes(tag) ? 'white' : 'rgba(255,255,255,0.7)',
                      border: `1px solid ${filters.tags?.includes(tag) ? 'transparent' : 'rgba(255,255,255,0.15)'}`,
                      fontFamily: 'Outfit, sans-serif',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                    {filters.tags?.includes(tag) && (
                      <X className="inline ml-1 h-3 w-3" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
