import React from 'react';
import { SearchResult } from '../lib/search';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500">
          We couldn't find any results for "{query}". Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLink = (result: SearchResult) => {
    switch (result.type) {
      case 'blog': return `/blog/${result.id}`;
      case 'news': return `/news/${result.id}`;
      case 'event': return `/events/${result.id}`;
      default: return '#';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Search Results ({results.length})
        </h2>
        <Badge variant="outline">
          for "{query}"
        </Badge>
      </div>

      <div className="grid gap-6">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">
                    <Link
                      to={getLink(result)}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {result.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <Badge className={getTypeColor(result.type)}>
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </Badge>
                    {result.category && (
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {result.category}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {result.date.toLocaleDateString()}
                    </span>
                  </div>
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {result.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {result.excerpt && (
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {result.excerpt}
                </p>
              )}
              <div className="text-sm text-gray-600 line-clamp-2">
                {result.content.substring(0, 200)}...
              </div>
              <div className="mt-4">
                <Link
                  to={getLink(result)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};