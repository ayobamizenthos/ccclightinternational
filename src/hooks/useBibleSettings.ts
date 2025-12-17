import { useState, useEffect, useCallback } from 'react';

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

interface BibleSettings {
  fontSize: FontSize;
  lastReadBook: string | null;
  lastReadChapter: number | null;
  lastReadTimestamp: number | null;
}

const defaultSettings: BibleSettings = {
  fontSize: 'medium',
  lastReadBook: null,
  lastReadChapter: null,
  lastReadTimestamp: null,
};

export const useBibleSettings = () => {
  const [settings, setSettings] = useState<BibleSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('bible_settings');
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bible_settings', JSON.stringify(settings));
  }, [settings]);

  const setFontSize = useCallback((size: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  }, []);

  const updateLastRead = useCallback((book: string, chapter: number) => {
    setSettings(prev => ({
      ...prev,
      lastReadBook: book,
      lastReadChapter: chapter,
      lastReadTimestamp: Date.now(),
    }));
  }, []);

  const getFontSizeClass = useCallback((): string => {
    switch (settings.fontSize) {
      case 'small': return '16px';
      case 'medium': return '18px';
      case 'large': return '20px';
      case 'xlarge': return '22px';
      default: return '18px';
    }
  }, [settings.fontSize]);

  const getLineHeight = useCallback((): number => {
    switch (settings.fontSize) {
      case 'small': return 1.9;
      case 'medium': return 2.0;
      case 'large': return 2.1;
      case 'xlarge': return 2.2;
      default: return 2.0;
    }
  }, [settings.fontSize]);

  return {
    settings,
    setFontSize,
    updateLastRead,
    getFontSizeClass,
    getLineHeight,
  };
};

export default useBibleSettings;
