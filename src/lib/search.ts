import Fuse from 'fuse.js';
import { searchContent, BlogPost, NewsItem, Event } from './cms';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'blog' | 'news' | 'event';
  category?: string;
  tags?: string[];
  date: Date;
  excerpt?: string;
}

export interface SearchFilters {
  type?: 'blog' | 'news' | 'event';
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}

class SearchEngine {
  private fuse: Fuse<SearchResult> | null = null;
  private searchData: SearchResult[] = [];

  async initialize() {
    // Load all searchable content
    const results = await searchContent('');

    this.searchData = [
      ...results.posts.map((post: BlogPost) => ({
        id: post.id,
        title: post.title,
        content: post.content || '',
        type: 'blog' as const,
        category: post.category,
        tags: post.tags,
        date: post.publishedAt?.toDate() || new Date(),
        excerpt: post.excerpt
      })),
      ...results.news.map((news: NewsItem) => ({
        id: news.id,
        title: news.title,
        content: news.content || '',
        type: 'news' as const,
        category: news.category,
        date: news.publishedAt?.toDate() || new Date(),
        excerpt: news.excerpt
      })),
      ...results.events.map((event: Event) => ({
        id: event.id,
        title: event.title,
        content: event.description || '',
        type: 'event' as const,
        category: event.category,
        date: event.date?.toDate() || new Date()
      }))
    ];

    // Initialize Fuse.js
    this.fuse = new Fuse(this.searchData, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'content', weight: 0.3 },
        { name: 'excerpt', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true
    });
  }

  search(query: string, filters?: SearchFilters): SearchResult[] {
    if (!this.fuse) {
      throw new Error('Search engine not initialized');
    }

    let results = this.fuse.search(query).map(result => result.item);

    // Apply filters
    if (filters) {
      results = results.filter(result => {
        if (filters.type && result.type !== filters.type) return false;
        if (filters.category && result.category !== filters.category) return false;
        if (filters.dateRange) {
          const resultDate = result.date;
          if (resultDate < filters.dateRange.start || resultDate > filters.dateRange.end) return false;
        }
        if (filters.tags && filters.tags.length > 0) {
          if (!result.tags || !filters.tags.some(tag => result.tags!.includes(tag))) return false;
        }
        return true;
      });
    }

    return results;
  }

  getCategories(type?: 'blog' | 'news' | 'event'): string[] {
    const filtered = type ? this.searchData.filter(item => item.type === type) : this.searchData;
    const categories = new Set(filtered.map(item => item.category).filter(Boolean));
    return Array.from(categories) as string[];
  }

  getTags(): string[] {
    const allTags = this.searchData.flatMap(item => item.tags || []);
    return Array.from(new Set(allTags));
  }

  getContentTypes(): ('blog' | 'news' | 'event')[] {
    return ['blog', 'news', 'event'];
  }
}

export const searchEngine = new SearchEngine();
