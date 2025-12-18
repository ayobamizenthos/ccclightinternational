import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

// Audio context for micro-interaction sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    const win = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
    const Ctor = win.AudioContext || win.webkitAudioContext;
    if (Ctor) audioContext = new Ctor();
  }
  return audioContext;
};

// Generate subtle click sounds
const playSound = (type: HapticType) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Configure sound based on type
  switch (type) {
    case 'light':
      oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      oscillator.type = 'sine';
      break;
    case 'medium':
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      oscillator.type = 'sine';
      break;
    case 'heavy':
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.07, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      oscillator.type = 'triangle';
      break;
    case 'success':
      oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.08); // E5
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      oscillator.type = 'sine';
      break;
    case 'warning':
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
      oscillator.frequency.setValueAtTime(392, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      oscillator.type = 'triangle';
      break;
    case 'error':
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      oscillator.type = 'sawtooth';
      break;
  }

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.2);
};

// Trigger device haptic feedback if available
const triggerHaptic = (type: HapticType) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    switch (type) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(25);
        break;
      case 'heavy':
        navigator.vibrate(50);
        break;
      case 'success':
        navigator.vibrate([15, 50, 15]);
        break;
      case 'warning':
        navigator.vibrate([30, 30, 30]);
        break;
      case 'error':
        navigator.vibrate([50, 30, 50]);
        break;
    }
  }
};

export const useHapticFeedback = () => {
  const trigger = useCallback((type: HapticType = 'light', enableSound = true) => {
    // Trigger haptic vibration
    triggerHaptic(type);
    
    // Play subtle sound effect
    if (enableSound) {
      try {
        playSound(type);
      } catch (e) {
        // Audio might not be available, silently fail
      }
    }
  }, []);

  return { trigger };
};

export default useHapticFeedback;
