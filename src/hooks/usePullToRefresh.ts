import { useState, useEffect, useCallback, useRef } from 'react';
import { useHapticFeedback } from './useHapticFeedback';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
}

export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
}: UsePullToRefreshOptions) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const { trigger } = useHapticFeedback();

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isPulling || isRefreshing) return;
    
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    
    if (diff > 0 && window.scrollY === 0) {
      e.preventDefault();
      const adjustedDiff = diff / resistance;
      setPullDistance(Math.min(adjustedDiff, threshold * 1.5));
      
      // Haptic feedback when threshold is reached
      if (adjustedDiff >= threshold && pullDistance < threshold) {
        trigger('medium');
      }
    }
  }, [isPulling, isRefreshing, resistance, threshold, pullDistance, trigger]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      trigger('success');
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
    setIsPulling(false);
  }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh, trigger]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    pullDistance,
    isRefreshing,
    isPulling,
    progress: Math.min(pullDistance / threshold, 1),
  };
};
