import { useState, useCallback, useRef } from 'react';
import { useHapticFeedback } from './useHapticFeedback';

interface UseSwipeNavigationOptions {
  itemCount: number;
  threshold?: number;
  onSwipe?: (direction: 'left' | 'right', newIndex: number) => void;
}

export const useSwipeNavigation = ({
  itemCount,
  threshold = 50,
  onSwipe,
}: UseSwipeNavigationOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const { trigger } = useHapticFeedback();

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsSwiping(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX.current;
    const diffY = currentY - startY.current;

    // Determine if this is a horizontal or vertical swipe
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      e.preventDefault();
      
      // Add resistance at edges
      let adjustedOffset = diffX;
      if ((currentIndex === 0 && diffX > 0) || (currentIndex === itemCount - 1 && diffX < 0)) {
        adjustedOffset = diffX / 3;
      }
      
      setSwipeOffset(adjustedOffset);
    }
  }, [isSwiping, currentIndex, itemCount]);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping) return;

    if (Math.abs(swipeOffset) > threshold) {
      const direction = swipeOffset > 0 ? 'right' : 'left';
      let newIndex = currentIndex;

      if (direction === 'left' && currentIndex < itemCount - 1) {
        newIndex = currentIndex + 1;
        trigger('light');
      } else if (direction === 'right' && currentIndex > 0) {
        newIndex = currentIndex - 1;
        trigger('light');
      }

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        onSwipe?.(direction, newIndex);
      }
    }

    setSwipeOffset(0);
    setIsSwiping(false);
    isHorizontalSwipe.current = null;
  }, [isSwiping, swipeOffset, threshold, currentIndex, itemCount, onSwipe, trigger]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index);
      trigger('light');
    }
  }, [itemCount, trigger]);

  const goNext = useCallback(() => {
    if (currentIndex < itemCount - 1) {
      setCurrentIndex(prev => prev + 1);
      trigger('light');
    }
  }, [currentIndex, itemCount, trigger]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      trigger('light');
    }
  }, [currentIndex, trigger]);

  return {
    currentIndex,
    swipeOffset,
    isSwiping,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    goTo,
    goNext,
    goPrev,
    canGoNext: currentIndex < itemCount - 1,
    canGoPrev: currentIndex > 0,
  };
};
