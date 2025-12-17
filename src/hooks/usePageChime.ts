import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Play a gentle celestial chime when navigating to a new page
const playChime = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create multiple oscillators for a bell-like chime
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 - Major chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      // Stagger the notes slightly for a more musical effect
      const startTime = audioContext.currentTime + index * 0.05;
      const endTime = startTime + 0.8;
      
      // Bell-like envelope: quick attack, slow decay
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);
      
      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  } catch (e) {
    // Audio not supported, fail silently
  }
};

const usePageChime = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't play on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Play chime on route change
    playChime();
  }, [location.pathname]);
};

export default usePageChime;
