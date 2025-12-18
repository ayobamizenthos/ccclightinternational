import {
  Globe, Apple, Ship, Building2, Star, Heart, Sparkles,
  Flame, Waves, ScrollText, Sword, Crown, Fish, Users,
  Zap, Baby, Bird, Mountain, Wheat, Home, Sailboat,
  HandHeart, Wine, Moon, Cross, Sunrise, Map, Wind, Lightbulb
} from 'lucide-react';

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: string | number;
}

export const storyIconMap: Record<number, { icon: React.ComponentType<IconProps>; color: string; bg: string }> = {
  1: { icon: Globe, color: '#059669', bg: '#ECFDF5' },
  2: { icon: Apple, color: '#DC2626', bg: '#FEF2F2' },
  3: { icon: Ship, color: '#0284C7', bg: '#F0F9FF' },
  4: { icon: Building2, color: '#7C3AED', bg: '#F5F3FF' },
  5: { icon: Star, color: '#D97706', bg: '#FFFBEB' },
  6: { icon: Heart, color: '#DC2626', bg: '#FEF2F2' },
  7: { icon: Sparkles, color: '#7C3AED', bg: '#F5F3FF' },
  8: { icon: Flame, color: '#EA580C', bg: '#FFF7ED' },
  9: { icon: Waves, color: '#0284C7', bg: '#F0F9FF' },
  10: { icon: ScrollText, color: '#1D4ED8', bg: '#EFF6FF' },
  11: { icon: Sword, color: '#6B7280', bg: '#F3F4F6' },
  12: { icon: Crown, color: '#B45309', bg: '#FFFBEB' },
  13: { icon: Fish, color: '#0891B2', bg: '#ECFEFF' },
  14: { icon: Users, color: '#DB2777', bg: '#FDF2F8' },
  15: { icon: Zap, color: '#F59E0B', bg: '#FFFBEB' },
  16: { icon: Baby, color: '#2563EB', bg: '#EFF6FF' },
  17: { icon: Bird, color: '#0D9488', bg: '#F0FDFA' },
  18: { icon: Mountain, color: '#059669', bg: '#ECFDF5' },
  19: { icon: Wheat, color: '#B45309', bg: '#FFFBEB' },
  20: { icon: HandHeart, color: '#DC2626', bg: '#FEF2F2' },
  21: { icon: Home, color: '#7C3AED', bg: '#F5F3FF' },
  22: { icon: Sailboat, color: '#0284C7', bg: '#F0F9FF' },
  23: { icon: Sunrise, color: '#D97706', bg: '#FFFBEB' },
  24: { icon: Wine, color: '#7F1D1D', bg: '#FEF2F2' },
  25: { icon: Moon, color: '#1E3A8A', bg: '#EFF6FF' },
  26: { icon: Cross, color: '#1F2937', bg: '#F3F4F6' },
  27: { icon: Sunrise, color: '#F59E0B', bg: '#FFFBEB' },
  28: { icon: Map, color: '#059669', bg: '#ECFDF5' },
  29: { icon: Wind, color: '#EA580C', bg: '#FFF7ED' },
  30: { icon: Lightbulb, color: '#F59E0B', bg: '#FFFBEB' },
};
