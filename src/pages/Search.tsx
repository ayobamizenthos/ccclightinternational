import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { SearchResult } from '../lib/search';
import Navigation from '@/components/Navigation';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';

const Search: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearchResults = (searchResults: SearchResult[]) => {
    setResults(searchResults);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0c1e38 50%, #0a1628 100%)' }}
    >
      <Navigation />
      <BackButton />
      
      <main className="pt-28 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: 'linear-gradient(135deg, rgba(100,180,220,0.25), rgba(100,180,220,0.1))',
                border: '1px solid rgba(100,180,220,0.35)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(100,180,220,0.25)',
                  '0 0 40px rgba(100,180,220,0.45)',
                  '0 0 20px rgba(100,180,220,0.25)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <SearchIcon className="w-7 h-7 text-primary-light" />
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl font-medium text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Search{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, hsl(200 70% 55%) 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Our Content
              </span>
            </h1>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              Find sermons, blog posts, news articles, and events from our church community.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SearchBar
              onResults={(results) => {
                setResults(results);
                setCurrentQuery('');
              }}
              placeholder="Search for sermons, blog posts, news, events..."
            />
          </motion.div>

          {/* Results */}
          {results.length > 0 && (
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SearchResults results={results} query={currentQuery} />
            </motion.div>
          )}

          {/* Empty State */}
          {results.length === 0 && (
            <motion.div
              className="mt-16 text-center p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(100,180,220,0.1)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="w-10 h-10 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-sm">
                Start typing to search across all our content
              </p>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Footer removed */}
    </div>
  );
};

export default Search;