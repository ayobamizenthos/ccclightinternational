import { useState, useCallback, useMemo } from 'react';

export type BibleNavState = {
  tab: 'today' | 'bible' | 'stories' | 'plans' | 'saved';
  book?: string;
  chapter?: number;
  storyId?: number;
};

export const useBibleNavigation = () => {
  const [history, setHistory] = useState<BibleNavState[]>([{ tab: 'today' }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentState = useMemo(() => history[currentIndex] || { tab: 'today' }, [history, currentIndex]);

  const navigate = useCallback((newState: BibleNavState) => {
    setHistory(prev => {
      // Remove any forward history
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, newState];
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const goBack = useCallback((): boolean => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return true; // Successfully went back
    }
    return false; // No more history, should exit Bible
  }, [currentIndex]);

  const canGoBack = currentIndex > 0;

  const getBreadcrumb = useCallback((): string => {
    const state = currentState;
    let breadcrumb = 'Bible';
    
    if (state.tab === 'bible' && state.book) {
      breadcrumb += ` → ${state.book}`;
      if (state.chapter) {
        breadcrumb += ` → Chapter ${state.chapter}`;
      }
    } else if (state.tab === 'stories') {
      breadcrumb = 'Stories';
    } else if (state.tab === 'plans') {
      breadcrumb = 'Reading Plans';
    } else if (state.tab === 'saved') {
      breadcrumb = 'Saved';
    } else if (state.tab === 'today') {
      breadcrumb = 'Today';
    }
    
    return breadcrumb;
  }, [currentState]);

  const reset = useCallback(() => {
    setHistory([{ tab: 'today' }]);
    setCurrentIndex(0);
  }, []);

  return {
    currentState,
    navigate,
    goBack,
    canGoBack,
    getBreadcrumb,
    reset,
  };
};

export default useBibleNavigation;
